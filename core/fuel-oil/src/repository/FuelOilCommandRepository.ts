import { FuelOilCommand } from '../entity/FuelOilCommand';

export interface FuelOilCommandRepository {
  add(fuelOilCommand: FuelOilCommand): Promise<void>;

  getLast(): Promise<FuelOilCommand | undefined>;
}
