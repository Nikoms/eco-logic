import { v4 } from 'uuid';
import { ElectricityMeterRepositoryInterface, ElectricMeter } from '../../eco/domain';

interface ElectricMeterJson {
  id: string;
  name: string;
  _kWh: number;
  _lastKWhUpdate: string;
}

export class ElectricMeterLocalStorageRepository implements ElectricityMeterRepositoryInterface {
  private key = 'electric-meters';

  constructor(private localstorage: Storage) {
    if (!this.localstorage.getItem(this.key)) {
      this.saveList([]);
    }
  }

  async getAll(): Promise<ElectricMeter[]> {
    return this.getList();
  }

  async nextIdentity(): Promise<string> {
    return v4();
  }

  async get(id: string): Promise<ElectricMeter | undefined> {
    return this.getList().find((meter: ElectricMeter) => {
      return meter.id === id;
    });
  }

  add(electricMeterToSave: ElectricMeter): Promise<void> {
    return this.save(electricMeterToSave);
  }

  update(electricMeter: ElectricMeter): Promise<void> {
    return this.save(electricMeter);
  }

  private async save(electricMeterToSave: ElectricMeter) {
    const list = this.getList();
    const index = list.findIndex((meter: ElectricMeter) => {
      return meter.id === electricMeterToSave.id;
    });
    if (index === -1) {
      list.push(electricMeterToSave);
    } else {
      list[index] = electricMeterToSave;
    }
    this.saveList(list);
  }

  private getList(): ElectricMeter[] {
    const rawList: ElectricMeterJson[] = JSON.parse(this.localstorage.getItem(this.key) || '[]');
    return rawList.map(raw => new ElectricMeter(raw.id, raw.name, raw._kWh, new Date(raw._lastKWhUpdate)));
  }

  private saveList(list: any[]) {
    const listAsJson = JSON.stringify(list);
    this.localstorage.setItem(this.key, listAsJson);
  }

}
