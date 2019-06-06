import { HomePresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/Home/HomePresenterInterface';
import { FuelOilOrder } from '@eco/core-fuel-oil/src/entity/FuelOilOrder';
import { HomeViewModel } from '@eco/domain/src/HouseHeating/UseCase/Home/HomeViewModel';
import { AddFuelOilOrderPresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderPresenterInterface';
import { AddFuelOilOrderViewModel } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderViewModel';
import { AddFuelOilOrderResponse } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderResponse';
import { GetLastFuelOilOrdersResponse } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrder/GetLastFuelOilOrdersResponse';

export class HouseHeatingPresenter implements HomePresenterInterface, AddFuelOilOrderPresenterInterface {
  private homeViewModel = new HomeViewModel();
  private addFuelOilOrderviewModel = new AddFuelOilOrderViewModel();

  private orders: FuelOilOrder[] = [];

  getAddFuelOilOrderViewModel() {
    return this.addFuelOilOrderviewModel;
  }

  showAddFuelOilOrder() {
    this.addFuelOilOrderviewModel.displayed = true;
  }

  presentAddFuelOilOrder(response: AddFuelOilOrderResponse): void {
    if (response.isLiterEmpty) {
      console.error('isLiterEmpty');
    }
    if (response.isLiterInvalid) {
      console.error('isLiterInvalid');
    }

    if (response.newFuelOilOrder !== undefined) {
      this.orders.unshift(response.newFuelOilOrder);
      this.orders = this.orders.slice(0, 5);
      this.homeViewModel.totalFuelOilOrder += response.newFuelOilOrder.liters;
      this.updateViewModelLastOrders();
      this.addFuelOilOrderviewModel.displayed = false;
    }

  }

  addFuelOilOrderCancelled() {
    this.addFuelOilOrderviewModel.displayed = false;
  }

  presentGetLastFuelOilOrders(response: GetLastFuelOilOrdersResponse): void {
    this.orders = response.lastFuelOilOrders;
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
