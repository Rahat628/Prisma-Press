import dotenv from "dotenv";
import path, { join } from "path";

dotenv.config({path : path.resolve(process.cwd(), ".env")});

export default {
    databaseUrl  : process.env.DATABASE_URL ,
    port : process.env.PORT,
    appUrl : process.env.APP_URL,
    saltRounds : process.env.SALT_ROUNDS,
    jwtAccessSecret : process.env.JWT_ACCESS_SECRET,
    jwtAccessExpiresIn : process.env.JWT_ACCESS_EXPIRES_IN,
    jwtRefreshSecret : process.env.JWT_REFRESH_SECRET,
    jwtRefreshExpiresIn : process.env.JWT_REFRESH_EXPIRES_IN
}