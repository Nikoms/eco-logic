import { FuelOilEvents } from './FuelOilEvents';
import { FuelOilOrder } from '../Entity/FuelOilOrder';
import { EcoEvent } from '../../../shared-kernel';

export class FuelOilOrdered implements EcoEvent {
  public name = FuelOilEvents.fuelOilOrdered;

  constructor(public readonly fuelOilOrder: FuelOilOrder) {
  }
}
