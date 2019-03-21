import v4 from 'uuid';
import { Carbon } from '../entity/Carbon';
import { CarbonRepository } from '../repository/CarbonRepository';
import { OdometerUpdated } from '@eco/core-travel/src/event/OdometerUpdated';
import { Engine } from '@eco/core-travel/src/entity/Car';
import { PowerUpdated } from '@eco/core-electricity/src/event/PowerUpdated';
import { PlaneTravelAdded } from '@eco/core-travel/src/event/PlaneTravelAdded';
import { Seat } from '@eco/core-travel/src/entity/PlaneTravel';

export class AddCarbon {
  public readonly carbon: Carbon;

  constructor(kg: number, description: string) {
    this.carbon = new Carbon(v4(), kg, description, new Date());
  }

  static fromPowerEvent(event: PowerUpdated) {
    const co2 = Math.round(event.kWhConsumed * 0.226);
    const description = `${event.kWhConsumed} kWh with the counter "${event.electricMeter.name}" = ${co2} kg CO2`;
    return new AddCarbon(co2, description);
  }

  static fromOdometerEvent(event: OdometerUpdated) {
    const multiplier = AddCarbon.getCarEngineMultiplier(event.car.engine);
    const co2 = Math.round(event.car.consumption * multiplier * event.kmTraveled);
    const description = `${event.kmTraveled} km with the car "${event.car.name}" = ${co2} kg CO2`;
    return new AddCarbon(co2, description);
  }

  static fromNewPlaneTravelEvent(event: PlaneTravelAdded) {
    const multiplier = AddCarbon.getPlaneMultiplier(event.travel.seat);
    const co2 = Math.round(event.travel.km * multiplier);
    const description = `${event.travel.km} km by plane = ${co2} kg CO2`;
    return new AddCarbon(co2, description);
  }

  private static getPlaneMultiplier(seat: Seat) {
    let multiplier = 0;
    switch (seat) {
      case Seat.economyClass:
        multiplier = 0.12; // 0,11 à 0,13 kg de CO2 par km par passager en classe économique
        break;
      case Seat.businessClass:
        multiplier = 0.255; // 0,25 à 0,26kg de CO2 par km par passager en classe Business
        break;
      case Seat.firstClass:
        multiplier = 0.39; // 0,39 kg de CO2 par km par passager en Première classe (seulement pour les vols long courrier).
        break;
    }

    // Si on tient compte du forçage radiatif, les émissions sont à peu de choses près multipliées par 2.
    return multiplier * 2;
  }

  private static getCarEngineMultiplier(engine: Engine) {
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
