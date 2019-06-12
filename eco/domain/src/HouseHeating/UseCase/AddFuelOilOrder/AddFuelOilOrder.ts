import { AddFuelOilOrderRequest } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderRequest';
import { AddFuelOilOrderPresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderPresenterInterface';
import { AddFuelOilOrderResponse } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderResponse';
import { OrderFuelOilRepositoryInterface } from '@eco/domain/src/HouseHeating/OrderFuelOilRepositoryInterface';
import { FuelOilOrder } from '@eco/core-fuel-oil/src/entity/FuelOilOrder';

export class AddFuelOilOrder {
  constructor(private repository: OrderFuelOilRepositoryInterface) {

  }

  async execute(request: AddFuelOilOrderRequest, presenter: AddFuelOilOrderPresenterInterface) {
    const response = new AddFuelOilOrderResponse();

    if (request.liters.length === 0) {
      response.isLiterEmpty = true;
      return;
    }
    const liters = parseFloat(request.liters);
    if (isNaN(liters)) {
      response.isLiterInvalid = true;
      return;
    }
    const fuelOilOrder = new FuelOilOrder(parseFloat(request.liters), new Date());
    await this.repository.add(fuelOilOrder);
    response.newFuelOilOrder = fuelOilOrder;

    presenter.presentAddFuelOilOrder(response);
  }
}
