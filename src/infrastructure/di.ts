import { EventTargetEventDispatcher } from './event/EventDispatcher';
import { CarbonLocalStorageRepository } from './local-storage/CarbonLocalStorageRepository';
import { WaterConsumptionLocalStorageRepository } from './local-storage/WaterConsumptionLocalStorageRepository';
import { ElectricMeterLocalStorageRepository } from './local-storage/ElectricMeterLocalStorageRepository';
import { WaterMeterLocalStorageRepository } from './local-storage/WaterMeterLocalStorageRepository';
import { CarLocalStorageRepository } from './local-storage/CarLocalStorageRepository';
import { FuelOilOrderLocalStorageRepository } from './local-storage/FuelOilOrderLocalStorageRepository';
import { FlightLocalStorageRepository } from './local-storage/FlightLocalStorageRepository';
import {
  AddCar,
  AddCarbon,
  AddConsumption,
  AddFlight,
  AddFuelOilOrder,
  AddWaterMeter,
  GetCar,
  GetCarbons,
  GetCars,
  GetConsumptions,
  GetElectricMeter,
  GetElectricMeters,
  GetFlights,
  GetLastFuelOilOrders,
  GetTotalFuelOilOrder,
  GetWaterMeters,
  SaveElectricMeter,
  UpdateCar,
  UpdateOdometer,
  UpdatePowerConsumption,
} from '@eco/domain';

export const eventDispatcher = new EventTargetEventDispatcher();

const waterConsumptionStore = new WaterConsumptionLocalStorageRepository(window.localStorage);
const electricStore = new ElectricMeterLocalStorageRepository(window.localStorage);
const waterStore = new WaterMeterLocalStorageRepository(window.localStorage);
const carStore = new CarLocalStorageRepository(window.localStorage);
const carbonStore = new CarbonLocalStorageRepository(window.localStorage);
const fuelOilStore = new FuelOilOrderLocalStorageRepository(window.localStorage);
const flightStore = new FlightLocalStorageRepository(window.localStorage);

export const updatePowerConsumption = new UpdatePowerConsumption(electricStore, eventDispatcher);
export const saveElectricMeter = new SaveElectricMeter(electricStore);
export const getElectricMeters = new GetElectricMeters(electricStore);
export const getElectricMeter = new GetElectricMeter(electricStore);

export const addCar = new AddCar(carStore);
export const updateCar = new UpdateCar(carStore);
export const getCars = new GetCars(carStore);
export const getCar = new GetCar(carStore);
export const addFlight = new AddFlight(flightStore, eventDispatcher);
export const getFlights = new GetFlights(flightStore);
export const updateOdometer = new UpdateOdometer(carStore, eventDispatcher);

export const addWaterConsumption = new AddConsumption(waterConsumptionStore);
export const getAllWaterConsumptions = new GetConsumptions(waterConsumptionStore);
export const addWaterMeter = new AddWaterMeter(waterStore);
export const getWaterMeters = new GetWaterMeters(waterStore);

export const addFuelOilOrder = new AddFuelOilOrder(fuelOilStore, eventDispatcher);
export const getLastFuelOilOrder = new GetLastFuelOilOrders(fuelOilStore);
export const getTotalFuelOilOrder = new GetTotalFuelOilOrder(fuelOilStore);

export const addCarbon = new AddCarbon(carbonStore);
export const getCarbons = new GetCarbons(carbonStore);
