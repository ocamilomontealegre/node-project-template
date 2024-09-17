import { z } from "zod";
import { Environment } from "common/enums";

const EnvSchema = z.object({
  NODE_ENV: z.enum([
    Environment.DEVELOPMENT,
    Environment.PRODUCTION,
    Environment.TEST,
  ]),
  NODE_PORT: z.coerce
    .number({
      description:
        ".env files convert numbers to strings, therefore we have to enforce them to be numbers",
    })
    .positive()
    .max(65536)
    .default(3000),
});

interface NodeEnvironment {
  readonly env: string;
  readonly port: number;
}

const parsedEnv = EnvSchema.parse(process.env);

export const nodeConfig: NodeEnvironment = {
  env: parsedEnv.NODE_ENV,
  port: parsedEnv.NODE_PORT,
};
