import { PowerConsumption } from '../Entity/PowerConsumption';

export interface PowerConsumptionRepositoryInterface {
  save(powerConsumption: PowerConsumption): Promise<void>;

  nextIdentity(): Promise<string>;
}
