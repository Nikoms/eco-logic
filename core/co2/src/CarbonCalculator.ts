import { PowerUpdated } from '@eco/domain/src/Electricity/Event/PowerUpdated';
import { OdometerUpdated } from '@eco/domain/src/Traveling/Event/OdometerUpdated';
import { PlaneTravelAdded } from '@eco/domain/src/Traveling/Event/PlaneTravelAdded';
import { AddCarbonRequest } from './use-case/AddCarbon';
import { Seat } from '@eco/domain/src/Traveling/Entity/PlaneTravel';
import { Engine } from '@eco/domain/src/Traveling/Entity/Car';
import { FuelOilOrdered } from '@eco/domain/src/Event/FuelOilOrdered';

export class CarbonCalculator {

  fromPowerEvent(event: PowerUpdated) {
    const co2 = Math.round(event.kWhConsumed * 0.226);
    const description = `${event.kWhConsumed} kWh with the counter "${event.electricMeter.name}" = ${co2} kg CO2`;
    return new AddCarbonRequest(co2, description);
  }

  fromFuelOil(event: FuelOilOrdered) {
    const liters = event.fuelOilOrder.liters;
    const co2 = Math.round(liters * 3.19);
    const description = `${liters} liters command = ${co2} kg CO2`;
    return new AddCarbonRequest(co2, description);
  }

  fromOdometerEvent(event: OdometerUpdated) {
    const multiplier = this.getCarEngineMultiplier(event.car.engine);
    const co2 = Math.round(event.car.consumption * multiplier * event.kmTraveled);
    const description = `${event.kmTraveled} km with the car "${event.car.name}" = ${co2} kg CO2`;
    return new AddCarbonRequest(co2, description);
  }

  fromNewPlaneTravelEvent(event: PlaneTravelAdded) {
    const multiplier = this.getPlaneMultiplier(event.travel.seat);
    const co2 = Math.round(event.travel.km * multiplier);
    const description = `${event.travel.km} km by plane = ${co2} kg CO2`;
    return new AddCarbonRequest(co2, description);
  }

  private getPlaneMultiplier(seat: Seat) {
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

  private getCarEngineMultiplier(engine: Engine) {
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
