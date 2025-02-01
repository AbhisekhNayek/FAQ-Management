import {translate} from '@vitalets/google-translate-api';

const translateText = async (text, targetLang) => {
  try {
    const res = await translate(text, { to: targetLang });
    return res.text;
  } catch (error) {
    console.error("Translation Error:", error);
    return text; 
  }
};

export default translateText;
