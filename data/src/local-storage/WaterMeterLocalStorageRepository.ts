import { JsonOf } from './type/JsonOf';
import { WaterMeterRepository } from '@eco/water/src/repository/WaterMeterRepository';
import { WaterMeter } from '@eco/water/src/entity/WaterMeter';

export class WaterMeterLocalStorageRepository implements WaterMeterRepository {
  private key = 'water-meters';

  constructor(private localstorage: Storage) {
    if (!this.localstorage.getItem(this.key)) {
      this.saveList([]);
    }
  }

  async add(waterConsumption: WaterMeter) {
    const list = this.getList();
    list.push(waterConsumption);
    this.saveList(list);
  }

  private saveList(list: any[]) {
    const listAsJson = JSON.stringify(list);
    this.localstorage.setItem(this.key, listAsJson);
  }

  private getList(): WaterMeter[] {
    const rawList: JsonOf<WaterMeter>[] = JSON.parse(this.localstorage.getItem(this.key) || '[]');
    return rawList.map(raw => new WaterMeter(raw.id, raw.name));
  }

  async getAll() {
    return this.getList();
  }
}
