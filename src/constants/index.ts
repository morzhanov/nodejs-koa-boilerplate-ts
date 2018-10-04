import dotenv from "dotenv";
dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || "development";
export const PORT = 4000;
export const API_URI = "/api";
export const POSTGRES_HOST = process.env.POSTGRES_DB;
export const POSTGRES_PORT = process.env.POSTGRES_PORT;
export const POSTGRES_USERNAME = process.env.POSTGRES_USERNAME;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
export const POSTGRES_DATABASE_NAME = process.env.POSTGRES_DATABASE_NAME;
export const SECRET = process.env.SECRET;
