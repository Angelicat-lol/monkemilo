const { Redis } = require("@upstash/redis");

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

exports.handler = async () => {
  try {
    // This gets all your saved Miis from Redis
    const miis = await redis.lrange("miis", 0, -1);
    
    return {
      statusCode: 200,
      body: JSON.stringify(miis.map(m => JSON.parse(m)))
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
  
};