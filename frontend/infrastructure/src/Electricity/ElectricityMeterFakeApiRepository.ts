import { ElectricityMeterRepositoryInterface } from '@eco/domain/src/Electricity/Repository/ElectricityMeterRepositoryInterface';
import { ElectricMeter } from '@eco/core-electricity/src/entity/ElectricMeter';
import { v4 } from 'uuid';
import { Api } from '@eco/frontend-infrastructure/src/Api';

export class ElectricityMeterFakeApiRepository implements ElectricityMeterRepositoryInterface {
  constructor(private api: Api) {
  }

  async add(electricMeter: ElectricMeter): Promise<void> {
    await this.api.addElectricMeter(electricMeter);
  }

  getAll(): Promise<ElectricMeter[]> {
    return this.api.getElectricMeters();
  }

  async nextIdentity(): Promise<string> {
    return v4();
  }
}
