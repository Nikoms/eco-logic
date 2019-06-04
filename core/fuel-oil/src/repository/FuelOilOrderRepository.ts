import { FuelOilOrder } from '../entity/FuelOilOrder';

export interface FuelOilOrderRepository {
  add(fuelOilOrder: FuelOilOrder): Promise<void>;

  getLast(max: number): Promise<FuelOilOrder[]>;

  getTotal(): number;
}
