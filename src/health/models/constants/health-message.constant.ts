import type { IHealthMessage } from "../interfaces/health-message.interface";

export const HEALTH_MESSAGE: IHealthMessage = {
  status: "🚀 Service up and running... !",
  timestamp: new Date().toISOString(),
};
