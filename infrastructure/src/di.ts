import { EventTargetEventDispatcher } from './event/EventDispatcher';
import { WaterConsumptionLocalStorageRepository } from './local-storage/WaterConsumptionLocalStorageRepository';
import { WaterMeterLocalStorageRepository } from './local-storage/WaterMeterLocalStorageRepository';
import { CarbonLocalStorageRepository } from './local-storage/CarbonLocalStorageRepository';
import { AddWaterConsumption } from '@eco/core-water/src/use-case/AddWaterConsumption';
import { GetWaterMeters } from '@eco/core-water/src/use-case/GetWaterMeters';
import { GetAllWaterConsumptions } from '@eco/core-water/src/use-case/GetAllWaterConsumptions';
import { InitWaterMeter } from '@eco/core-water/src/use-case/InitWaterMeter';
import { AddCarbon } from '@eco/core-co2/src/use-case/AddCarbon';
import { GetCarbons } from '@eco/core-co2/src/use-case/GetCarbons';
import { SaveElectricMeter } from '@eco/domain/src/Electricity/UseCase/SaveElectricMeter/SaveElectricMeter';
import { ElectricMeterLocalStorageRepository2 } from '@eco/infrastructure/src/local-storage/ElectricMeterLocalStorageRepository2';
import { GetElectricMeters } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMeters';
import { UpdatePowerConsumption } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumption';
import { GetElectricMeter } from '@eco/domain/src/Electricity/UseCase/GetElectricMeter/GetElectricMeter';
import { GetLastFuelOilOrders } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrder';
import { FuelOilOrderLocalStorageRepository2 } from '@eco/infrastructure/src/local-storage/FuelOilOrderLocalStorageRepository2';
import { GetTotalFuelOilOrder } from '@eco/domain/src/HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrder';
import { AddFuelOilOrder } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrder';
import { AddCar } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCar';
import { CarLocalStorageRepository2 } from '@eco/infrastructure/src/local-storage/CarLocalStorageRepository2';
import { GetCars } from '@eco/domain/src/Traveling/UseCase/GetCars/GetCars';
import { AddFlight } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlight';
import { FlightLocalStorageRepository } from '@eco/infrastructure/src/local-storage/FlightLocalStorageRepository';
import { GetFlights } from '@eco/domain/src/Traveling/UseCase/GetFlights/GetFlights';
import { UpdateOdometer } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometer';

export const eventDispatcher = new EventTargetEventDispatcher();

const waterConsumptionStore = new WaterConsumptionLocalStorageRepository(window.localStorage);
const electricStore2 = new ElectricMeterLocalStorageRepository2(window.localStorage);
const waterStore = new WaterMeterLocalStorageRepository(window.localStorage);
const carStore2 = new CarLocalStorageRepository2(window.localStorage);
const carbonStore = new CarbonLocalStorageRepository(window.localStorage);
const fuelOilStore2 = new FuelOilOrderLocalStorageRepository2(window.localStorage);
const flightStore = new FlightLocalStorageRepository(window.localStorage);

export const updatePowerConsumption = new UpdatePowerConsumption(electricStore2, eventDispatcher);
export const saveElectricMeter = new SaveElectricMeter(electricStore2);
export const getElectricMeters = new GetElectricMeters(electricStore2);
export const getElectricMeter = new GetElectricMeter(electricStore2);

export const addCar = new AddCar(carStore2);
export const getCars = new GetCars(carStore2);
export const addFlight = new AddFlight(flightStore, eventDispatcher);
export const getFlights = new GetFlights(flightStore);
export const updateOdometer = new UpdateOdometer(carStore2, eventDispatcher);

export const addWaterConsumption = new AddWaterConsumption(waterConsumptionStore);
export const getAllWaterConsumptions = new GetAllWaterConsumptions(waterConsumptionStore);
export const initWaterMeter = new InitWaterMeter(waterStore);
export const getWaterMeters = new GetWaterMeters(waterStore);

export const addFuelOilOrder = new AddFuelOilOrder(fuelOilStore2, eventDispatcher);
export const getLastFuelOilOrder = new GetLastFuelOilOrders(fuelOilStore2);
export const getTotalFuelOilOrder = new GetTotalFuelOilOrder(fuelOilStore2);

export const addCarbon = new AddCarbon(carbonStore);
export const getCarbons = new GetCarbons(carbonStore);
