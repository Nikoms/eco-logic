import { JsonOf } from './type/JsonOf';
import { CarRepository } from '@eco/core-travel/src/repository/CarRepository';
import { Car, Engine } from '@eco/core-travel/src/entity/Car';

export class CarLocalStorageRepository implements CarRepository {
  private key = 'cars';

  constructor(private localstorage: Storage) {
    if (!this.localstorage.getItem(this.key)) {
      this.saveList([]);
    }
  }

  async add(powerConsumption: Car) {
    const list = this.getList();
    list.push(powerConsumption);
    this.saveList(list);
  }

  async getAll() {
    return this.getList();
  }

  async getCar(carId: string): Promise<Car | undefined> {
    return this.getList().find(c => c.id === carId);
  }

  private saveList(list: any[]) {
    const listAsJson = JSON.stringify(list);
    this.localstorage.setItem(this.key, listAsJson);
  }

  private getList(): Car[] {
    const rawList: JsonOf<Car>[] = JSON.parse(this.localstorage.getItem(this.key) || '[]');
    return rawList.map(raw => new Car(raw.id, raw.name, raw.consumption, raw.engine as Engine));
  }
}