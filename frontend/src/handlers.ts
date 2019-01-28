import {
  AddPowerConsumption,
  AddPowerConsumptionHandler
} from '../../application/src/interactor/electricity/AddPowerConsumption';
import {
  GetAllPowerConsumptions,
  GetAllPowerConsumptionsHandler
} from '../../application/src/interactor/electricity/GetAllPowerConsumptions';
import {
  AddWaterConsumption,
  AddWaterConsumptionHandler
} from '../../application/src/interactor/water/AddWaterConsumption';
import {
  GetAllWaterConsumptions,
  GetAllWaterConsumptionsHandler
} from '../../application/src/interactor/water/GetAllWaterConsumptions';
import { PowerConsumptionLocalStorageRepository } from '../../infrastructure/src/storage/local-storage/PowerConsumptionLocalStorageRepository';
import { WaterConsumptionLocalStorageRepository } from '../../infrastructure/src/storage/local-storage/WaterConsumptionLocalStorageRepository';
import { ElectricMeterLocalStorageRepository } from '../../infrastructure/src/storage/local-storage/ElectricMeterLocalStorageRepository';
import { InitElectricMeter, InitElectricMeterHandler } from 'application/src/interactor/electricity/InitElectricMeter';

const powerStore = new PowerConsumptionLocalStorageRepository(window.localStorage);
const waterStore = new WaterConsumptionLocalStorageRepository(window.localStorage);
const elestricStore = new ElectricMeterLocalStorageRepository(window.localStorage);
const handlers = new Map<any, any>();
handlers.set(AddPowerConsumption, new AddPowerConsumptionHandler(powerStore));
handlers.set(GetAllPowerConsumptions, new GetAllPowerConsumptionsHandler(powerStore));
handlers.set(AddWaterConsumption, new AddWaterConsumptionHandler(waterStore));
handlers.set(GetAllWaterConsumptions, new GetAllWaterConsumptionsHandler(waterStore));
handlers.set(InitElectricMeter, new InitElectricMeterHandler(elestricStore));


const handle = <T = any>(request: any): T => {
  return handlers.get(request.constructor).handle(request);
};

export { handle };
