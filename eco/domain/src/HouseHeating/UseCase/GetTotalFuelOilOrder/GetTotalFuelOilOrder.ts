import { GetTotalFuelOilOrderPresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrderPresenterInterface';
import { GetTotalFuelOilOrderResponse } from '@eco/domain/src/HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrderResponse';
import { FuelOilOrderRepositoryInterface } from '@eco/domain/src/HouseHeating/FuelOilOrderRepositoryInterface';

export class GetTotalFuelOilOrder {
  constructor(private repository: FuelOilOrderRepositoryInterface) {
  }

  async execute(presenter: GetTotalFuelOilOrderPresenterInterface) {
    const response = new GetTotalFuelOilOrderResponse();
    response.totalFuelOilOrder = await this.repository.getTotal();
    presenter.presentGetTotalFuelOilOrder(response);
  }
}
