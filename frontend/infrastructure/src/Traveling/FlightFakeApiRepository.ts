import { FlightRepositoryInterface } from '@eco/domain/src/Traveling/UseCase/FlightRepositoryInterface';
import { PlaneTravel } from '@eco/core-travel/src/entity/PlaneTravel';
import { Api } from '@eco/frontend-infrastructure/src/Api';
import { v4 } from 'uuid';

export class FlightFakeApiRepository implements FlightRepositoryInterface {
  constructor(private api: Api) {

  }

  async add(flight: PlaneTravel): Promise<void> {
    await this.api.addPlaneTravel(flight);
  }

  getAll(): Promise<PlaneTravel[]> {
    return this.api.getPlaneTravels();
  }

  async nextIdentity(): Promise<string> {
    return v4();
  }
}
