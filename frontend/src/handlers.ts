import { PowerConsumptionInMemoryRepository } from '../../infrastructure/src/repository/PowerConsumptionInMemoryRepository';
import {
  AddPowerConsumption,
  AddPowerConsumptionHandler
} from '../../application/src/interactor/electricity/AddPowerConsumption';
import {
  GetAllPowerConsumptions,
  GetAllPowerConsumptionsHandler
} from '../../application/src/interactor/electricity/GetAllPowerConsumptions';

const store = new PowerConsumptionInMemoryRepository();
const handlers = new Map<any, any>();
handlers.set(AddPowerConsumption, new AddPowerConsumptionHandler(store));
handlers.set(GetAllPowerConsumptions, new GetAllPowerConsumptionsHandler(store));


const handle = (request: any) => {
  return handlers.get(request.constructor).handle(request);
};

export { handle };
