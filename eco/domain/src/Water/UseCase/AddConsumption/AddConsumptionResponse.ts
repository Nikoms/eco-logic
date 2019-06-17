import { WaterConsumption } from '@eco/domain/src/Water/Entity/WaterConsumption';

export class AddConsumptionResponse {
  consumption?: WaterConsumption;
  isConsumptionInvalid = false;
}
