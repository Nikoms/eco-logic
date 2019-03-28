import { EventTargetEventDispatcher } from './event/EventDispatcher';
import { PowerConsumptionLocalStorageRepository } from './local-storage/PowerConsumptionLocalStorageRepository';
import { WaterConsumptionLocalStorageRepository } from './local-storage/WaterConsumptionLocalStorageRepository';
import { ElectricMeterLocalStorageRepository } from './local-storage/ElectricMeterLocalStorageRepository';
import { WaterMeterLocalStorageRepository } from './local-storage/WaterMeterLocalStorageRepository';
import { CarLocalStorageRepository } from './local-storage/CarLocalStorageRepository';
import { TravelLocalStorageRepository } from './local-storage/TravelLocalStorageRepository';
import { OdometerLocalStorageRepository } from './local-storage/OdometerLocalStorageRepository';
import { CarbonLocalStorageRepository } from './local-storage/CarbonLocalStorageRepository';
import { AddPowerConsumption } from '@eco/core-electricity/src/use-case/AddPowerConsumption';
import { GetAllPowerConsumptions } from '@eco/core-electricity/src/use-case/GetAllPowerConsumptions';
import { AddCar } from '@eco/core-travel/src/use-case/AddCar';
import { GetCars } from '@eco/core-travel/src/use-case/GetCars';
import { AddPlaneTravel } from '@eco/core-travel/src/use-case/AddPlaneTravel';
import { GetPlaneTravels } from '@eco/core-travel/src/use-case/GetPlaneTravels';
import { UpdateOdometer } from '@eco/core-travel/src/use-case/UpdateOdometer';
import { AddWaterConsumption } from '@eco/core-water/src/use-case/AddWaterConsumption';
import { GetWaterMeters } from '@eco/core-water/src/use-case/GetWaterMeters';
import { GetAllWaterConsumptions } from '@eco/core-water/src/use-case/GetAllWaterConsumptions';
import { InitWaterMeter } from '@eco/core-water/src/use-case/InitWaterMeter';
import { GetElectricMeters } from '@eco/core-electricity/src/use-case/GetElectricMeters';
import { InitElectricMeter } from '@eco/core-electricity/src/use-case/InitElectricMeter';
import { AddCarbon } from '@eco/core-co2/src/use-case/AddCarbon';

export const eventDispatcher = new EventTargetEventDispatcher();

const powerStore = new PowerConsumptionLocalStorageRepository(window.localStorage);
const waterConsumptionStore = new WaterConsumptionLocalStorageRepository(window.localStorage);
const electricStore = new ElectricMeterLocalStorageRepository(window.localStorage);
const waterStore = new WaterMeterLocalStorageRepository(window.localStorage);
const carStore = new CarLocalStorageRepository(window.localStorage);
const travelStore = new TravelLocalStorageRepository(window.localStorage);
const odometerStore = new OdometerLocalStorageRepository(window.localStorage);
const carbonStore = new CarbonLocalStorageRepository(window.localStorage);


export const addPowerConsumption = new AddPowerConsumption(powerStore, electricStore, eventDispatcher);
export const getAllPowerConsumptions = new GetAllPowerConsumptions(powerStore);
export const initElectricMeter = new InitElectricMeter(electricStore);
export const getElectricMeters = new GetElectricMeters(electricStore);

export const addCar = new AddCar(carStore);
export const getCars = new GetCars(carStore);
export const addPlaneTravel = new AddPlaneTravel(travelStore, eventDispatcher);
export const getPlaneTravels = new GetPlaneTravels(travelStore);
export const updateOdometer = new UpdateOdometer(odometerStore, carStore, eventDispatcher);

export const addWaterConsumption = new AddWaterConsumption(waterConsumptionStore);
export const getAllWaterConsumptions = new GetAllWaterConsumptions(waterConsumptionStore);
export const initWaterMeter = new InitWaterMeter(waterStore);
export const getWaterMeters = new GetWaterMeters(waterStore);

export const addCarbon = new AddCarbon(carbonStore);
