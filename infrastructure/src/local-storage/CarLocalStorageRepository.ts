import { CarRepository } from '@eco/core-travel/src/repository/CarRepository';
import { Car, Engine } from '@eco/core-travel/src/entity/Car';

interface CarJson {
  id: string;
  name: string;
  consumption: number;
  engine: string;
  _lastKmUpdate: string;
  _km: number;
}

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

  async update(car: Car): Promise<void> {
    const list = this.getList();
    const index = this.getList().findIndex(c => c.id === car.id);
    if (index === -1) {
      throw new Error('Impossible to update an unknown car');
    }
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
