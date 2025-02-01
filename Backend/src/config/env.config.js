import dotenv from "dotenv";

dotenv.config();

export const config = {

  PORT: process.env.PORT || 4000,
  MONGODB_URI: process.env.MONGODB_URI,
  REDIS_URL: process.env.REDIS_URL,
  REDIS_USERNAME: process.env.REDIS_USERNAME,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_PORT: process.env.REDIS_PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  CORS_ORIGIN:  process.env.CORS_ORIGIN
};
