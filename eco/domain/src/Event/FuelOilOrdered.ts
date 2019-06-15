import { Event } from '@eco/core-shared-kernel/src/event/Event';
import { FuelOilOrder } from '@eco/domain/src/Entity/FuelOilOrder';
import { FuelOilEvents } from '@eco/domain/src/Event/FuelOilEvents';

export class FuelOilOrdered implements Event {
  public name = FuelOilEvents.fuelOilOrdered;

  constructor(public readonly fuelOilOrder: FuelOilOrder) {
  }
}
