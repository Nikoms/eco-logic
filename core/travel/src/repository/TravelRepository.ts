import { PlaneTravel } from '../entity/PlaneTravel';

export interface TravelRepository {
  add(travel: PlaneTravel): Promise<void>;

  getAll(): Promise<PlaneTravel[]>;
}
