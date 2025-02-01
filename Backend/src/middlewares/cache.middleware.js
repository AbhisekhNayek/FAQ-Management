import { redisClient } from "../config/cache.config.js";

export const cacheMiddleware = async (req, res, next) => {
  try {
    // Validate request objects
    if (!req || !res || typeof next !== "function") {
      console.error("Invalid request/response object in cacheMiddleware");
      return res?.status?.(500)?.json?.({ error: "Internal Server Error" });
    }

    const cachedData = await redisClient.get(req.originalUrl);
    if (cachedData) {
      console.log("Serving data from Redis cache");
      return res.json(JSON.parse(cachedData));
    }
  } catch (error) {
    console.error("Redis Cache Error:", error);
  }

  next(); 
};
