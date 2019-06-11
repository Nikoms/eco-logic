import { PowerConsumption } from '@eco/core-electricity/src/entity/PowerConsumption';

export interface PowerConsumptionRepositoryInterface {
  add(powerConsumption: PowerConsumption): Promise<void>;
}
