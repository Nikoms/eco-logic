import { WaterConsumption } from '../Entity/WaterConsumption';

export interface ConsumptionRepositoryInterface {

  nextIdentity(): Promise<string>;

  add(waterConsumption: WaterConsumption): Promise<void>;

  getAll(): Promise<WaterConsumption[]>;
}
