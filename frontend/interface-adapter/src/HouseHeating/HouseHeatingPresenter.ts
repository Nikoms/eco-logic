import { GetTotalFuelOilOrderPresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrderPresenterInterface';
import { AddFuelOilOrderPresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderPresenterInterface';
import { AddFuelOilOrderViewModel } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderViewModel';
import { AddFuelOilOrderResponse } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderResponse';
import { GetLastFuelOilOrdersResponse } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrdersResponse';
import { GetTotalFuelOilOrderResponse } from '@eco/domain/src/HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrderResponse';
import { FuelOilOrder } from '@eco/domain/src/HouseHeating/Entity/FuelOilOrder';
import { GetLastFuelOilOrdersPresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrdersPresenterInterface';
import { GetLastFuelOilOrdersViewModel } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrdersViewModel';
import { GetTotalFuelOilOrderViewModel } from '@eco/domain/src/HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrderViewModel';
import { ElectricUI } from '@eco/frontend-interface-adapter/src/HouseHeating/ElectricUI';

export class HouseHeatingPresenter implements GetTotalFuelOilOrderPresenterInterface,
  GetLastFuelOilOrdersPresenterInterface,
  ElectricUI,
  AddFuelOilOrderPresenterInterface {
  private getTotalFuelOilOrderViewModel = new GetTotalFuelOilOrderViewModel();
  private getLastFuelOilOrdersViewModel = new GetLastFuelOilOrdersViewModel();
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
      this.getTotalFuelOilOrderViewModel.totalFuelOilOrder += response.newFuelOilOrder.liters;
      this.updateViewModelLastOrders();
      this.addFuelOilOrderviewModel.displayed = false;
    }

  }

  hideAddFuelOilOrder() {
    this.addFuelOilOrderviewModel.displayed = false;
  }

  presentGetLastFuelOilOrders(response: GetLastFuelOilOrdersResponse): void {
    this.orders = response.lastFuelOilOrders;
    this.updateViewModelLastOrders();
  }

  presentGetTotalFuelOilOrder(response: GetTotalFuelOilOrderResponse): void {
    this.getTotalFuelOilOrderViewModel.totalFuelOilOrder = response.totalFuelOilOrder;
  }

  getGetLastFuelOilOrdersViewModel(): GetLastFuelOilOrdersViewModel {
    return this.getLastFuelOilOrdersViewModel;
  }

  getGetTotalFuelOilOrderViewModel(): GetTotalFuelOilOrderViewModel {
    return this.getTotalFuelOilOrderViewModel;
  }

  private updateViewModelLastOrders() {
    this.getLastFuelOilOrdersViewModel.lastOrders = this.orders.slice();
  }

}
