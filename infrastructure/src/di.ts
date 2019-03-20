import { EventTargetEventDispatcher } from './event/EventDispatcher';
import { PowerConsumptionLocalStorageRepository } from './local-storage/PowerConsumptionLocalStorageRepository';
import { WaterConsumptionLocalStorageRepository } from './local-storage/WaterConsumptionLocalStorageRepository';
import { ElectricMeterLocalStorageRepository } from './local-storage/ElectricMeterLocalStorageRepository';
import { WaterMeterLocalStorageRepository } from './local-storage/WaterMeterLocalStorageRepository';
import { CarLocalStorageRepository } from './local-storage/CarLocalStorageRepository';
import { TravelLocalStorageRepository } from './local-storage/TravelLocalStorageRepository';
import { OdometerLocalStorageRepository } from './local-storage/OdometerLocalStorageRepository';
import { CarbonLocalStorageRepository } from './local-storage/CarbonLocalStorageRepository';

const eventDispatcher = new EventTargetEventDispatcher();

const powerStore = new PowerConsumptionLocalStorageRepository(window.localStorage);
const waterConsumptionStore = new WaterConsumptionLocalStorageRepository(window.localStorage);
const electricStore = new ElectricMeterLocalStorageRepository(window.localStorage);
const waterStore = new WaterMeterLocalStorageRepository(window.localStorage);
const carStore = new CarLocalStorageRepository(window.localStorage);
const travelStore = new TravelLocalStorageRepository(window.localStorage);
const odometerStore = new OdometerLocalStorageRepository(window.localStorage);
const carbonStore = new CarbonLocalStorageRepository(window.localStorage);

export {
  eventDispatcher,
  powerStore,
  waterConsumptionStore,
  electricStore,
  waterStore,
  carStore,
  travelStore,
  odometerStore,
  carbonStore,
};
