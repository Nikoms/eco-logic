import { Event } from '@eco/core-shared-kernel/src/event/Event';
import { FuelOilCommand } from '../entity/FuelOilCommand';
import { FuelOilEvents } from './FuelOilEvents';

export class FuelOilWasCommand implements Event {
  public name = FuelOilEvents.fuelOilWasCommand;

  constructor(public readonly fuelOilCommand: FuelOilCommand) {
  }
}
