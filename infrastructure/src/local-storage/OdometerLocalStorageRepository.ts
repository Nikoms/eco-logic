import { JsonOf } from './type/JsonOf';
import { OdometerRepository } from '@eco/core-travel/src/repository/OdometerRepository';
import { Odometer } from '@eco/core-travel/src/entity/Odometer';

export class OdometerLocalStorageRepository implements OdometerRepository {
  private key = 'odometer';

  constructor(private localstorage: Storage) {
    if (!this.localstorage.getItem(this.key)) {
      this.saveList([]);
    }
  }

  async add(odoMeter: Odometer) {
    const list = this.getList();
    list.push(odoMeter);
    this.saveList(list);
  }

  private saveList(list: any[]) {
    const listAsJson = JSON.stringify(list);
    this.localstorage.setItem(this.key, listAsJson);
  }

  private getList(): Odometer[] {
    const rawList: JsonOf<Odometer>[] = JSON.parse(this.localstorage.getItem(this.key) || '[]');
    return rawList.map(raw => new Odometer(raw.id, raw.carId, raw.km, new Date(raw.date)));
  }

  async getLast(carId: string) {
    return this.getList().filter(odoMeter => odoMeter.carId === carId).pop();
  }
}
