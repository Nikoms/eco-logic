import { ElectricUI } from './ElectricUI';
import {
  AddFuelOilOrderPresenterInterface,
  AddFuelOilOrderResponse,
  FuelOilOrder,
  GetLastFuelOilOrdersPresenterInterface,
  GetLastFuelOilOrdersResponse,
  GetTotalFuelOilOrderPresenterInterface,
  GetTotalFuelOilOrderResponse,
} from '../../../eco/domain';
import { FuelOilOrderViewModel, ViewModel } from './ViewModel';

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
