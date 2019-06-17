import { JsonOf } from './type/JsonOf';
import { PlaneTravel, Seat } from '@eco/domain/src/Traveling/Entity/PlaneTravel';
import { FlightRepositoryInterface } from '@eco/domain/src/Traveling/UseCase/FlightRepositoryInterface';
import { v4 } from 'uuid';

export class FlightLocalStorageRepository implements FlightRepositoryInterface {
  private key = 'flights';

  constructor(private localstorage: Storage) {
    if (!this.localstorage.getItem(this.key)) {
      this.saveList([]);
    }
  }

  async add(powerConsumption: PlaneTravel) {
    const list = this.getList();
    list.push(powerConsumption);
    this.saveList(list);
  }

  async getAll() {
    return this.getList();
  }

  async nextIdentity(): Promise<string> {
    return v4();
  }

  private saveList(list: any[]) {
    const listAsJson = JSON.stringify(list);
    this.localstorage.setItem(this.key, listAsJson);
  }

  private getList(): PlaneTravel[] {
    const rawList: JsonOf<PlaneTravel>[] = JSON.parse(this.localstorage.getItem(this.key) || '[]');
    return rawList.map(raw => new PlaneTravel(raw.id, raw.seat as Seat, raw.km, raw.description, new Date(raw.date)));
  }
}