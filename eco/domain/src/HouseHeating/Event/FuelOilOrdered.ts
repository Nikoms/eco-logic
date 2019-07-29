import { EcoEvent } from '@eco/shared-kernel';
import { FuelOilEvents } from './FuelOilEvents';
import { FuelOilOrder } from '../Entity/FuelOilOrder';

export class FuelOilOrdered implements EcoEvent {
  public name = FuelOilEvents.fuelOilOrdered;

  constructor(public readonly fuelOilOrder: FuelOilOrder) {
  }
}
