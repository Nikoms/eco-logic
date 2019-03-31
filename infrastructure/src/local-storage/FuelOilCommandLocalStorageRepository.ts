import { FuelOilCommandRepository } from '@eco/fuel-oil/src/repository/FuelOilCommandRepository';
import { JsonOf } from './type/JsonOf';
import { FuelOilCommand } from '@eco/fuel-oil/src/entity/FuelOilCommand';

export class FuelOilCommandLocalStorageRepository implements FuelOilCommandRepository {
  private key = 'fuel-oil-command';

  constructor(private localstorage: Storage) {
    if (!this.localstorage.getItem(this.key)) {
      this.saveList([]);
    }
  }

  async add(fuelOilCommand: FuelOilCommand) {
    const list = this.getList();
    list.push(fuelOilCommand);
    this.saveList(list);
  }

  async getLast() {
    return this.getList().pop();
  }

  private saveList(list: any[]) {
    const listAsJson = JSON.stringify(list);
    this.localstorage.setItem(this.key, listAsJson);
  }

  private getList(): FuelOilCommand[] {
    const rawList: JsonOf<FuelOilCommand>[] = JSON.parse(this.localstorage.getItem(this.key) || '[]');
    return rawList.map(raw => new FuelOilCommand(raw.liters, new Date(raw.date)));
  }
}
