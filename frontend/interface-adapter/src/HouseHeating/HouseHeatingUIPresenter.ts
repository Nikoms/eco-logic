import { GetTotalFuelOilOrderPresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrderPresenterInterface';
import { AddFuelOilOrderPresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderPresenterInterface';
import { AddFuelOilOrderResponse } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderResponse';
import { GetLastFuelOilOrdersResponse } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrdersResponse';
import { GetTotalFuelOilOrderResponse } from '@eco/domain/src/HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrderResponse';
import { FuelOilOrder } from '@eco/domain/src/HouseHeating/Entity/FuelOilOrder';
import { GetLastFuelOilOrdersPresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrdersPresenterInterface';
import { ElectricUI } from '@eco/frontend-interface-adapter/src/HouseHeating/ElectricUI';
import { FuelOilOrderViewModel, ViewModel } from '@eco/frontend-interface-adapter/src/HouseHeating/ViewModel';

export class HouseHeatingUIPresenter implements ElectricUI,
  GetTotalFuelOilOrderPresenterInterface,
  GetLastFuelOilOrdersPresenterInterface,
  AddFuelOilOrderPresenterInterface {

  private _viewModel = new ViewModel();
  private orders: FuelOilOrder[] = [];
  private totalOrder = 0;

  get viewModel() {
    return this._viewModel;
  }

  showAddFuelOilOrder() {
    this._viewModel.formDisplayed = true;
  }

  hideAddFuelOilOrder() {
    this._viewModel.formDisplayed = false;
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
      this.updateViewModelLastOrders();
      this.totalOrder += response.newFuelOilOrder.liters;
      this.updateViewTotal();
      this._viewModel.formDisplayed = false;
    }
  }

  presentGetLastFuelOilOrders(response: GetLastFuelOilOrdersResponse): void {
    this.orders = response.lastFuelOilOrders;
    this.updateViewModelLastOrders();
  }

  presentGetTotalFuelOilOrder(response: GetTotalFuelOilOrderResponse): void {
    this.totalOrder = response.totalFuelOilOrder;
    this.updateViewTotal();
  }

  private updateViewTotal() {
    this._viewModel.totalFuelOilOrder = this.totalOrder + ' liters';
  }

  private updateViewModelLastOrders() {
    this._viewModel.lastOrders = this.orders.map((order) => {
        return new FuelOilOrderViewModel(
          order.liters + ' liters',
          order.date.toLocaleDateString('fr'),
        );
      },
    );
  }
}
