import ElectricMeter from '../../../../domain/src/electricity/entity/ElectricMeter';
import { ElectricMeterRepository } from '../../../../domain/src/electricity/repository/ElectricMeterRepository';
import { JsonOf } from '../../../../application/src/type/JsonOf';

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

  private saveList(list: any[]) {
    const listAsJson = JSON.stringify(list);
    this.localstorage.setItem(this.key, listAsJson);
  }

  private getList(): ElectricMeter[] {
    const rawList: JsonOf<ElectricMeter>[] = JSON.parse(this.localstorage.getItem(this.key) || '[]');
    return rawList.map(raw => new ElectricMeter(raw.id, raw.name));
  }

  async getAll() {
    return this.getList();
  }
}
