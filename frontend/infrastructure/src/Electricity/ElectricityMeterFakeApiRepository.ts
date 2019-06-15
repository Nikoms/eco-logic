import { ElectricityMeterRepositoryInterface } from '@eco/domain/src/Electricity/Repository/ElectricityMeterRepositoryInterface';
import { v4 } from 'uuid';
import { Api } from '@eco/frontend-infrastructure/src/Api';
import { ElectricMeter } from '@eco/domain/src/Electricity/Entity/ElectricMeter';

export class ElectricityMeterFakeApiRepository implements ElectricityMeterRepositoryInterface {
  constructor(private api: Api) {
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

  async save(electricMeter: ElectricMeter): Promise<void> {
    await this.api.saveElectricMeter(electricMeter);
  }

  async update(electricMeter: ElectricMeter): Promise<void> {
    await this.api.updatePowerConsumption(electricMeter);
  }
}
