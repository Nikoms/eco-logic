import { ElectricMeter } from '@eco/domain/src/Electricity/Entity/ElectricMeter';

export class ViewModel {
  //List
  meters: ElectricMeter[] = [];
  hasMeter = false;

  //
  meter?: ElectricMeter;

  //Update
  isFormDisplayed = false;
  meterName = '';
  lastKWh = '';
  electricMeterId: string = '';
}
