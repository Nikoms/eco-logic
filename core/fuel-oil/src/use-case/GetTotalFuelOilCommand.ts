import { FuelOilCommandRepository } from '../repository/FuelOilCommandRepository';

export class GetTotalFuelOilCommand {
  constructor(private fuelOilCommands: FuelOilCommandRepository) {
  }

  execute() {
    return this.fuelOilCommands.getTotal();
  }
}
