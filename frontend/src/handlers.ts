import { PowerConsumptionInMemoryRepository } from '../../infrastructure/src/repository/PowerConsumptionInMemoryRepository';
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
import { WaterConsumptionInMemoryRepository } from '../../infrastructure/src/repository/WaterConsumptionInMemoryRepository';
import {
  GetAllWaterConsumptions,
  GetAllWaterConsumptionsHandler
} from '../../application/src/interactor/water/GetAllWaterConsumptions';

const powerStore = new PowerConsumptionInMemoryRepository();
const waterStore = new WaterConsumptionInMemoryRepository();
const handlers = new Map<any, any>();
handlers.set(AddPowerConsumption, new AddPowerConsumptionHandler(powerStore));
handlers.set(GetAllPowerConsumptions, new GetAllPowerConsumptionsHandler(powerStore));
handlers.set(AddWaterConsumption, new AddWaterConsumptionHandler(waterStore));
handlers.set(GetAllWaterConsumptions, new GetAllWaterConsumptionsHandler(waterStore));


const handle = <T = any>(request: any): T => {
  return handlers.get(request.constructor).handle(request);
};

export { handle };
