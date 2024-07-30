import { registerAs } from "@nestjs/config";

export default registerAs("db", () => ({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.DB_SYNC === "true",
  logging: process.env.DB_LOG === "true",
}));
