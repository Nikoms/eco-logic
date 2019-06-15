import { AddFuelOilOrder } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrder';
import { AddFuelOilOrderRequest } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderRequest';
import { GetLastFuelOilOrders } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrder';
import { GetTotalFuelOilOrder } from '@eco/domain/src/HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrder';
import { AddFuelOilOrderPresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderPresenterInterface';
import { GetTotalFuelOilOrderPresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrderPresenterInterface';
import { GetLastFuelOilOrdersRequest } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrdersRequest';
import { GetLastFuelOilOrdersPresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrdersPresenterInterface';

export class HouseHeatingController {
  constructor(
    private addFuelOilOrderPresenter: AddFuelOilOrderPresenterInterface,
    private lastFuelOilOrdersPresenter: GetLastFuelOilOrdersPresenterInterface,
    private getTotalFuelOilOrderPresenter: GetTotalFuelOilOrderPresenterInterface,
    private addUseCase: AddFuelOilOrder,
    private getLastFuelOilOrders: GetLastFuelOilOrders,
    private getTotalFuelOilOrder: GetTotalFuelOilOrder) {

  }

  addFuelOilOrder(request: AddFuelOilOrderRequest) {
    return this.addUseCase.execute(request, this.addFuelOilOrderPresenter);
  }

  refreshSummary() {
    this.getLastFuelOilOrders.execute(new GetLastFuelOilOrdersRequest(5), this.lastFuelOilOrdersPresenter);
    this.getTotalFuelOilOrder.execute(this.getTotalFuelOilOrderPresenter);
  }
}
