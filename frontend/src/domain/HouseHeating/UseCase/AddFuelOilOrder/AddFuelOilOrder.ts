import { AddFuelOilOrderRequest } from '@/domain/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderRequest';
import { api as defaultApi, Api } from '../../../../../../api/frontend/src/Api';
import { AddFuelOilOrderPresenterInterface } from '@/domain/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderPresenterInterface';

export class AddFuelOilOrder {
  constructor(private presenter: AddFuelOilOrderPresenterInterface, private api: Api = defaultApi) {

  }

  async execute(request: AddFuelOilOrderRequest) {
    if (request.liters.length === 0) {
      this.presenter.literIsEmpty();
      return;
    }
    const liters = parseFloat(request.liters);
    if (isNaN(liters)) {
      this.presenter.literIsNotANumber();
      return;
    }
    const fuelOilOrder = await this.api.orderFuelOil(liters);
    this.presenter.fuelOilOrdered(fuelOilOrder);
  }
}
