/* eslint-disable @typescript-eslint/no-explicit-any */


import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";
import { generateWithLanguageCheck, withRetry } from "@/utils/retryUtils";
import { getSystemMessage, getTitleSystemMessage } from "@/utils/languageUtils";

type GenerationConfig = {
  model: any;
  temperature: number;
  maxRetries: number;
  languageCheckRetries: number;
};

const DEFAULT_CONFIG: GenerationConfig = {
  model: groq("llama-3.3-70b-versatile"),
  temperature: 0.7,
  maxRetries: 1,
  languageCheckRetries: 2,
};

export async function generateStoryText(
  prompt: string,
  language: string,
  config: Partial<GenerationConfig> = {}
) {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  return withRetry(
    () =>
      generateWithLanguageCheck(
        () =>
          generateText({
            model: finalConfig.model,
            messages: [
              {
                role: "system",
                content: getSystemMessage(language),
              },
              {
                role: "user",
                content: prompt,
              },
            ],
            temperature: finalConfig.temperature,
          }),
        (result) => result.text,
        language,
        finalConfig.languageCheckRetries
      ),
    finalConfig.maxRetries
  );
}

export async function generateStoryTitle(
  titlePrompt: string,
  language: string,
  config: Partial<GenerationConfig> = {}
) {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  return withRetry(
    () =>
      generateWithLanguageCheck(
        () =>
          generateText({
            model: finalConfig.model,
            messages: [
              {
                role: "system",
                content: getTitleSystemMessage(language),
              },
              {
                role: "user",
                content: titlePrompt,
              },
            ],
            temperature: finalConfig.temperature,
          }),
        (result) => result.text,
        language,
        finalConfig.languageCheckRetries
      ),
    finalConfig.maxRetries
  );
}