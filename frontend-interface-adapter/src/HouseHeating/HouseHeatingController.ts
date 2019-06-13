import { AddFuelOilOrder } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrder';
import { AddFuelOilOrderRequest } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderRequest';
import { GetLastFuelOilOrders } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrder/GetLastFuelOilOrder';
import { GetTotalFuelOilOrder } from '@eco/domain/src/HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrder';
import { AddFuelOilOrderPresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderPresenterInterface';
import { HomePresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/Home/HomePresenterInterface';

export class HouseHeatingController {
  constructor(
    private addFuelOilOrderPresenter: AddFuelOilOrderPresenterInterface,
    private homePresenter: HomePresenterInterface,
    private addUseCase: AddFuelOilOrder,
    private getLastFuelOilOrders: GetLastFuelOilOrders,
    private getTotalFuelOilOrder: GetTotalFuelOilOrder) {

  }

  addFuelOilOrder(request: AddFuelOilOrderRequest) {
    return this.addUseCase.execute(request, this.addFuelOilOrderPresenter);
  }

  refreshSummary() {
    this.getLastFuelOilOrders.execute(this.homePresenter);
    this.getTotalFuelOilOrder.execute(this.homePresenter);
  }
}
