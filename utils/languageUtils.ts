
export function isCorrectLanguage(text: string, language: string): boolean {
  const langLower = language.toLowerCase();
  
  if (langLower === "english" || langLower === "en") {
    return true; 
  }
  
  if (langLower === "urdu" || langLower === "ur") {
    const englishChars = (text.match(/[a-zA-Z]/g) ?? []).length;
    const hindiChars = (text.match(/[\u0900-\u097F]/g) ?? []).length; 
    const urduChars = (text.match(/[\u0600-\u06FF]/g) ?? []).length;
    
    if (englishChars > 5 || hindiChars > 0) { 
      console.warn(`Language check failed: Found ${englishChars} English chars, ${hindiChars} Hindi chars in Urdu text`);
      return false;
    }
    
    const totalMeaningfulChars = text.replace(/[\s\d\.,!?;:()\-"'\u060C\u061B\u061F]/g, "").length;
    if (totalMeaningfulChars === 0) return true;
    
    return urduChars > totalMeaningfulChars * 0.8; 
  }
  
  if (langLower === "roman urdu" || langLower === "roman-urdu" || langLower === "romanurdu") {
    const hasArabicScript = /[\u0600-\u06FF]/.test(text);
    if (hasArabicScript) return false;
    
    const romanUrduWords = /\b(ek|aur|hai|ka|ki|ke|se|me|ko|ne|tha|thi|the|kya|koi|sab|yeh|ye|woh|wo|is|us|do|teen|bhi|nahi|haan|na|kahani|bacha|bache|ghar|pani|din|raat|aam|sundar|pyara|pyari|chhota|bada|khush|udas|dekh|sun|bol|kar|le|de|aa|ja|ho|hum|tum|ap|main|uska|hamara|tumhara|dost|dil|kaam|naam|saal)\b/gi;
    
    const matches = text.match(romanUrduWords);
    return matches !== null && matches.length >= 2;
  }
  
  const englishLetters = (text.match(/[a-zA-Z]/g) ?? []).length;
  const totalLetters = text.replace(/[\s\d\.,!?;:()\-"']/g, "").length;
  
  if (totalLetters === 0) return true;
  
  return englishLetters / totalLetters < 0.5; 
}


export function getSystemMessage(language: string): string {
  const langLower = language.toLowerCase();
  
  if (langLower === "urdu" || langLower === "ur") {
    return "You are a storyteller who writes only in Urdu language. Never use English words or sentences. Every response must be completely in Urdu script.";
  } else if (langLower === "roman urdu" || langLower === "roman-urdu" || langLower === "romanurdu") {
    return "You are a storyteller who writes ONLY in Roman Urdu. Write Urdu words using English/Latin alphabet. Use Urdu grammar and vocabulary but write everything in Roman script. Examples: 'Ek din ek bacha tha', 'Woh bahut pyara tha', 'Us ka naam Ali tha'. Never write in pure English. Every sentence must use Urdu words written in Latin letters.";
  } else {
    return `You are a storyteller who writes only in ${language} language. Never use English unless specifically requested.`;
  }
}

export function getTitleSystemMessage(language: string): string {
  const langLower = language.toLowerCase();
  
  if (langLower === "urdu" || langLower === "ur") {
    return "You are a storyteller who creates titles only in pure Urdu language using Arabic script. Never use English, Hindi, or Devanagari characters.";
  } else if (langLower === "roman urdu" || langLower === "roman-urdu" || langLower === "romanurdu") {
    return "You are a storyteller who creates titles ONLY in Roman Urdu using Latin alphabet. Write Urdu words in English letters like 'Ek Sundar Kahani', 'Bachon Ki Duniya', 'Pyari Si Titli'. Never use pure English words.";
  } else {
    return `You are a storyteller who creates titles only in ${language} language.`;
  }
}