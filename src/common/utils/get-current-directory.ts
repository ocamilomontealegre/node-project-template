import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

export const getCurrentDirectory = (): string => {
  /* eslint-disable */
  const __filename = fileURLToPath(import.meta.url);
  return dirname(__filename);
};
