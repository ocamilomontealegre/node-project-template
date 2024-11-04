import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

export class FileUtils {
  public static readonly getCurrentDirectory = (metaURL: string): string => {
    /* eslint @typescript-eslint/naming-convention: "off" */
    const __filename = fileURLToPath(metaURL);
    return dirname(__filename);
  };
}
