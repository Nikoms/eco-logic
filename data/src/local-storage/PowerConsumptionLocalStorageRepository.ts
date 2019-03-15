import { JsonOf } from './type/JsonOf';
import { PowerConsumptionRepository } from '@eco/electricity/src/repository/PowerConsumptionRepository';
import { PowerConsumption } from '@eco/electricity/src/entity/PowerConsumption';

export class PowerConsumptionLocalStorageRepository implements PowerConsumptionRepository {
  private key = 'power-consumptions';

  constructor(private localstorage: Storage) {
    if (!this.localstorage.getItem(this.key)) {
      this.saveList([]);
    }
  }

  async add(powerConsumption: PowerConsumption) {
    const list = this.getList();
    list.push(powerConsumption);
    this.saveList(list);
  }

  private saveList(list: any[]) {
    const listAsJson = JSON.stringify(list);
    this.localstorage.setItem(this.key, listAsJson);
  }

  private getList(): PowerConsumption[] {
    const rawList: JsonOf<PowerConsumption>[] = JSON.parse(this.localstorage.getItem(this.key) || '[]');
    return rawList.map(raw => new PowerConsumption(raw.id, raw.kWh, raw.electricMeter, new Date(raw.date)));
  }

  async getAll() {
    return this.getList();
  }

  async getConsumptionBefore(id: string): Promise<PowerConsumption | undefined> {
    const consumptions = this.getList();
    const index = consumptions.findIndex(c => c.id === id);
    if (index <= 0) {
      return;
    }
    return consumptions[index - 1];
  }
}
