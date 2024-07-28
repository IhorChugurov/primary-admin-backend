import { Module } from "@nestjs/common";
import { CoffeesModule } from "./coffees/coffees.module";
import { CoffeeRatingModule } from "./coffee-rating/coffee-rating.module";
import { ConfigModule } from "@nestjs/config";
import { CommonModule } from "./common/common.module";
import { UsersModule } from "./users/users.module";
import { IamModule } from "./iam/iam.module";
import appConfig from "./config/app.config";
import dbConfig from "./config/db.config";
import { validationSchema } from "./config/env.validation";
import { PrimaryRolesModule } from "./primary-roles/primary-roles.module";
import { PrimaryUsersModule } from "./primary-users/primary-users.module";
import { DatabaseModule } from "./database/database.module";
import { SharedModule } from "./shared/shared.module";
import { SeedModule } from "./seeds/seeds.module";
import { ProjectsModule } from "./projects/projects.module";
import { FacilitiesModule } from "./facilities/facilities.module";
import { GroupsModule } from "./groups/groups.module";
import { GroupRolesModule } from "./group-roles/group-roles.module";
import { FacilityRolesModule } from "./facility-roles/facility-roles.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: validationSchema,
      load: [appConfig, dbConfig],
      envFilePath: `.env.${process.env.NODE_ENV || "development"}`,
    }),
    DatabaseModule,
    IamModule,
    SeedModule,
    CoffeesModule,
    CoffeeRatingModule,
    CommonModule,
    UsersModule,
    PrimaryRolesModule,
    PrimaryUsersModule,
    SharedModule,
    ProjectsModule,
    FacilitiesModule,
    GroupsModule,
    GroupRolesModule,
    FacilityRolesModule,
  ],
})
export class AppModule {}
