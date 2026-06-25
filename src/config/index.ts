import dotenv from "dotenv";
import path from "path";

dotenv.config({path : path.resolve(process.cwd(), ".env")});

export default {
    databaseUrl  : process.env.DATABASE_URL ,
    port : process.env.PORT,
    appUrl : process.env.APP_URL,
    saltRounds : process.env.SALT_ROUNDS 
}