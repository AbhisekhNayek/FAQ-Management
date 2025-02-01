import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    translations: {
      question_translation: {
        type: Map,
        of: String,
      },
      answer_translation: {
        type: Map,
        of: String,
      },
    },
  },
  { timestamps: true }
);

const FAQ = mongoose.model("FAQ", faqSchema);


export default FAQ;
