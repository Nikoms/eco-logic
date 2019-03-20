import v4 from 'uuid';
import { Carbon } from '../entity/Carbon';
import { CarbonRepository } from '../repository/CarbonRepository';
import { OdometerUpdated } from '@eco/core-travel/src/event/OdometerUpdated';
import { Engine } from '@eco/core-travel/src/entity/Car';

export class AddCarbon {
  public readonly carbon: Carbon;

  constructor(kg: number, description: string) {
    this.carbon = new Carbon(v4(), kg, description, new Date());
  }

  static fromOdometerEvent(event: OdometerUpdated) {
    const multiplier = AddCarbon.getMultiplier(event.car.engine);
    const co2 = Math.round(event.car.consumption * multiplier * event.kmTraveled);
    const description = `${event.kmTraveled} km with the car "${event.car.name}" = ${co2} kg CO2`;
    return new AddCarbon(co2, description);
  }

  private static getMultiplier(engine: Engine) {
    let multiplier = 0;
    switch (engine) {
      case Engine.gasoline:
        multiplier = 0.02807;
        break;
      case Engine.diesel:
        multiplier = 0.03167;
        break;
      case Engine.LPG:
        multiplier = 0.01862;
        break;
    }
    return multiplier;
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
