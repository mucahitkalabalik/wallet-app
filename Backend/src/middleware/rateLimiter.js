import  rateLimit  from "../config/upstash.js";
const rateLimiter = async (req, res, next) => {
  try {
    const ip =
      req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const result = await rateLimit.limit(ip);

    if (!result.success) {
      return res
        .status(429)
        .json({ message: "Too many requests, please try again later." });
    }

    next();
  } catch (error) {
    console.error("Rate limiter error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default rateLimiter;
