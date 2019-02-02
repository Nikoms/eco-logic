import { WaterMeter } from '@eco/domain/src/water/entity/WaterMeter';
import { WaterMeterRepository } from '@eco/domain/src/water/repository/WaterMeterRepository';
import { JsonOf } from '@eco/application/src/type/JsonOf';

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
