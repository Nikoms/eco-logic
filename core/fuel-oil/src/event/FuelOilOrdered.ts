import { Event } from '@eco/core-shared-kernel/src/event/Event';
import { FuelOilOrder } from '../entity/FuelOilOrder';
import { FuelOilEvents } from './FuelOilEvents';

export class FuelOilOrdered implements Event {
  public name = FuelOilEvents.fuelOilOrdered;

  constructor(public readonly fuelOilOrder: FuelOilOrder) {
  }
}
