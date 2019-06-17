import { AddFuelOilOrderRequest } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderRequest';
import { AddFuelOilOrderPresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderPresenterInterface';
import { AddFuelOilOrderResponse } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderResponse';
import { FuelOilOrderRepositoryInterface } from '@eco/domain/src/HouseHeating/FuelOilOrderRepositoryInterface';
import { FuelOilOrder } from '@eco/domain/src/Entity/FuelOilOrder';
import { FuelOilOrdered } from '@eco/domain/src/Event/FuelOilOrdered';
import { EventDispatcher } from '@eco/shared-kernel/src/event/EventDispatcher';

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
