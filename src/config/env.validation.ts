import Joi from "joi";

export const validationSchema = Joi.object({
  USER_EMAIL: Joi.string().required(),
  USER_PASSWORD: Joi.string().required(),
  PORT: Joi.number().default(3000),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_HOST: Joi.string().required(),
  DB_SYNC: Joi.boolean().default(false),
  DB_MIGRATION: Joi.boolean().default(true),
  DB_LOG: Joi.boolean().default(false),
  JWT_SECRET: Joi.string().required(),
  JWT_TOKEN_AUDIENCE: Joi.string().required(),
  JWT_TOKEN_ISSUER: Joi.string().required(),
  JWT_ACCESS_TOKEN_TTL: Joi.number().default(3600),
  JWT_REFRESH_TOKEN_TTL: Joi.number().default(86400),
  API_KEY: Joi.string().required(),
});
