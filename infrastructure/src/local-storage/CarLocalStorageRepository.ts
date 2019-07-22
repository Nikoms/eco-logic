import { CarRepositoryInterface } from '@eco/domain/src/Traveling/UseCase/CarRepositoryInterface';
import { Car, Engine } from '@eco/domain/src/Traveling/Entity/Car';
import { v4 } from 'uuid';

interface CarJson {
  id: string;
  name: string;
  consumption: number;
  engine: string;
  _lastKmUpdate: string;
  _km: number;
}

export class CarLocalStorageRepository implements CarRepositoryInterface {
  private key = 'cars';

  constructor(private localstorage: Storage) {
    if (!this.localstorage.getItem(this.key)) {
      this.saveList([]);
    }
  }


  async add(car: Car): Promise<void> {
    const list = this.getList();
    list.push(car);
    this.saveList(list);
  }

  async getAll(): Promise<Car[]> {
    return this.getList().reverse();
  }

  async nextIdentity(): Promise<string> {
    return v4();
  }

  async get(carId: string): Promise<Car | undefined> {
    return this.getList().find((c) => c.id === carId);
  }

  async update(car: Car): Promise<void> {
    const list = this.getList();
    const index = list.findIndex((c) => c.id === car.id);
    list[index] = car;
    this.saveList(list);
  }

  private saveList(list: any[]) {
    const listAsJson = JSON.stringify(list);
    this.localstorage.setItem(this.key, listAsJson);
  }

  private getList(): Car[] {
    const rawList: CarJson[] = JSON.parse(this.localstorage.getItem(this.key) || '[]');
    return rawList.map(raw => new Car(raw.id, raw.name, raw.consumption, raw.engine as Engine, new Date(raw._lastKmUpdate), raw._km));
  }

}
