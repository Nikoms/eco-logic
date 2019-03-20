import { PowerConsumptionLocalStorageRepository } from '@eco/infrastructure/src/local-storage/PowerConsumptionLocalStorageRepository';
import { WaterConsumptionLocalStorageRepository } from '@eco/infrastructure/src/local-storage/WaterConsumptionLocalStorageRepository';
import { ElectricMeterLocalStorageRepository } from '@eco/infrastructure/src/local-storage/ElectricMeterLocalStorageRepository';
import { WaterMeterLocalStorageRepository } from '@eco/infrastructure/src/local-storage/WaterMeterLocalStorageRepository';
import { CarLocalStorageRepository } from '@eco/infrastructure/src/local-storage/CarLocalStorageRepository';
import { TravelLocalStorageRepository } from '@eco/infrastructure/src/local-storage/TravelLocalStorageRepository';
import { OdometerLocalStorageRepository } from '@eco/infrastructure/src/local-storage/OdometerLocalStorageRepository';
import { CarbonLocalStorageRepository } from '@eco/infrastructure/src/local-storage/CarbonLocalStorageRepository';
import AddPowerConsumption from '@/components/electricity/add-power-consumption.vue';
import { AddPowerConsumptionHandler } from '@eco/core-electricity/src/interactor/AddPowerConsumption';
import {
  GetAllPowerConsumptions,
  GetAllPowerConsumptionsHandler,
} from '@eco/core-electricity/src/interactor/GetAllPowerConsumptions';
import { AddWaterConsumption, AddWaterConsumptionHandler } from '@eco/core-water/src/interactor/AddWaterConsumption';
import {
  GetAllWaterConsumptions,
  GetAllWaterConsumptionsHandler,
} from '@eco/core-water/src/interactor/GetAllWaterConsumptions';
import { InitElectricMeter, InitElectricMeterHandler } from '@eco/core-electricity/src/interactor/InitElectricMeter';
import { InitWaterMeter, InitWaterMeterHandler } from '@eco/core-water/src/interactor/InitWaterMeter';
import { GetElectricMeters, GetElectricMetersHandler } from '@eco/core-electricity/src/interactor/GetElectricMeters';
import { GetCars, GetCarsHandler } from '@eco/core-travel/src/interactor/GetCars';
import { AddCar, AddCarHandler } from '@eco/core-travel/src/interactor/AddCar';
import { AddTravel, AddTravelHandler } from '@eco/core-travel/src/interactor/AddTravel';
import { GetTravels, GetTravelsHandler } from '@eco/core-travel/src/interactor/GetTravels';
import { GetLastOdometer, GetLastOdometerHandler } from '@eco/core-travel/src/interactor/GetLastOdometer';
import { AddCarbon, AddCarbonHandler } from '@eco/core-co2/src/interactor/AddCarbon';
import { SaveCurrentOdometer, SaveCurrentOdometerHandler } from '@eco/core-travel/src/interactor/SaveCurrentOdometer';
import { GetWaterMeters, GetWaterMetersHandler } from '@eco/core-water/src/interactor/GetWaterMeters';
import { EventTargetEventDispatcher } from '@eco/infrastructure/src/event/EventDispatcher';


const powerStore = new PowerConsumptionLocalStorageRepository(window.localStorage);
const waterConsumptionStore = new WaterConsumptionLocalStorageRepository(window.localStorage);
const elestricStore = new ElectricMeterLocalStorageRepository(window.localStorage);
const waterStore = new WaterMeterLocalStorageRepository(window.localStorage);
const carStore = new CarLocalStorageRepository(window.localStorage);
const travelStore = new TravelLocalStorageRepository(window.localStorage);
const odometerStore = new OdometerLocalStorageRepository(window.localStorage);
const carbonStore = new CarbonLocalStorageRepository(window.localStorage);

const handlers = new Map<any, any>();
handlers.set(AddPowerConsumption, new AddPowerConsumptionHandler(powerStore, carbonStore));
handlers.set(GetAllPowerConsumptions, new GetAllPowerConsumptionsHandler(powerStore));
handlers.set(AddWaterConsumption, new AddWaterConsumptionHandler(waterConsumptionStore));
handlers.set(GetAllWaterConsumptions, new GetAllWaterConsumptionsHandler(waterConsumptionStore));
handlers.set(InitElectricMeter, new InitElectricMeterHandler(elestricStore));
handlers.set(InitWaterMeter, new InitWaterMeterHandler(waterStore));
handlers.set(GetElectricMeters, new GetElectricMetersHandler(elestricStore));
handlers.set(GetWaterMeters, new GetWaterMetersHandler(waterStore));
handlers.set(AddCar, new AddCarHandler(carStore));
handlers.set(GetCars, new GetCarsHandler(carStore));
handlers.set(AddTravel, new AddTravelHandler(travelStore));
handlers.set(GetTravels, new GetTravelsHandler(travelStore));
handlers.set(SaveCurrentOdometer, new SaveCurrentOdometerHandler(odometerStore));
handlers.set(GetLastOdometer, new GetLastOdometerHandler(odometerStore));
handlers.set(AddCarbon, new AddCarbonHandler(carbonStore));

new EventTargetEventDispatcher();

const handle = <T = any>(request: any): Promise<T> => {
  return handlers.get(request.constructor).handle(request);
};

export { handle };
