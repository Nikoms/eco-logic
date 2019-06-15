import { EventTargetEventDispatcher } from './event/EventDispatcher';
import { WaterConsumptionLocalStorageRepository } from './local-storage/WaterConsumptionLocalStorageRepository';
import { WaterMeterLocalStorageRepository } from './local-storage/WaterMeterLocalStorageRepository';
import { CarLocalStorageRepository } from './local-storage/CarLocalStorageRepository';
import { TravelLocalStorageRepository } from './local-storage/TravelLocalStorageRepository';
import { OdometerLocalStorageRepository } from './local-storage/OdometerLocalStorageRepository';
import { CarbonLocalStorageRepository } from './local-storage/CarbonLocalStorageRepository';
import { AddCar } from '@eco/core-travel/src/use-case/AddCar';
import { GetCars } from '@eco/core-travel/src/use-case/GetCars';
import { AddPlaneTravel } from '@eco/core-travel/src/use-case/AddPlaneTravel';
import { GetPlaneTravels } from '@eco/core-travel/src/use-case/GetPlaneTravels';
import { UpdateOdometer } from '@eco/core-travel/src/use-case/UpdateOdometer';
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

export const eventDispatcher = new EventTargetEventDispatcher();

const waterConsumptionStore = new WaterConsumptionLocalStorageRepository(window.localStorage);
const electricStore2 = new ElectricMeterLocalStorageRepository2(window.localStorage);
const waterStore = new WaterMeterLocalStorageRepository(window.localStorage);
const carStore = new CarLocalStorageRepository(window.localStorage);
const travelStore = new TravelLocalStorageRepository(window.localStorage);
const odometerStore = new OdometerLocalStorageRepository(window.localStorage);
const carbonStore = new CarbonLocalStorageRepository(window.localStorage);
const fuelOilStore2 = new FuelOilOrderLocalStorageRepository2(window.localStorage);
export const updatePowerConsumption = new UpdatePowerConsumption(electricStore2, eventDispatcher);
export const saveElectricMeter = new SaveElectricMeter(electricStore2);
export const getElectricMeters = new GetElectricMeters(electricStore2);
export const getElectricMeter = new GetElectricMeter(electricStore2);

export const addCar = new AddCar(carStore);
export const getCars = new GetCars(carStore);
export const addPlaneTravel = new AddPlaneTravel(travelStore, eventDispatcher);
export const getPlaneTravels = new GetPlaneTravels(travelStore);
export const updateOdometer = new UpdateOdometer(odometerStore, carStore, eventDispatcher);

export const addWaterConsumption = new AddWaterConsumption(waterConsumptionStore);
export const getAllWaterConsumptions = new GetAllWaterConsumptions(waterConsumptionStore);
export const initWaterMeter = new InitWaterMeter(waterStore);
export const getWaterMeters = new GetWaterMeters(waterStore);

export const addFuelOilOrder = new AddFuelOilOrder(fuelOilStore2, eventDispatcher);
export const getLastFuelOilOrder = new GetLastFuelOilOrders(fuelOilStore2);
export const getTotalFuelOilOrder = new GetTotalFuelOilOrder(fuelOilStore2);

export const addCarbon = new AddCarbon(carbonStore);
export const getCarbons = new GetCarbons(carbonStore);
