import { CarbonRepository } from '@eco/core-co2/src/repository/CarbonRepository';
import { Carbon } from '@eco/core-co2/src/entity/Carbon';
import { JsonOf } from './type/JsonOf';

export class CarbonLocalStorageRepository implements CarbonRepository {
  private key = 'carbons';

  constructor(private localstorage: Storage) {
    if (!this.localstorage.getItem(this.key)) {
      this.saveList([]);
    }
  }

  async add(carbon: Carbon) {
    const list = this.getList();
    list.push(carbon);
    this.saveList(list);
  }

  private saveList(list: any[]) {
    const listAsJson = JSON.stringify(list);
    this.localstorage.setItem(this.key, listAsJson);
  }

  private getList(): Carbon[] {
    const rawList: JsonOf<Carbon>[] = JSON.parse(this.localstorage.getItem(this.key) || '[]');
    return rawList.map(raw => new Carbon(raw.id, raw.kg, raw.description, new Date(raw.date)));
  }

  async getAll() {
    return this.getList();
  }
}
