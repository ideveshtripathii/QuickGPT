// In-memory mock replacing actual Redis for seamless local development
class DummyRedisClient {
    constructor() {
        this.cache = new Map();
    }
    async get(key) {
        return this.cache.get(key) || null;
    }
    async setEx(key, seconds, value) {
        this.cache.set(key, value);
        // Clean up memory after TTL to prevent memory leaks
        setTimeout(() => this.cache.delete(key), seconds * 1000);
    }
    async del(key) {
        this.cache.delete(key);
    }
    on(event, cb) {
        if (event === 'connect') {
            cb();
        }
    }
    async connect() {
        console.log('In-Memory Redis Mock Client Connected (Fallback)');
    }
}

const redisClient = new DummyRedisClient();
await redisClient.connect();

export default redisClient;
