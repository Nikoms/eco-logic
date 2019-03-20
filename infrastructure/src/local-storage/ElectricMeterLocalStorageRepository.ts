import { JsonOf } from './type/JsonOf';
import { ElectricMeterRepository } from '@eco/core-electricity/src/repository/ElectricMeterRepository';
import { ElectricMeter } from '@eco/core-electricity/src/entity/ElectricMeter';

export class ElectricMeterLocalStorageRepository implements ElectricMeterRepository {
  private key = 'electric-meters';

  constructor(private localstorage: Storage) {
    if (!this.localstorage.getItem(this.key)) {
      this.saveList([]);
    }
  }

  async add(powerConsumption: ElectricMeter) {
    const list = this.getList();
    list.push(powerConsumption);
    this.saveList(list);
  }

  async getElectricMeter(electricMeterId: string): Promise<ElectricMeter | undefined> {
    return this.getList().find(m => m.id === electricMeterId);
  }

  async getAll() {
    return this.getList();
  }

  private saveList(list: any[]) {
    const listAsJson = JSON.stringify(list);
    this.localstorage.setItem(this.key, listAsJson);
  }

  private getList(): ElectricMeter[] {
    const rawList: JsonOf<ElectricMeter>[] = JSON.parse(this.localstorage.getItem(this.key) || '[]');
    return rawList.map(raw => new ElectricMeter(raw.id, raw.name));
  }

}
