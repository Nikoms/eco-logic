import { Event } from '@eco/shared-kernel/src/event/Event';
import { FuelOilOrder } from '@eco/domain/src/HouseHeating/Entity/FuelOilOrder';
import { FuelOilEvents } from '@eco/domain/src/HouseHeating/Event/FuelOilEvents';

export class FuelOilOrdered implements Event {
  public name = FuelOilEvents.fuelOilOrdered;

  constructor(public readonly fuelOilOrder: FuelOilOrder) {
  }
}
