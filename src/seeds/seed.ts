import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { SeedService } from "./seeds.service";

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seedService = app.get(SeedService);

  try {
    await seedService.seed();
    console.log("Seeding complete");
  } catch (error) {
    console.error("Seeding failed", error);
  } finally {
    await app.close();
  }
}

bootstrap();
