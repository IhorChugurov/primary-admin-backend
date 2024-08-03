import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";

config();

const configService = new ConfigService();

export default new DataSource({
  type: "postgres",
  username: configService.get("DB_USER"),
  password: configService.get("DB_PASSWORD"),
  database: configService.get("DB_NAME"),
  port: configService.get("DB_PORT"),
  host: configService.get("DB_HOST"),
  migrationsRun: configService.get("DB_MIGRATION") === "true",
  logging: configService.get("DB_LOG") === "true",
  synchronize: false,
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ["src/migrations/**/*.ts"],
});
