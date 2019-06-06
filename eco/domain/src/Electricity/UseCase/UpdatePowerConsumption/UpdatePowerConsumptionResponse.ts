import { PowerConsumption } from '@eco/core-electricity/src/entity/PowerConsumption';

export class UpdatePowerConsumptionResponse {
  isElectricMeterUnknown: boolean = false;
  iskWhEmpty: boolean = false;
  isKwhInvalid: boolean = false;
  newPowerConsumption?: PowerConsumption;

}
