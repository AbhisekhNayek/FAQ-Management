import FAQ from "../models/faq.model.js";
import { redisClient } from "../config/cache.config.js";
import translateText from "../services/faq.service.js";

// Add FAQ with translations 
export const createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const languages = ["hi", "bn"];

    // Generate translations
    const translations = {};
    for (const lang of languages) {
      translations[`${lang}_question`] = await translateText(question, lang);
      translations[`${lang}_answer`] = await translateText(answer, lang);
    }

    const faq = new FAQ({ question, answer, translations });
    await faq.save();

    res.status(201).json(faq);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



// Get all FAQs (Accessible to all users)
export const getFAQs = async (req, res) => {
  try {
    const lang = req.query.lang || "en";
    const cacheKey = `faqs_${lang}`;

    // Check Redis cache
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    // Fetch FAQs from database
    const faqs = await FAQ.find();

    // Translate FAQs
    const translatedFAQs = faqs.map((faq) => {
      const translatedQuestion = faq.translations[`${lang}_question`] || faq.question;
      const translatedAnswer = faq.translations[`${lang}_answer`] || faq.answer;
      return {
        ...faq.toObject(),
        question: translatedQuestion,
        answer: translatedAnswer,
      };
    });

    // Store in cache (if Redis is connected)
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(translatedFAQs));

    res.json(translatedFAQs);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



// Update FAQ (Admin only)
export const updateFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;

    const faq = await FAQ.findById(id);
    if (!faq) return res.status(404).json({ message: "FAQ not found" });

    faq.question = question || faq.question;
    faq.answer = answer || faq.answer;

    // Update translations
    if (question) {
      const languages = ["hi", "bn"];
      for (const lang of languages) {
        faq.translations[`${lang}_question`] = await translateText(question, lang);
        faq.translations[`${lang}_answer`] = await translateText(answer, lang);
      }
    }

    await faq.save();
    res.json({ message: "FAQ updated successfully", faq });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



// Delete FAQ (Admin only)
export const deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const faq = await FAQ.findByIdAndDelete(id);

    if (!faq) return res.status(404).json({ message: "FAQ Not Found" });

    res.json({ message: "FAQ Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
