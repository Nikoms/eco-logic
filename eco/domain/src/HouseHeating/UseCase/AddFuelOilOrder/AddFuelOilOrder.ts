import { FuelOilOrderRepositoryInterface } from '../../FuelOilOrderRepositoryInterface';
import { EventDispatcher } from '@eco/shared-kernel';
import { AddFuelOilOrderPresenterInterface } from './AddFuelOilOrderPresenterInterface';
import { AddFuelOilOrderRequest } from './AddFuelOilOrderRequest';
import { AddFuelOilOrderResponse } from './AddFuelOilOrderResponse';
import { FuelOilOrder } from '../../Entity/FuelOilOrder';
import { FuelOilOrdered } from '../../Event/FuelOilOrdered';

export class AddFuelOilOrder {
  constructor(private repository: FuelOilOrderRepositoryInterface, private eventDispatcher: EventDispatcher) {
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

    this.eventDispatcher.emit(new FuelOilOrdered(fuelOilOrder));

    presenter.presentAddFuelOilOrder(response);
  }
}
