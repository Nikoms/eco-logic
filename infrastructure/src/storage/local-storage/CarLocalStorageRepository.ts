import { JsonOf } from '@eco/application/src/type/JsonOf';
import { CarRepository } from '@eco/domain/src/traveling/repository/CarRepository';
import { Car, Engine } from '@eco/domain/src/traveling/entity/Car';

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

  private saveList(list: any[]) {
    const listAsJson = JSON.stringify(list);
    this.localstorage.setItem(this.key, listAsJson);
  }

  private getList(): Car[] {
    const rawList: JsonOf<Car>[] = JSON.parse(this.localstorage.getItem(this.key) || '[]');
    return rawList.map(raw => new Car(raw.id, raw.name, raw.consumption, raw.engine as Engine));
  }

  async getAll() {
    return this.getList();
  }
}
