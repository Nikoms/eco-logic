import {
  AddPowerConsumption,
  AddPowerConsumptionHandler,
} from '@eco/core-electricity/src/interactor/AddPowerConsumption';
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
import {
  carbonStore,
  carStore,
  electricStore,
  eventDispatcher,
  odometerStore,
  powerStore,
  travelStore,
  waterConsumptionStore,
  waterStore,
} from '@eco/infrastructure/src/di';
import { co2Listeners } from '@eco/core-co2/src/co2Listeners';

const handlers = new Map<any, any>();
handlers.set(AddPowerConsumption, new AddPowerConsumptionHandler(powerStore, carbonStore));
handlers.set(GetAllPowerConsumptions, new GetAllPowerConsumptionsHandler(powerStore));
handlers.set(AddWaterConsumption, new AddWaterConsumptionHandler(waterConsumptionStore));
handlers.set(GetAllWaterConsumptions, new GetAllWaterConsumptionsHandler(waterConsumptionStore));
handlers.set(InitElectricMeter, new InitElectricMeterHandler(electricStore));
handlers.set(InitWaterMeter, new InitWaterMeterHandler(waterStore));
handlers.set(GetElectricMeters, new GetElectricMetersHandler(electricStore));
handlers.set(GetWaterMeters, new GetWaterMetersHandler(waterStore));
handlers.set(AddCar, new AddCarHandler(carStore));
handlers.set(GetCars, new GetCarsHandler(carStore));
handlers.set(AddTravel, new AddTravelHandler(travelStore));
handlers.set(GetTravels, new GetTravelsHandler(travelStore));
handlers.set(SaveCurrentOdometer, new SaveCurrentOdometerHandler(odometerStore, carStore, eventDispatcher));
handlers.set(GetLastOdometer, new GetLastOdometerHandler(odometerStore));
handlers.set(AddCarbon, new AddCarbonHandler(carbonStore));

const handle = <T = any>(request: any): Promise<T> => {
  return handlers.get(request.constructor).handle(request);
};

for (const key in co2Listeners) {
  if (co2Listeners.hasOwnProperty(key)) {
    co2Listeners[key].map(transformEventToAction => eventDispatcher.addListener(key, (event) => handle(transformEventToAction(event))));
  }
}

export { handle };
