import { FuelOilOrder } from '@eco/fuel-oil/src/entity/FuelOilOrder';
import { HomeViewModel } from '@/domain/HouseHeating/UseCase/Home/HomeViewModel';

export interface HomePresenterInterface {
  getHomeViewModel(): HomeViewModel;

  setLastFuelOilOrders(fuelOilOrders: FuelOilOrder[]): void;

  setTotalFuelOilOrder(liter: number): void;

  showAddFuelOilOrder(): void;
}
