import { ElectricMeter } from '../Entity/ElectricMeter';

export interface ElectricityMeterRepositoryInterface {
  getAll(): Promise<ElectricMeter[]>;

  nextIdentity(): Promise<string>;

  get(id: string): Promise<ElectricMeter | undefined>;

  add(electricMeter: ElectricMeter): Promise<void>;

  update(electricMeter: ElectricMeter): Promise<void>;
}
