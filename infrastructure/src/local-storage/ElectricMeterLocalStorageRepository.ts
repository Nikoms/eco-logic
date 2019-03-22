import { ElectricMeterRepository } from '@eco/core-electricity/src/repository/ElectricMeterRepository';
import { ElectricMeter } from '@eco/core-electricity/src/entity/ElectricMeter';

interface ElectricMeterJson {
  id: string;
  name: string;
  _kWh: number;
  _lastKWhUpdate: string;
}

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

  async update(electricMeter: ElectricMeter): Promise<void> {
    const list = this.getList();
    const index = list.findIndex(m => m.id === electricMeter.id);
    if (index === -1) {
      throw new Error('Electric meter unknown');
    }
    list[index] = electricMeter;
    this.saveList(list);
  }

  private saveList(list: any[]) {
    const listAsJson = JSON.stringify(list);
    this.localstorage.setItem(this.key, listAsJson);
  }

  private getList(): ElectricMeter[] {
    const rawList: ElectricMeterJson[] = JSON.parse(this.localstorage.getItem(this.key) || '[]');
    return rawList.map(raw => new ElectricMeter(raw.id, raw.name, raw._kWh, new Date(raw._lastKWhUpdate)));
  }

}
