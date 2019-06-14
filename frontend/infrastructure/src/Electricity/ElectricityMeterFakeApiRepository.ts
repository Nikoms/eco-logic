import { ElectricityMeterRepositoryInterface } from '@eco/domain/src/Electricity/Repository/ElectricityMeterRepositoryInterface';
import { v4 } from 'uuid';
import { Api } from '@eco/frontend-infrastructure/src/Api';
import { ElectricMeter } from '@eco/domain/src/Electricity/Entity/ElectricMeter';
import { ElectricMeterLocalStorageRepository2 } from '@eco/infrastructure/src/local-storage/ElectricMeterLocalStorageRepository2';

export class ElectricityMeterFakeApiRepository implements ElectricityMeterRepositoryInterface {
  constructor(private api: Api, private backRepo: ElectricMeterLocalStorageRepository2) {
  }

  getAll(): Promise<ElectricMeter[]> {
    return this.api.getElectricMeters();
  }

  async nextIdentity(): Promise<string> {
    return v4();
  }

  async get(id: string): Promise<ElectricMeter | undefined> {
    console.log('TODO : frontend please update me and create a use case');
    return this.backRepo.get(id);
  }

  async save(electricMeter: ElectricMeter): Promise<void> {
    await this.api.saveElectricMeter(electricMeter);
  }
}
