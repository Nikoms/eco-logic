import { WaterConsumption } from '../entity/WaterConsumption';

export interface WaterConsumptionRepository {
  add(waterConsumption: WaterConsumption): Promise<void>;

  getAll(): Promise<WaterConsumption[]>;
}
