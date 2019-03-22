import { ElectricMeter } from '../entity/ElectricMeter';

export interface ElectricMeterRepository {
  add(electricMeter: ElectricMeter): Promise<void>;

  getAll(): Promise<ElectricMeter[]>;

  getElectricMeter(electricMeterId: string): Promise<ElectricMeter | undefined>;

  update(electricMeter: ElectricMeter): Promise<void>;
}
