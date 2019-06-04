import { HomePresenterInterface } from '@/domain/HouseHeating/UseCase/Home/HomePresenterInterface';
import { FuelOilOrder } from '@eco/fuel-oil/src/entity/FuelOilOrder';
import { HomeViewModel } from '@/domain/HouseHeating/UseCase/Home/HomeViewModel';
import { AddFuelOilOrderPresenterInterface } from '@/domain/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderPresenterInterface';
import { AddFuelOilOrderViewModel } from '@/domain/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderViewModel';

export class HouseHeatingPresenter implements HomePresenterInterface, AddFuelOilOrderPresenterInterface {
  private homeViewModel = new HomeViewModel();
  private addFuelOilOrderviewModel = new AddFuelOilOrderViewModel();

  private orders: FuelOilOrder[] = [];

  getAddFuelOilOrderViewModel() {
    return this.addFuelOilOrderviewModel;
  }

  literIsNotANumber() {
    console.error('literIsNotANumber');
  }

  literIsEmpty() {
    console.error('literIsEmpty');
  }

  showAddFuelOilOrder() {
    this.addFuelOilOrderviewModel.displayed = true;
  }

  fuelOilOrdered(fuelOilOrder: FuelOilOrder) {
    this.orders.unshift(fuelOilOrder);
    this.orders = this.orders.slice(0, 5);
    this.updateViewModelLastOrders();
    this.homeViewModel.totalFuelOilOrder += fuelOilOrder.liters;
    this.addFuelOilOrderviewModel.displayed = false;
  }

  addFuelOilOrderCancelled() {
    this.addFuelOilOrderviewModel.displayed = false;
  }

  setLastFuelOilOrders(fuelOilOrders: FuelOilOrder[]): void {
    this.orders = fuelOilOrders;
    this.updateViewModelLastOrders();
  }

  getHomeViewModel(): HomeViewModel {
    return this.homeViewModel;
  }

  setTotalFuelOilOrder(liter: number): void {
    this.homeViewModel.totalFuelOilOrder = liter;
  }

  private updateViewModelLastOrders() {
    this.homeViewModel.orders = this.orders.slice();
  }

}
