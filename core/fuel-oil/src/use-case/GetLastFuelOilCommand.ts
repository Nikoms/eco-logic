import { FuelOilCommandRepository } from '../repository/FuelOilCommandRepository';

export class GetLastFuelOilCommand {
  constructor(private fuelOilCommands: FuelOilCommandRepository) {
  }

  execute() {
    return this.fuelOilCommands.getLast();
  }
}
