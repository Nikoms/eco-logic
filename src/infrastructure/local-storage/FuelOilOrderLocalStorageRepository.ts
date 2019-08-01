import { FuelOilOrder, FuelOilOrderRepositoryInterface } from '../../eco/domain';
import { JsonOf } from './type/JsonOf';

export class FuelOilOrderLocalStorageRepository implements FuelOilOrderRepositoryInterface {
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

  async getTotal(): Promise<number> {
    return this.getList().reduce((total, command) => {
      return total + command.liters;
    }, 0);
  }

  async getLast(max: number) {
    return this.getList().slice().reverse().slice(0, max);
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
