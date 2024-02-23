const { REDIS_URL } = require("./config");
const { Redis } = require("ioredis");
const { error, info } = require("./logger");

const redisClient = () => {
  if (REDIS_URL) {
    return REDIS_URL;
    info("Redis Connected");
  }
  throw new error("Redis connection failed");
};

module.exports = new Redis(redisClient());