import jwt from 'jsonwebtoken'
import User from '../models/User.js';
import redisClient from '../configs/redis.js';

export const protect = async (req, res, next) => {
    let token = req.headers.authorization;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded.id;

        // Check Redis cache first
        const cachedUser = await redisClient.get(`user:${userId}`);
        if (cachedUser) {
            req.user = JSON.parse(cachedUser);
            return next();
        }

        const user = await User.findById(userId)

        if(!user){
            return res.json({ success: false, message: "Not authorized, user not found" });
        }

        // Save serialized user to Redis cache for 15 minutes (or any suitable TTL)
        await redisClient.setEx(`user:${userId}`, 900, JSON.stringify(user));

        req.user = user;
        next()
    } catch (error) {
        res.status(401).json({message: "Not authorized, token failed"})
    }
}