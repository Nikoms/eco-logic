import { WaterConsumption } from '../../Entity/WaterConsumption';

export class AddConsumptionResponse {
  consumption?: WaterConsumption;
  isConsumptionInvalid = false;
}
