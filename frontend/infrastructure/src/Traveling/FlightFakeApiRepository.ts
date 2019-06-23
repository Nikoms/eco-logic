import { FlightRepositoryInterface } from '@eco/domain/src/Traveling/UseCase/FlightRepositoryInterface';
import { v4 } from 'uuid';
import { PlaneTravel } from '@eco/domain/src/Traveling/Entity/PlaneTravel';
import { TravelingApi } from '@eco/frontend-infrastructure/src/Traveling/TravelingApi';

export class FlightFakeApiRepository implements FlightRepositoryInterface {
  constructor(private api: TravelingApi) {
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
