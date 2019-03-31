import { FuelOilOrder } from '../entity/FuelOilOrder';

export interface FuelOilOrderRepository {
  add(fuelOilOrder: FuelOilOrder): Promise<void>;

  getLast(): Promise<FuelOilOrder | undefined>;

  getTotal(): number;
}
