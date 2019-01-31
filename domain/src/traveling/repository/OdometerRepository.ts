import { Odometer } from '../entity/Odometer';

export interface OdometerRepository {
  add(odometer: Odometer): Promise<void>;

  getLast(carId: string): Promise<Odometer | undefined>
}
