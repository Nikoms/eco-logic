import { ElectricityMeterRepositoryInterface } from '@eco/domain/src/Electricity/Repository/ElectricityMeterRepositoryInterface';
import { v4 } from 'uuid';
import { ElectricMeter } from '@eco/domain/src/Electricity/Entity/ElectricMeter';
import { ElectricityApi } from '@eco/frontend-infrastructure/src/Electricity/ElectricityApi';

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
