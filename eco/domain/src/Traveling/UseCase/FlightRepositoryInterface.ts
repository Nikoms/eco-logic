import { PlaneTravel } from '@eco/core-travel/src/entity/PlaneTravel';

export interface FlightRepositoryInterface {
  nextIdentity(): Promise<string>;

  add(flight: PlaneTravel): Promise<void>;

  getAll(): Promise<PlaneTravel[]>;
}
