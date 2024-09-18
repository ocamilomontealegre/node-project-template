import { ContainerModule, type interfaces } from "inversify";
import { HealthController } from "./controllers/health.controller";
import { HealthService } from "./services/health.service";
import { HealthRouter } from "./router/health.router";
import { TYPES } from "./services/health.service";

export const HealthModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<HealthService>(TYPES.HealthService).to(HealthService).inSingletonScope();
  bind<HealthController>(HealthController).toSelf().inSingletonScope();
  bind<HealthRouter>(HealthRouter).toSelf().inSingletonScope();
});
