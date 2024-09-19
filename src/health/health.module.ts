import { ContainerModule, type interfaces } from "inversify";
import { HealthController } from "./controllers/health.controller";
import { HealthService } from "./services/health.service";
import { HealthRouter } from "./router/health.router";

export const HealthModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<HealthService>(HealthService).toSelf().inSingletonScope();
  bind<HealthController>(HealthController).toSelf().inSingletonScope();
  bind<HealthRouter>(HealthRouter).toSelf().inSingletonScope();
});
