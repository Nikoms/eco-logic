import {
  addCar,
  addPlaneTravel,
  addPowerConsumption,
  addWaterConsumption,
  getAllPowerConsumptions,
  getAllWaterConsumptions,
  getCarbons,
  getCars,
  getElectricMeters,
  getLastFuelOilOrder,
  getPlaneTravels,
  getTotalFuelOilOrder,
  getWaterMeters,
  initElectricMeter,
  initWaterMeter,
  orderFuelOil,
  updateOdometer,
} from '@eco/infrastructure/src/di';
import { InitElectricMeterRequest } from '@eco/core-electricity/src/use-case/InitElectricMeter';
import { AddPowerConsumptionRequest } from '@eco/core-electricity/src/use-case/AddPowerConsumption';
import { AddCarRequest } from '@eco/core-travel/src/use-case/AddCar';
import { PlaneTravel } from '@eco/core-travel/src/entity/PlaneTravel';
import { AddPlaneTravelRequest } from '@eco/core-travel/src/use-case/AddPlaneTravel';
import { UpdateOdometerRequest } from '@eco/core-travel/src/use-case/UpdateOdometer';
import { AddWaterConsumptionRequest } from '@eco/core-water/src/use-case/AddWaterConsumption';
import { InitWaterMeterRequest } from '@eco/core-water/src/use-case/InitWaterMeter';
import { Car } from '@eco/core-travel/src/entity/Car';
import { ElectricMeter } from '@eco/core-electricity/src/entity/ElectricMeter';
import { PowerConsumption } from '@eco/core-electricity/src/entity/PowerConsumption';
import { Odometer } from '@eco/core-travel/src/entity/Odometer';

export class Api {
  getCars() {
    return getCars.execute();
  }

  addElectricMeter(meter: ElectricMeter) {
    return initElectricMeter.execute(new InitElectricMeterRequest(meter));
  }

  getElectricMeters() {
    return getElectricMeters.execute();
  }

  getAllPowerConsumptions() {
    return getAllPowerConsumptions.execute();
  }

  addPowerConsumption(powerConsumption: PowerConsumption) {
    return addPowerConsumption.execute(new AddPowerConsumptionRequest(powerConsumption.kWh, powerConsumption.electricMeterId));
  }

  addCar(car: Car) {
    return addCar.execute(new AddCarRequest(car.id, car.name, car.consumption, car.engine, car.km, car.lastKmUpdate));
  }

  addPlaneTravel(flight: PlaneTravel) {
    return addPlaneTravel.execute(new AddPlaneTravelRequest(flight.id, flight.seat, flight.km, flight.description, flight.date));
  }

  getPlaneTravels() {
    return getPlaneTravels.execute();
  }

  updateOdometer(odometer: Odometer) {
    return updateOdometer.execute(new UpdateOdometerRequest(odometer.id, odometer.carId, odometer.km, odometer.date));
  }

  addWaterConsumption(meterId: string, consumption: number) {
    return addWaterConsumption.execute(new AddWaterConsumptionRequest(consumption, meterId));
  }

  getWaterMeters() {
    return getWaterMeters.execute();
  }

  initWaterMeter(hasColdAndHotMeter: boolean) {
    return initWaterMeter.execute(new InitWaterMeterRequest(hasColdAndHotMeter));
  }

  getAllWaterConsumptions() {
    return getAllWaterConsumptions.execute();
  }

  orderFuelOil(liters: number) {
    return orderFuelOil.execute(liters);
  }

  getLastFuelOilOrders() {
    return getLastFuelOilOrder.execute();
  }

  getTotalFuelOilOrder() {
    return getTotalFuelOilOrder.execute();
  }

  getCarbons() {
    return getCarbons.execute();
  }
}

export const api = new Api();


