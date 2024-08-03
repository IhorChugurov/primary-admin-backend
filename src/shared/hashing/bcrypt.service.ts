import { Injectable, Logger } from "@nestjs/common";
import { HashingService } from "./hashing.service";
import { compare, genSalt, hash } from "bcryptjs";

@Injectable()
export class BcryptService implements HashingService {
  private readonly logger = new Logger(BcryptService.name);
  async hash(data: string): Promise<string> {
    const salt = await genSalt();
    return hash(data, salt);
  }

  compare(data: string, encrypted: string): Promise<boolean> {
    return compare(data, encrypted);
  }
}
