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
import {
  InitElectricMeter,
  InitElectricMeterHandler,
} from '@eco/application/src/interactor/electricity/InitElectricMeter';
import {
  GetElectricMeters,
  GetElectricMetersHandler,
} from '@eco/application/src/interactor/electricity/GetElectricMeters';
import { CarLocalStorageRepository } from '@eco/infrastructure/src/storage/local-storage/CarLocalStorageRepository';
import { AddCar, AddCarHandler } from '@eco/application/src/interactor/travel/AddCar';
import { GetCars, GetCarsHandler } from '@eco/application/src/interactor/travel/GetCars';
import { AddTravel, AddTravelHandler } from '@eco/application/src/interactor/travel/AddTravel';
import { TravelLocalStorageRepository } from '@eco/infrastructure/src/storage/local-storage/TravelLocalStorageRepository';
import { GetTravels, GetTravelsHandler } from '@eco/application/src/interactor/travel/GetTravels';

const powerStore = new PowerConsumptionLocalStorageRepository(window.localStorage);
const waterStore = new WaterConsumptionLocalStorageRepository(window.localStorage);
const elestricStore = new ElectricMeterLocalStorageRepository(window.localStorage);
const carStore = new CarLocalStorageRepository(window.localStorage);
const travelStore = new TravelLocalStorageRepository(window.localStorage);
const handlers = new Map<any, any>();
handlers.set(AddPowerConsumption, new AddPowerConsumptionHandler(powerStore));
handlers.set(GetAllPowerConsumptions, new GetAllPowerConsumptionsHandler(powerStore));
handlers.set(AddWaterConsumption, new AddWaterConsumptionHandler(waterStore));
handlers.set(GetAllWaterConsumptions, new GetAllWaterConsumptionsHandler(waterStore));
handlers.set(InitElectricMeter, new InitElectricMeterHandler(elestricStore));
handlers.set(GetElectricMeters, new GetElectricMetersHandler(elestricStore));
handlers.set(AddCar, new AddCarHandler(carStore));
handlers.set(GetCars, new GetCarsHandler(carStore));
handlers.set(AddTravel, new AddTravelHandler(travelStore));
handlers.set(GetTravels, new GetTravelsHandler(travelStore));


const handle = <T = any>(request: any): Promise<T> => {
  return handlers.get(request.constructor).handle(request);
};

export { handle };
