import { WaterMeter } from '@eco/domain/src/Water/Entity/WaterMeter';
import { WaterConsumption } from '@eco/domain/src/Water/Entity/WaterConsumption';

export class ViewModel {
  meters: WaterMeter[] = [];
  hasMeters = false;
  hasMeter = false;
  errorMessage: string = '';
  displayed: boolean = false;

  consumptions: WaterConsumption[] = [];
  noConsumptionsMessage = 'No consumption for the moment. Don\'t forget to add yours quickly';
  headerM3Label = 'm3';
  headerMeterNameLabel = 'Meter';
  headerDateLabel = 'Date';
}
