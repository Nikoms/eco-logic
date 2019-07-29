import { PowerConsumption } from '../../Entity/PowerConsumption';

export class UpdatePowerConsumptionResponse {
  isElectricMeterUnknown: boolean = false;
  iskWhEmpty: boolean = false;
  isKwhInvalid: boolean = false;
  newPowerConsumption?: PowerConsumption;

}
