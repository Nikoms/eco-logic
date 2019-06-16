import { PlaneTravel } from '@eco/domain/src/Traveling/Entity/PlaneTravel';

export interface FlightRepositoryInterface {
  nextIdentity(): Promise<string>;

  add(flight: PlaneTravel): Promise<void>;

  getAll(): Promise<PlaneTravel[]>;
}
