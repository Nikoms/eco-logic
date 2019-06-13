import { Odometer } from '@eco/core-travel/src/entity/Odometer';
import { OdometerRepositoryInterface } from '@eco/domain/src/Traveling/UseCase/OdometerRepositoryInterface';
import { Api } from '@eco/frontend-infrastructure/src/Api';
import { v4 } from 'uuid';

export class OdometerFakeApiRepository implements OdometerRepositoryInterface {
  constructor(private api: Api) {

  }

  async add(odometer: Odometer): Promise<void> {
    await this.api.updateOdometer(odometer);
  }

  async nextIdentity(): Promise<string> {
    return v4();
  }
}
