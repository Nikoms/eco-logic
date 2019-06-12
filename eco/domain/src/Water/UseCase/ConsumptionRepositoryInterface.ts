import { WaterConsumption } from '@eco/core-water/src/entity/WaterConsumption';

export interface ConsumptionRepositoryInterface {

  nextIdentity(): Promise<string>;

  add(waterConsumption: WaterConsumption): Promise<void>;

  getAll(): Promise<WaterConsumption[]>;
}
