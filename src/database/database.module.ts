import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("db.host"),
        port: configService.get<number>("db.port"),
        username: configService.get<string>("db.username"),
        password: configService.get<string>("db.password"),
        database: configService.get<string>("db.database"),
        // TODO почему нужно отключать на продакшене
        // Synchronize the database schema with the entities, every time the application starts.
        synchronize: configService.get<boolean>("db.synchronize"),
        // TODO разобраться
        // Load modules automatically instead of specifying the entities array.
        autoLoadEntities: true,
        logging: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
