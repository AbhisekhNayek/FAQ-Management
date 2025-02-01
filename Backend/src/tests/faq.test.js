import request from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import mongoose from "mongoose";
import app from "../server.js";

const TEST_MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/faq_api_test";

describe("FAQ API", () => {
  beforeAll(async () => {
    await mongoose.connect(TEST_MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create a new FAQ", async () => {
    const res = await request(app)
      .post("/api/faqs")
      .send({
        question: "What is Node.js?",
        answer: "Node.js is a runtime environment.",
      });

    expect(res.status).toBe(201);
    expect(res.body.question).toBe("What is Node.js?");
    expect(res.body.answer).toBe("Node.js is a runtime environment.");
  });
});
