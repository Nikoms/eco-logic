import { ElectricMeter } from '@eco/core-electricity/src/entity/ElectricMeter';

export interface ElectricityMeterRepositoryInterface {
  getAll(): Promise<ElectricMeter[]>;

  add(electricMeter: ElectricMeter): Promise<void>;
}
