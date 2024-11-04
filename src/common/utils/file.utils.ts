import { fileURLToPath } from "node:url";
import { dirname, basename } from "node:path";

export class FileUtils {
  public static readonly getCurrentDirectory = (metaURL: string): string => {
    /* eslint-disable-next-line @typescript-eslint/naming-convention */
    const __filename = fileURLToPath(metaURL);
    return dirname(__filename);
  };

  public static readonly getFilenme = (metaURL: string): string => {
    /* eslint-disable-next-line @typescript-eslint/naming-convention */
    const __filename = fileURLToPath(metaURL);
    return basename(__filename);
  };
}

