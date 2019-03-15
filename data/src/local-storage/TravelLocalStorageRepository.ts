import { JsonOf } from './type/JsonOf';
import { TravelRepository } from '@eco/travel/src/repository/TravelRepository';
import { Travel, TravelType } from '@eco/travel/src/entity/Travel';

export class TravelLocalStorageRepository implements TravelRepository {
  private key = 'travels';

  constructor(private localstorage: Storage) {
    if (!this.localstorage.getItem(this.key)) {
      this.saveList([]);
    }
  }

  async add(powerConsumption: Travel) {
    const list = this.getList();
    list.push(powerConsumption);
    this.saveList(list);
  }

  private saveList(list: any[]) {
    const listAsJson = JSON.stringify(list);
    this.localstorage.setItem(this.key, listAsJson);
  }

  private getList(): Travel[] {
    const rawList: JsonOf<Travel>[] = JSON.parse(this.localstorage.getItem(this.key) || '[]');
    return rawList.map(raw => new Travel(raw.id, raw.type as TravelType, raw.typeId, raw.km, raw.description, new Date(raw.date)));
  }

  async getAll() {
    return this.getList();
  }
}
