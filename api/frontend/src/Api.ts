import {
  addCar,
  addPlaneTravel,
  addPowerConsumption,
  addWaterConsumption,
  commandFuelOil,
  getAllPowerConsumptions,
  getAllWaterConsumptions,
  getCars,
  getElectricMeters,
  getLastFuelOilCommand,
  getPlaneTravels,
  getWaterMeters,
  initElectricMeter,
  initWaterMeter,
  updateOdometer,
} from '@eco/infrastructure/src/di';
import { InitElectricMeterRequest } from '@eco/core-electricity/src/use-case/InitElectricMeter';
import { AddPowerConsumptionRequest } from '@eco/core-electricity/src/use-case/AddPowerConsumption';
import { AddCarRequest } from '@eco/core-travel/src/use-case/AddCar';
import { Engine } from '@eco/core-travel/src/entity/Car';
import { Seat } from '@eco/core-travel/src/entity/PlaneTravel';
import { AddPlaneTravelRequest } from '@eco/core-travel/src/use-case/AddPlaneTravel';
import { UpdateOdometerRequest } from '@eco/core-travel/src/use-case/UpdateOdometer';
import { AddWaterConsumptionRequest } from '@eco/core-water/src/use-case/AddWaterConsumption';
import { InitWaterMeterRequest } from '@eco/core-water/src/use-case/InitWaterMeter';

class Api {
  getCars() {
    return getCars.execute();
  }

  initElectricMeter(hasDayAndNightMeter: boolean) {
    return initElectricMeter.execute(new InitElectricMeterRequest(hasDayAndNightMeter));
  }

  getElectricMeters() {
    return getElectricMeters.execute();
  }

  getAllPowerConsumptions() {
    return getAllPowerConsumptions.execute();
  }

  addPowerConsumption(kWh: number, electricMeterId: string) {
    return addPowerConsumption.execute(new AddPowerConsumptionRequest(kWh, electricMeterId));
  }

  addCar(carName: string, consumption: number, engine: Engine, km: number) {
    return addCar.execute(new AddCarRequest(carName, consumption, engine, km));
  }

  addPlaneTravel(seatId: Seat, km: number, description: string) {
    return addPlaneTravel.execute(new AddPlaneTravelRequest(seatId, km, description));
  }

  getPlaneTravels() {
    return getPlaneTravels.execute();
  }

  updateOdometer(carId: string, km: number) {
    return updateOdometer.execute(new UpdateOdometerRequest(carId, km));
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

  commandFuelOil(liters: number) {
    return commandFuelOil.execute(liters);
  }

  getLastFuelOilCommand() {
    return getLastFuelOilCommand.execute();
  }
}

export const api = new Api();


