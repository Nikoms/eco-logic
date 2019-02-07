import { CarbonRepository } from '@eco/domain/src/co2/repository/CarbonRepository';
import { JsonOf } from '@eco/application/src/type/JsonOf';
import { Carbon } from '@eco/domain/src/co2/entity/Carbon';

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
