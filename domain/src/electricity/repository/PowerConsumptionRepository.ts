import { PowerConsumption } from '../entity/PowerConsumption';

export interface PowerConsumptionRepository {
  add(powerConsumption: PowerConsumption): Promise<void>;

  getAll(): Promise<PowerConsumption[]>;

  getConsumptionBefore(id: string): Promise<PowerConsumption | undefined>
}
