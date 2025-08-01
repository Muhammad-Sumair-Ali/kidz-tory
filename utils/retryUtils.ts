
/* eslint-disable @typescript-eslint/no-explicit-any */

import { isCorrectLanguage } from "./languageUtils";

export async function withRetry<T>(fn: () => Promise<T>, retries = 2): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      if (
        error.status === 503 ||
        error.message?.includes("overloaded") ||
        error.message?.includes("quota")
      ) {
        throw error;
      }
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 2000 * (i + 1)));
    }
  }
  throw new Error("Max retries reached");
}

export async function generateWithLanguageCheck<T>(
  fn: () => Promise<T>,
  getText: (result: T) => string,
  language: string,
  maxRetries = 2
): Promise<T> {
  const langLower = language.toLowerCase();
  
  // Skip validation for Roman Urdu to make it faster and more reliable
  if (langLower === "roman urdu" || langLower === "roman-urdu" || langLower === "romanurdu") {
    return await fn();
  }
  
  let lastResult: T;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const result = await fn();
    const text = getText(result);
    
    if (isCorrectLanguage(text, language)) {
      return result;
    }
    
    console.warn(`Attempt ${attempt + 1}: Generated text not in ${language}. Text preview: ${text.substring(0, 100)}...`);
    lastResult = result;
    
    // Reduced delay for faster API
    if (attempt < maxRetries - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  console.warn(`All ${maxRetries} attempts failed to generate proper ${language} text. Using last result.`);
  return lastResult!;
}