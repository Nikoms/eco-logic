import { UpdatePowerConsumptionViewModel } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionViewModel';
import { PowerConsumption } from '@eco/core-electricity/src/entity/PowerConsumption';

export interface UpdatePowerConsumptionPresenterInterface {
  cancelUpdatePowerConsumption(): void;

  getUpdatePowerConsumptionViewModel(): UpdatePowerConsumptionViewModel;

  electricMeterIsUnknown(): void;

  kWhIsEmpty(): void;

  kWhIsNotAValidNumber(): void;

  powerConsumptionSaved(powerConsumption: PowerConsumption): void;
}
