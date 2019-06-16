import { FlightRepositoryInterface } from '@eco/domain/src/Traveling/UseCase/FlightRepositoryInterface';
import { Api } from '@eco/frontend-infrastructure/src/Api';
import { v4 } from 'uuid';
import { PlaneTravel } from '@eco/domain/src/Traveling/Entity/PlaneTravel';

export class FlightFakeApiRepository implements FlightRepositoryInterface {
  constructor(private api: Api) {

  }

  async add(flight: PlaneTravel): Promise<void> {
    await this.api.addPlaneTravel(flight);
  }

  getAll(): Promise<PlaneTravel[]> {
    return this.api.getFlights();
  }

  async nextIdentity(): Promise<string> {
    return v4();
  }
}
