import {
  AddFuelOilOrder,
  AddFuelOilOrderPresenterInterface,
  AddFuelOilOrderRequest,
  GetLastFuelOilOrders,
  GetLastFuelOilOrdersPresenterInterface,
  GetLastFuelOilOrdersRequest,
  GetTotalFuelOilOrder,
  GetTotalFuelOilOrderPresenterInterface,
} from '@eco/domain';

export class HouseHeatingController {
  constructor(
    private addFuelOilOrderPresenter: AddFuelOilOrderPresenterInterface,
    private lastFuelOilOrdersPresenter: GetLastFuelOilOrdersPresenterInterface,
    private getTotalFuelOilOrderPresenter: GetTotalFuelOilOrderPresenterInterface,
    private addUseCase: AddFuelOilOrder,
    private getLastFuelOilOrders: GetLastFuelOilOrders,
    private getTotalFuelOilOrder: GetTotalFuelOilOrder) {

  }

  addFuelOilOrder(quantity: string) {
    const request = new AddFuelOilOrderRequest(quantity);
    return this.addUseCase.execute(request, this.addFuelOilOrderPresenter);
  }

  refreshSummary() {
    this.getLastFuelOilOrders.execute(new GetLastFuelOilOrdersRequest(5), this.lastFuelOilOrdersPresenter);
    this.getTotalFuelOilOrder.execute(this.getTotalFuelOilOrderPresenter);
  }
}
