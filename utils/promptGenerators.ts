
type StoryFields = {
  ageGroup: string;
  theme: string;
  mood: string;
  world: string;
  favoriteThings: string;
};

function getLanguageInstruction(language: string, isTitle = false): string {
  const langLower = language.toLowerCase();
  
  if (langLower === "urdu" || langLower === "ur") {
    return isTitle 
      ? "آپ کو صرف اردو زبان میں جواب دینا ہے۔ کوئی انگریزی یا ہندی الفاظ استعمال نہ کریں۔ Write ONLY in Urdu language using Arabic/Urdu script. Do not use any English, Hindi, or Devanagari characters. "
      : "آپ کو مکمل کہانی صرف اردو زبان میں لکھنی ہے۔ کوئی انگریزی یا ہندی الفاظ بالکل استعمال نہ کریں۔ Write the ENTIRE story ONLY in Urdu language using Arabic/Urdu script. Do not mix English, Hindi, or Devanagari script. Every single word must be pure Urdu. Avoid mixed script characters completely. ";
  }
  
  if (langLower === "roman urdu" || langLower === "roman-urdu" || langLower === "romanurdu") {
    return isTitle 
      ? "Write ONLY in Roman Urdu using Latin alphabet. Use Urdu words written in English letters like 'Ek Sundar Kahani' or 'Bachon Ki Duniya'. Examples: 'Ek Chhota Hero', 'Pyari Si Titli'. Never use pure English words. "
      : "Write the COMPLETE story ONLY in Roman Urdu using Latin alphabet. Use Urdu words and grammar written in English letters. Examples: 'Ek din ek chhota sa bacha tha', 'Woh bahut khush tha', 'Us ke paas ek sundar khilona tha'. Do NOT write in English. Every sentence must be Urdu vocabulary written in Roman script. Use words like: tha, thi, the, hai, hain, ka, ki, ke, me, se, ko, ne, aur, lekin, phir, jab, etc. ";
  }
  
  if (langLower !== "english" && langLower !== "en") {
    return `Write ONLY in ${language} language. Do not use English. Every word must be in ${language}. `;
  }
  
  return "";
}

export function generateSimplePrompt(
  fields: StoryFields,
  language: string,
  isTitle = false
): string {
  const contentType = isTitle ? "title (3-4 words)" : "complete story";
  const languageInstruction = getLanguageInstruction(language, isTitle);

  const basePrompt = `Create a children's ${contentType} for ${fields.ageGroup} age group. Theme: ${fields.theme}, Mood: ${fields.mood}, Setting: ${fields.world}, Including: ${fields.favoriteThings}.`;

  return `${languageInstruction}${basePrompt}`;
}

export function generateLanguageSpecificPrompt(
  originalPrompt: string,
  language: string
): string {
  const langLower = language.toLowerCase();
  
  if (langLower === "urdu" || langLower === "ur") {
    return `آپ کو مکمل کہانی صرف اردو زبان میں لکھنی ہے۔ انگریزی یا ہندی کے الفاظ بالکل استعمال نہ کریں۔ Write ONLY in pure Urdu language using Arabic script. Avoid mixing scripts. ${originalPrompt}`;
  }
  
  if (langLower === "roman urdu" || langLower === "roman-urdu" || langLower === "romanurdu") {
    return `Write ONLY in Roman Urdu using Latin letters. Use Urdu vocabulary written in English alphabet (like 'ek sundar din tha', 'bacha bahut khush tha'). Do NOT write in pure English. Every word must be Urdu written in Roman script. ${originalPrompt}`;
  }
  
  return originalPrompt;
}

export function generateImagePrompt(fields: StoryFields): string {
  return `Create a children's book illustration for ${fields.ageGroup} age group. Theme: ${fields.theme}, Mood: ${fields.mood}, Setting: ${fields.world}, Including: ${fields.favoriteThings}.`;
}