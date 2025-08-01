/* eslint-disable @typescript-eslint/no-explicit-any */
import Story from "@/models/Story";
import { generateAndUploadImage } from "../stability-image-handler";
import { formatField, parseFavoriteThings, cleanTitle } from "@/utils/validationUtils";
import { generateSimplePrompt, generateLanguageSpecificPrompt, generateImagePrompt } from "@/utils/promptGenerators";
import { generateStoryText, generateStoryTitle } from "./textGenerationService";
import { withRetry } from "@/utils/retryUtils";
import { handleStoryGenerationError } from "@/utils/errorHandling";

type StoryInput = {
  ageGroup: string | string[];
  language: string;
  favoriteThings: string[] | string;
  world: string | string[];
  theme: string | string[];
  mood: string | string[];
  storyPrompt?: string;
  userId: string;
};

type StoryResult = {
  id: string;
  title: string;
  ageGroup: string | string[];
  language: string;
  favoriteThings: string[];
  world: string | string[];
  theme: string | string[];
  mood: string | string[];
  story: string;
  imageUrl: string | null;
  userId: string;
  prompt: string;
};

export async function generateAndSaveStory(input: StoryInput): Promise<StoryResult> {
  const {
    ageGroup,
    language,
    favoriteThings,
    world,
    theme,
    mood,
    storyPrompt,
    userId,
  } = input;

  try {
    // Validate and format inputs
    const parsedFavoriteThings = parseFavoriteThings(favoriteThings);
    
    const storyFields = {
      ageGroup: formatField(ageGroup),
      theme: formatField(theme),
      mood: formatField(mood),
      world: formatField(world),
      favoriteThings: formatField(parsedFavoriteThings),
    };

    // Generate prompts
    const prompt = storyPrompt 
      ? generateLanguageSpecificPrompt(storyPrompt, language)
      : generateSimplePrompt(storyFields, language);
    
    const titlePrompt = generateSimplePrompt(storyFields, language, true);


    // Generate story and title concurrently
    const [storyResult, titleResult] = await Promise.all([
      generateStoryText(prompt, language),
      generateStoryTitle(titlePrompt, language),
    ]);


    // Generate image with error handling
    let imageResult;
    try {
      const imagePrompt = generateImagePrompt(storyFields);
      imageResult = await withRetry(() => generateAndUploadImage(imagePrompt), 2);
    } catch(error:any)  {
       throw new Error("Image Generation Failed. Limit Reached Sorry",error);
    }

    // Process results
    const storyText = storyResult.text;
    const storyTitle = cleanTitle(titleResult.text);

    console.log("Generated story in language:", language);
    console.log("Story length:", storyText.length);
    console.log("Story preview:", storyText.substring(0, 200));

    // Save to database
    const story = new Story({
      title: storyTitle,
      ageGroup: storyFields.ageGroup,
      language,
      favoriteThings: parsedFavoriteThings,
      world: storyFields.world,
      theme: storyFields.theme,
      mood: storyFields.mood,
      story: storyText,
      imageUrl: imageResult.success ? imageResult.imageUrl : null,
      prompt,
      createdBy: userId,
      userId,
    });

    const saved = await story.save();

    // Return result
    return {
      id: saved._id.toString(),
      title: storyTitle,
      ageGroup,
      language,
      favoriteThings: parsedFavoriteThings,
      world,
      theme,
      mood,
      story: storyText,
      imageUrl: imageResult.success ? imageResult.imageUrl : null,
      userId,
      prompt,
    };
  } catch (error: any) {
    handleStoryGenerationError(error);
  }
}