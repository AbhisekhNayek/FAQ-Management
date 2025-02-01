import express from "express";
import connectDB from "./config/db.config.js";
import { cacheMiddleware } from "./middlewares/cache.middleware.js";
import faqRoutes from "./routes/faq.routes.js";
import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";

const app = express();

// Connect to database and cache
connectDB();

// Middleware
app.use(cacheMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Error Handling Middleware
app.use(errorHandler);

// Home Route
app.get("/", (req, res) => {
    res.json({
      message: "Welcome to the FAQ Management API!",
      documentation: "Visit /api/faqs to access FAQs.",
      status: "API is running smoothly...",
  });
});

// Routes
app.use("/api/faqs", cacheMiddleware, faqRoutes);

app.use("/api/auth", authRoutes);

export default app;
