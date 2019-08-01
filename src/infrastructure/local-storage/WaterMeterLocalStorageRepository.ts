import { JsonOf } from './type/JsonOf';
import { v4 } from 'uuid';
import { WaterMeter, WaterMeterRepositoryInterface } from '../../eco/domain';


export class WaterMeterLocalStorageRepository implements WaterMeterRepositoryInterface {
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

  private getList(): WaterMeter[] {
    const rawList: JsonOf<WaterMeter>[] = JSON.parse(this.localstorage.getItem(this.key) || '[]');
    return rawList.map(raw => new WaterMeter(raw.id, raw.name));
  }
}
