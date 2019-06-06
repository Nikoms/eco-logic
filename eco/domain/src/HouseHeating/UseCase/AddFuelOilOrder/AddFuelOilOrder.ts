import { AddFuelOilOrderRequest } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderRequest';
import { api as defaultApi, Api } from '@eco/domain/src/Temp/Api';
import { AddFuelOilOrderPresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderPresenterInterface';
import { AddFuelOilOrderResponse } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderResponse';

export class AddFuelOilOrder {
  constructor(private presenter: AddFuelOilOrderPresenterInterface, private api: Api = defaultApi) {

  }

  async execute(request: AddFuelOilOrderRequest) {
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
    response.newFuelOilOrder = await this.api.orderFuelOil(liters);

    this.presenter.presentAddFuelOilOrder(response);
  }
}
