import { FuelOilOrder } from '@eco/domain/src/Entity/FuelOilOrder';

export interface FuelOilOrderRepositoryInterface {
  add(order: FuelOilOrder): Promise<void>;

  getLast(max: number): Promise<FuelOilOrder[]>;

  getTotal(): Promise<number>;
}
