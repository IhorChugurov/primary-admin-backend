import { registerAs } from "@nestjs/config";

export default registerAs("inituser", () => ({
  email: process.env.USER_EMAIL,
  password: process.env.USER_PASSWORD,
}));
