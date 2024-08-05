import { registerAs } from "@nestjs/config";

export default registerAs("apikey", () => ({
  apiKey: process.env.API_KEY,
}));
