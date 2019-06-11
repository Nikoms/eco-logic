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
import { Seat } from '@eco/core-travel/src/entity/PlaneTravel';
import { AddPlaneTravelRequest } from '@eco/core-travel/src/use-case/AddPlaneTravel';
import { UpdateOdometerRequest } from '@eco/core-travel/src/use-case/UpdateOdometer';
import { AddWaterConsumptionRequest } from '@eco/core-water/src/use-case/AddWaterConsumption';
import { InitWaterMeterRequest } from '@eco/core-water/src/use-case/InitWaterMeter';
import { Engine } from '@eco/core-travel/src/entity/Car';
import { ElectricMeter } from '@eco/core-electricity/src/entity/ElectricMeter';
import { PowerConsumption } from '@eco/core-electricity/src/entity/PowerConsumption';

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

  addCar(carName: string, consumption: number, engine: string | Engine, km: number) {
    return addCar.execute(new AddCarRequest(carName, consumption, engine, km));
  }

  addPlaneTravel(seatId: Seat | string, km: number, description: string) {
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


