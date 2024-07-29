import { Module } from "@nestjs/common";
import { HashingService } from "./hashing/hashing.service";
import { BcryptService } from "./hashing/bcrypt.service";
import { PasswordService } from "./password.service";

@Module({
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    PasswordService,
  ],
  exports: [HashingService, PasswordService],
})
export class SharedModule {}
