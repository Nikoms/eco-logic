import { ElectricMeter } from '@eco/domain/src/Electricity/Entity/ElectricMeter';

export interface ElectricityMeterRepositoryInterface {
  getAll(): Promise<ElectricMeter[]>;

  nextIdentity(): Promise<string>;

  get(id: string): Promise<ElectricMeter | undefined>;

  save(electricMeter: ElectricMeter): Promise<void>;

  update(electricMeter: ElectricMeter): Promise<void>;
}
