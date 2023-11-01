import dotenv from 'dotenv';

dotenv.config();

export default {
    auth: {
        accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'access-token-secret',
        refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'refresh-token-secret'
    },
    environment: process.env.NODE_ENV || "development",  
    env_port: process.env.PORT || 8000,
    host: process.env.APP_HOST || '127.0.0.1',
}