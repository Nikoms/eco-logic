import { EventTargetEventDispatcher } from './event/EventDispatcher';
import { CarbonLocalStorageRepository } from './local-storage/CarbonLocalStorageRepository';
import { SaveElectricMeter } from '@eco/domain/src/Electricity/UseCase/SaveElectricMeter/SaveElectricMeter';
import { ElectricMeterLocalStorageRepository } from '@eco/infrastructure/src/local-storage/ElectricMeterLocalStorageRepository';
import { GetElectricMeters } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMeters';
import { UpdatePowerConsumption } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumption';
import { GetElectricMeter } from '@eco/domain/src/Electricity/UseCase/GetElectricMeter/GetElectricMeter';
import { GetLastFuelOilOrders } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrder';
import { FuelOilOrderLocalStorageRepository } from '@eco/infrastructure/src/local-storage/FuelOilOrderLocalStorageRepository';
import { GetTotalFuelOilOrder } from '@eco/domain/src/HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrder';
import { AddFuelOilOrder } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrder';
import { AddCar } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCar';
import { CarLocalStorageRepository } from '@eco/infrastructure/src/local-storage/CarLocalStorageRepository';
import { GetCars } from '@eco/domain/src/Traveling/UseCase/GetCars/GetCars';
import { AddFlight } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlight';
import { FlightLocalStorageRepository } from '@eco/infrastructure/src/local-storage/FlightLocalStorageRepository';
import { GetFlights } from '@eco/domain/src/Traveling/UseCase/GetFlights/GetFlights';
import { UpdateOdometer } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometer';
import { AddConsumption } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumption';
import { WaterConsumptionLocalStorageRepository } from '@eco/infrastructure/src/local-storage/WaterConsumptionLocalStorageRepository';
import { GetConsumptions } from '@eco/domain/src/Water/UseCase/GetConsumptions/GetConsumptions';
import { AddWaterMeter } from '@eco/domain/src/Water/UseCase/AddWaterMeter/AddWaterMeter';
import { WaterMeterLocalStorageRepository } from '@eco/infrastructure/src/local-storage/WaterMeterLocalStorageRepository';
import { GetWaterMeters } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMeters';
import { GetCar } from '@eco/domain/src/Traveling/UseCase/GetCar/GetCar';
import { UpdateCar } from '@eco/domain/src/Traveling/UseCase/UpdateCar/UpdateCar';
import { AddCarbon } from '@eco/domain/src/Co2/UseCase/AddCarbon/AddCarbon';
import { GetCarbons } from '@eco/domain/src/Co2/UseCase/GetCarbons/GetCarbons';

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
