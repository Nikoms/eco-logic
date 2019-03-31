import { EventDispatcher } from '@eco/core-shared-kernel/src/event/EventDispatcher';
import { FuelOilOrdered } from '../event/FuelOilOrdered';
import { FuelOilOrder } from '../entity/FuelOilOrder';
import { FuelOilOrderRepository } from '../repository/FuelOilOrderRepository';

export class OrderFuelOil {
  constructor(private fuelOilOrders: FuelOilOrderRepository, private eventDispatcher: EventDispatcher) {
  }

  execute(liters: number) {
    const fuelOilOrder = new FuelOilOrder(liters, new Date());
    this.fuelOilOrders.add(fuelOilOrder);
    this.eventDispatcher.emit(new FuelOilOrdered(fuelOilOrder));
  }
}
