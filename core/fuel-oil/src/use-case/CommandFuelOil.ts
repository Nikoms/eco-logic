import { EventDispatcher } from '@eco/core-shared-kernel/src/event/EventDispatcher';
import { FuelOilWasCommand } from '../event/FuelOilWasCommand';
import { FuelOilCommand } from '../entity/FuelOilCommand';
import { FuelOilCommandRepository } from '../repository/FuelOilCommandRepository';

export class CommandFuelOil {
  constructor(private fuelOilCommands: FuelOilCommandRepository, private eventDispatcher: EventDispatcher) {
  }

  execute(liters: number) {
    const fuelOilCommand = new FuelOilCommand(liters, new Date());
    this.fuelOilCommands.add(fuelOilCommand);
    this.eventDispatcher.emit(new FuelOilWasCommand(fuelOilCommand));
  }
}
