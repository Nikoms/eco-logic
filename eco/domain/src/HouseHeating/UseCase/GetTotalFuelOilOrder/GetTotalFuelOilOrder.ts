import { FuelOilOrderRepositoryInterface } from '../../FuelOilOrderRepositoryInterface';
import { GetTotalFuelOilOrderPresenterInterface } from './GetTotalFuelOilOrderPresenterInterface';
import { GetTotalFuelOilOrderResponse } from './GetTotalFuelOilOrderResponse';

export class GetTotalFuelOilOrder {
  constructor(private repository: FuelOilOrderRepositoryInterface) {
  }

  async execute(presenter: GetTotalFuelOilOrderPresenterInterface) {
    const response = new GetTotalFuelOilOrderResponse();
    response.totalFuelOilOrder = await this.repository.getTotal();
    presenter.presentGetTotalFuelOilOrder(response);
  }
}
