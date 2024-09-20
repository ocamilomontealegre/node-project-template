import { z } from "zod";

const EnvSchema = z.object({
  APP_DOCS_ENDPOINT: z.string().min(1, "APP_DOCS_ENDPOINT cannot be empty").default("docs"),
  APP_DOCS_VERSION: z.string().default("1.0.0"),
  APP_GLOBAL_PREFIX: z.string().min(1, "APP_GLOBAL_PREFIX cannot be empty").default("api"),
  APP_VERSION: z.string().min(1, "APP_VERSION cannot be empty").default("v1"),
});

interface AppEnvironment {
  readonly appDocsEndpoint: string;
  readonly appDocsVersion: string;
  readonly appGlobalPrefix: string;
  readonly appVersion: string;
}

const parsedEnv = EnvSchema.parse(process.env);

export const appConfig: AppEnvironment = {
  appDocsEndpoint: parsedEnv.APP_DOCS_ENDPOINT,
  appDocsVersion: parsedEnv.APP_DOCS_VERSION,
  appGlobalPrefix: parsedEnv.APP_GLOBAL_PREFIX,
  appVersion: parsedEnv.APP_VERSION,
};
