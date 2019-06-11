import { ElectricityMeterRepositoryInterface } from '@eco/domain/src/Electricity/Repository/ElectricityMeterRepositoryInterface';
import { ElectricMeter } from '@eco/core-electricity/src/entity/ElectricMeter';
import { Api } from '@eco/domain/src/Temp/Api';

export class ElectricityMeterFakeApiRepository implements ElectricityMeterRepositoryInterface {
  constructor(private api: Api) {

  }

  async add(electricMeter: ElectricMeter): Promise<void> {
  }

  getAll(): Promise<ElectricMeter[]> {
    return this.api.getElectricMeters();
  }

}
