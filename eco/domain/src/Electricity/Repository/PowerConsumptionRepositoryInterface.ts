import { PowerConsumption } from '@eco/domain/src/Electricity/Entity/PowerConsumption';

export interface PowerConsumptionRepositoryInterface {
  save(powerConsumption: PowerConsumption): Promise<void>;

  nextIdentity(): Promise<string>;
}
