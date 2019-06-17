import { JsonOf } from './type/JsonOf';
import { WaterConsumption } from '@eco/domain/src/Water/Entity/WaterConsumption';
import { ConsumptionRepositoryInterface } from '@eco/domain/src/Water/UseCase/ConsumptionRepositoryInterface';
import { v4 } from 'uuid';

export class WaterConsumptionLocalStorageRepository2 implements ConsumptionRepositoryInterface {
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

  async getAll() {
    return this.getList();
  }

  async nextIdentity(): Promise<string> {
    return v4();
  }

  private saveList(list: any[]) {
    const listAsJson = JSON.stringify(list);
    this.localstorage.setItem(this.key, listAsJson);
  }

  private getList(): WaterConsumption[] {
    const rawList: JsonOf<WaterConsumption>[] = JSON.parse(this.localstorage.getItem(this.key) || '[]');
    return rawList.map(raw => new WaterConsumption(raw.id, raw.m3, raw.waterMeter, new Date(raw.date)));
  }
}
