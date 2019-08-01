import { v4 } from 'uuid';
import { ElectricityMeterRepositoryInterface, ElectricMeter } from '../../../eco/domain';
import { ElectricityApi } from './ElectricityApi';

export class ElectricityMeterFakeApiRepository implements ElectricityMeterRepositoryInterface {
  constructor(private api: ElectricityApi) {
  }

  getAll(): Promise<ElectricMeter[]> {
    return this.api.getElectricMeters();
  }

  async nextIdentity(): Promise<string> {
    return v4();
  }

  async get(id: string): Promise<ElectricMeter | undefined> {
    return this.api.getElectricMeter(id);
  }

  async add(electricMeter: ElectricMeter): Promise<void> {
    await this.api.add(electricMeter);
  }

  async update(electricMeter: ElectricMeter): Promise<void> {
    await this.api.updatePowerConsumption(electricMeter);
  }
}
