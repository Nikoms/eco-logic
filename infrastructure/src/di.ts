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
import { FuelOilOrderLocalStorageRepository } from './local-storage/FuelOilOrderLocalStorageRepository';
import { OrderFuelOil } from '@eco/core-fuel-oil/src/use-case/OrderFuelOil';
import { GetLastFuelOilOrder } from '@eco/core-fuel-oil/src/use-case/GetLastFuelOilOrder';
import { GetTotalFuelOilOrder } from '@eco/core-fuel-oil/src/use-case/GetTotalFuelOilOrder';
import { GetCarbons } from '@eco/core-co2/src/use-case/GetCarbons';
import { SaveElectricMeter } from '@eco/domain/src/Electricity/UseCase/SaveElectricMeter/SaveElectricMeter';
import { ElectricMeterLocalStorageRepository2 } from '@eco/infrastructure/src/local-storage/ElectricMeterLocalStorageRepository2';
import { GetElectricMeters } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMeters';
import { UpdatePowerConsumption } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumption';

export const eventDispatcher = new EventTargetEventDispatcher();

const waterConsumptionStore = new WaterConsumptionLocalStorageRepository(window.localStorage);
const electricStore2 = new ElectricMeterLocalStorageRepository2(window.localStorage);
const waterStore = new WaterMeterLocalStorageRepository(window.localStorage);
const carStore = new CarLocalStorageRepository(window.localStorage);
const travelStore = new TravelLocalStorageRepository(window.localStorage);
const odometerStore = new OdometerLocalStorageRepository(window.localStorage);
const carbonStore = new CarbonLocalStorageRepository(window.localStorage);
const fuelOilStore = new FuelOilOrderLocalStorageRepository(window.localStorage);

export const updatePowerConsumption = new UpdatePowerConsumption(electricStore2, eventDispatcher);
export const saveElectricMeter = new SaveElectricMeter(electricStore2);
export const getElectricMeters = new GetElectricMeters(electricStore2);

export const addCar = new AddCar(carStore);
export const getCars = new GetCars(carStore);
export const addPlaneTravel = new AddPlaneTravel(travelStore, eventDispatcher);
export const getPlaneTravels = new GetPlaneTravels(travelStore);
export const updateOdometer = new UpdateOdometer(odometerStore, carStore, eventDispatcher);

export const addWaterConsumption = new AddWaterConsumption(waterConsumptionStore);
export const getAllWaterConsumptions = new GetAllWaterConsumptions(waterConsumptionStore);
export const initWaterMeter = new InitWaterMeter(waterStore);
export const getWaterMeters = new GetWaterMeters(waterStore);

export const orderFuelOil = new OrderFuelOil(fuelOilStore, eventDispatcher);
export const getLastFuelOilOrder = new GetLastFuelOilOrder(fuelOilStore);
export const getTotalFuelOilOrder = new GetTotalFuelOilOrder(fuelOilStore);

export const addCarbon = new AddCarbon(carbonStore);
export const getCarbons = new GetCarbons(carbonStore);
