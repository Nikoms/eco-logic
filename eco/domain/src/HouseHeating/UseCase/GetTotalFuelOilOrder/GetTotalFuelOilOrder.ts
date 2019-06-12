import { HomePresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/Home/HomePresenterInterface';
import { GetTotalFuelOilOrderResponse } from '@eco/domain/src/HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrderResponse';
import { OrderFuelOilRepositoryInterface } from '@eco/domain/src/HouseHeating/OrderFuelOilRepositoryInterface';

export class GetTotalFuelOilOrder {
  constructor(private repository: OrderFuelOilRepositoryInterface) {
  }

  async execute(presenter: HomePresenterInterface) {
    const response = new GetTotalFuelOilOrderResponse();
    response.totalFuelOilOrder = await this.repository.getTotal();
    presenter.presentGetTotalFuelOilOrder(response);
  }
}
