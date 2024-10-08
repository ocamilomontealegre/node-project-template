import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

export const getCurrentDirectory = (metaURL: string): string => {
  /* eslint-disable */
  const __filename = fileURLToPath(metaURL);
  return dirname(__filename);
};

