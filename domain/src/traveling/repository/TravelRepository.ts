import { Travel } from '../entity/Travel';

export interface TravelRepository {
  add(travel: Travel): Promise<void>;

  getAll(): Promise<Travel[]>
}
