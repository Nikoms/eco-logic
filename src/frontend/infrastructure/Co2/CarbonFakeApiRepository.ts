import { v4 } from 'uuid';
import { CarbonApi } from './CarbonApi';
import { Carbon, CarbonRepository } from '../../../eco/domain';

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
