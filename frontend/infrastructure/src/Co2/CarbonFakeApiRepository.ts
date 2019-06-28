import { CarbonRepository } from '@eco/domain/src/Co2/Repository/CarbonRepository';
import { Carbon } from '@eco/domain/src/Co2/Entity/Carbon';
import { v4 } from 'uuid';
import { CarbonApi } from '@eco/frontend-infrastructure/src/Co2/CarbonApi';

export class CarbonFakeApiRepository implements CarbonRepository {
  constructor(private api: CarbonApi) {
  }

  async add(carbon: Carbon): Promise<void> {
    await this.api.add(carbon);
  }

  getAll(): Promise<Carbon[]> {
    return this.api.getAll();
  }

  async nextIdentity(): Promise<string> {
    return v4();
  }
}
