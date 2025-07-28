
import { genAI } from "@/lib/genai";
import Story from "@/models/Story";
import { generateAndUploadImage } from "../stability-image-handler";

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

export async function generateAndSaveStory(input: StoryInput) {
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

  const formatField = (field: string | string[]): string =>
    Array.isArray(field) ? field.join(", ") : field;

  const parsedFavoriteThings =
    typeof favoriteThings === "string"
      ? favoriteThings
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : favoriteThings;

  if (!Array.isArray(parsedFavoriteThings) || parsedFavoriteThings.length === 0) {
    throw new Error("favoriteThings must not be empty");
  }

  const prompt =
    storyPrompt ||
    [
      `Write a fun and engaging story for children in the ${formatField(ageGroup)} age group.`,
      `Set the story in a ${formatField(world)} world.`,
      `The theme should be ${formatField(theme)} and the mood should be ${formatField(mood)}.`,
      `Include these favorite things: ${formatField(parsedFavoriteThings)}.`,
      `The story should be written in ${language} language.`,
    ].join(" ");

  const titlePrompt = `Generate a short and creative title (3 to 5 words) for a children's story with these settings:
- Age Group: ${formatField(ageGroup)}
- World: ${formatField(world)}
- Theme: ${formatField(theme)}
- Mood: ${formatField(mood)}
- Favorite Things: ${formatField(parsedFavoriteThings)}
`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const [storyResult, titleResult] = await Promise.all([
    model.generateContent({ contents: [{ role: "user", parts: [{ text: prompt }] }] }),
    model.generateContent({ contents: [{ role: "user", parts: [{ text: titlePrompt }] }] }),
  ]);

  const storyText = storyResult.response.text();
  const storyTitle = titleResult.response.text().replace(/^["']|["']$/g, "").trim();

  const imageResult = await generateAndUploadImage(prompt);
  console.log("imageResult =>",imageResult) 
  if (!imageResult.success) {
    throw new Error("Image generation failed: " + imageResult.error);
  }

  const story = new Story({
    title: storyTitle,
    ageGroup: formatField(ageGroup),
    language,
    favoriteThings: parsedFavoriteThings,
    world: formatField(world),
    theme: formatField(theme),
    mood: formatField(mood),
    story: storyText,
    imageUrl: imageResult.imageUrl,
    prompt,
    createdBy: userId,
    userId,
  });

  const saved = await story.save();

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
    imageUrl: imageResult.imageUrl,
    userId,
    prompt,
  };
}
