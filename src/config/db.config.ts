import { registerAs } from "@nestjs/config";

export default registerAs("db", () => ({
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  host: process.env.DB_HOST,
  logging: process.env.DB_LOG === "true",
}));
