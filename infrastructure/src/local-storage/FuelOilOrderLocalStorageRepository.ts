import { JsonOf } from './type/JsonOf';
import { FuelOilOrder } from '@eco/fuel-oil/src/entity/FuelOilOrder';
import { FuelOilOrderRepository } from '@eco/fuel-oil/src/repository/FuelOilOrderRepository';

export class FuelOilOrderLocalStorageRepository implements FuelOilOrderRepository {
  private key = 'fuel-oil-command';

  constructor(private localstorage: Storage) {
    if (!this.localstorage.getItem(this.key)) {
      this.saveList([]);
    }
  }

  async add(fuelOilOrder: FuelOilOrder) {
    const list = this.getList();
    list.push(fuelOilOrder);
    this.saveList(list);
  }

  async getLast() {
    return this.getList().pop();
  }

  getTotal(): number {
    return this.getList().reduce((total, command) => {
      return total + command.liters;
    }, 0);
  }

  private saveList(list: any[]) {
    const listAsJson = JSON.stringify(list);
    this.localstorage.setItem(this.key, listAsJson);
  }

  private getList(): FuelOilOrder[] {
    const rawList: JsonOf<FuelOilOrder>[] = JSON.parse(this.localstorage.getItem(this.key) || '[]');
    return rawList.map(raw => new FuelOilOrder(raw.liters, new Date(raw.date)));
  }
}