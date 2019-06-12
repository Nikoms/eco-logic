import { FuelOilOrder } from '@eco/core-fuel-oil/src/entity/FuelOilOrder';

export interface OrderFuelOilRepositoryInterface {
  add(order: FuelOilOrder): Promise<void>;

  getLast(): Promise<FuelOilOrder[]>;

  getTotal(): Promise<number>;
}
