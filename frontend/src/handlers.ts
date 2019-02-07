import {
  AddPowerConsumption,
  AddPowerConsumptionHandler,
} from '@eco/application/src/interactor/electricity/AddPowerConsumption';
import {
  GetAllPowerConsumptions,
  GetAllPowerConsumptionsHandler,
} from '@eco/application/src/interactor/electricity/GetAllPowerConsumptions';
import {
  AddWaterConsumption,
  AddWaterConsumptionHandler,
} from '@eco/application/src/interactor/water/AddWaterConsumption';
import {
  GetAllWaterConsumptions,
  GetAllWaterConsumptionsHandler,
} from '@eco/application/src/interactor/water/GetAllWaterConsumptions';
import { PowerConsumptionLocalStorageRepository } from '@eco/infrastructure/src/storage/local-storage/PowerConsumptionLocalStorageRepository';
import { WaterConsumptionLocalStorageRepository } from '@eco/infrastructure/src/storage/local-storage/WaterConsumptionLocalStorageRepository';
import { ElectricMeterLocalStorageRepository } from '@eco/infrastructure/src/storage/local-storage/ElectricMeterLocalStorageRepository';
import { WaterMeterLocalStorageRepository } from '@eco/infrastructure/src/storage/local-storage/WaterMeterLocalStorageRepository';
import {
  InitElectricMeter,
  InitElectricMeterHandler,
} from '@eco/application/src/interactor/electricity/InitElectricMeter';
import {
  GetElectricMeters,
  GetElectricMetersHandler,
} from '@eco/application/src/interactor/electricity/GetElectricMeters';
import { GetWaterMeters, GetWaterMetersHandler } from '@eco/application/src/interactor/water/GetWaterMeters';
import { InitWaterMeter, InitWaterMeterHandler } from '@eco/application/src/interactor/water/InitWaterMeter';
import { CarLocalStorageRepository } from '@eco/infrastructure/src/storage/local-storage/CarLocalStorageRepository';
import { AddCar, AddCarHandler } from '@eco/application/src/interactor/travel/AddCar';
import { GetCars, GetCarsHandler } from '@eco/application/src/interactor/travel/GetCars';
import { AddTravel, AddTravelHandler } from '@eco/application/src/interactor/travel/AddTravel';
import { TravelLocalStorageRepository } from '@eco/infrastructure/src/storage/local-storage/TravelLocalStorageRepository';
import { GetTravels, GetTravelsHandler } from '@eco/application/src/interactor/travel/GetTravels';
import {
  SaveCurrentOdometer,
  SaveCurrentOdometerHandler,
} from '@eco/application/src/interactor/travel/SaveCurrentOdometer';
import { OdometerLocalStorageRepository } from '@eco/infrastructure/src/storage/local-storage/OdometerLocalStorageRepository';
import { GetLastOdometer, GetLastOdometerHandler } from '@eco/application/src/interactor/travel/GetLastOdometer';
import { EventTargetEventDispatcher } from '@eco/infrastructure/src/event/EventDispatcher';
import { CarbonLocalStorageRepository } from '@eco/infrastructure/src/storage/local-storage/CarbonLocalStorageRepository';
import { AddCarbon, AddCarbonHandler } from '@eco/application/src/interactor/co2/AddCarbon';
import { getListeners } from '@eco/application/src/listener/listeners';
import { CarbonImpact } from '@eco/application/src/service/CarbonImpact';

const powerStore = new PowerConsumptionLocalStorageRepository(window.localStorage);
const waterConsumptionStore = new WaterConsumptionLocalStorageRepository(window.localStorage);
const elestricStore = new ElectricMeterLocalStorageRepository(window.localStorage);
const waterStore = new WaterMeterLocalStorageRepository(window.localStorage);
const carStore = new CarLocalStorageRepository(window.localStorage);
const travelStore = new TravelLocalStorageRepository(window.localStorage);
const odometerStore = new OdometerLocalStorageRepository(window.localStorage);
const carbonStore = new CarbonLocalStorageRepository(window.localStorage);

const eventDispatcher = new EventTargetEventDispatcher();
const carbonImpact = new CarbonImpact(powerStore);
getListeners(carbonImpact).forEach(l => eventDispatcher.addListener(l.on, async (e) => handle(await l.do(e))));

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

const handle = <T = any>(request: any): Promise<T> => {
  return handlers.get(request.constructor).handle(request);
};

export { handle };
