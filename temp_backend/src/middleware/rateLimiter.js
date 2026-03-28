import { createRateLimiter } from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const ratelimit = createRateLimiter(); // created at runtime

    const { success } = await ratelimit.limit("my-rate-limit-key");

    if (!success) {
      return res.status(429).json({
        message: "Too many requests! Please try again later.",
      });
    }

    next();
  } catch (error) {
    console.log("Error in rate limiter", error);
    next(error);
  }
};

export default rateLimiter;