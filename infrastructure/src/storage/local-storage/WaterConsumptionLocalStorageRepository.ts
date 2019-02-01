import { WaterConsumption } from '@eco/domain/src/water/entity/WaterConsumption';
import { WaterConsumptionRepository } from '@eco/domain/src/water/repository/WaterConsumptionRepository';
import { JsonOf } from '@eco/application/src/type/JsonOf';

export class WaterConsumptionLocalStorageRepository implements WaterConsumptionRepository {
  private key = 'water-consumptions';

  constructor(private localstorage: Storage) {
    if (!this.localstorage.getItem(this.key)) {
      this.saveList([]);
    }
  }

  async add(waterConsumption: WaterConsumption) {
    const list = this.getList();
    list.push(waterConsumption);
    this.saveList(list);
  }

  private saveList(list: any[]) {
    const listAsJson = JSON.stringify(list);
    this.localstorage.setItem(this.key, listAsJson);
  }

  private getList(): WaterConsumption[] {
    const rawList: JsonOf<WaterConsumption>[] = JSON.parse(this.localstorage.getItem(this.key) || '[]');
    return rawList.map(raw => new WaterConsumption(raw.id, raw.m3, raw.waterMeter, new Date(raw.date)));
  }

  async getAll() {
    return this.getList();
  }
}
