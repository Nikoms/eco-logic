import { v4 } from 'uuid';
import { FlightRepositoryInterface, PlaneTravel } from '../../../eco/domain';
import { TravelingApi } from './TravelingApi';

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
