import { PowerConsumption } from '../entity/PowerConsumption';

export interface PowerConsumptionRepository {
  add(powerConsumption: PowerConsumption): Promise<void>;

  getAll(): Promise<PowerConsumption[]>;

  getLastConsumption(): Promise<PowerConsumption | undefined>;
}
