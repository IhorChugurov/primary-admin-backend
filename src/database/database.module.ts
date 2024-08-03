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
        username: configService.get<string>("db.username"),
        password: configService.get<string>("db.password"),
        database: configService.get<string>("db.database"),
        port: configService.get<number>("db.port"),
        host: configService.get<string>("db.host"),
        // Automatically run database migrations every time the application is started.
        migrationsRun: true,
        // logging of database queries and other related activities.
        logging: configService.get<boolean>("db.logging"),
        // Load modules automatically instead of specifying the entities array.
        autoLoadEntities: true,
        // Synchronize the database schema with the entities, every time the application starts.
        synchronize: false,
        logger: "advanced-console",
        poolSize: 20, // Adjust this value as needed
        connectTimeoutMS: 10000,
      }),
    }),
  ],
})
export class DatabaseModule {}
