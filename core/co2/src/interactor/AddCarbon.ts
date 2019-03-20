import v4 from 'uuid';
import { Carbon } from '../entity/Carbon';
import { CarbonRepository } from '../repository/CarbonRepository';
import { OdometerUpdated } from '@eco/core-travel/src/event/OdometerUpdated';

export class AddCarbon {
  public readonly carbon: Carbon;

  constructor(kg: number, description: string) {
    this.carbon = new Carbon(v4(), kg, description, new Date());
  }

  static fromOdometerEvent(event: OdometerUpdated) {
    const co2 = Math.round(event.car.consumption * 0.02807 * event.kmTraveled);
    const description = `${event.kmTraveled} km with the car "${event.car.name}" = ${co2} kg CO2`;
    return new AddCarbon(co2, description);
  }
}

export class AddCarbonHandler {
  constructor(private store: CarbonRepository) {
  }

  async handle(request: AddCarbon) {
    await this.store.add(request.carbon);

    return request.carbon;
  }
}
