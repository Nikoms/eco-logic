import { ElectricMeter } from '@eco/domain/src/Electricity/Entity/ElectricMeter';

export interface ElectricUI {
  showUpdatePowerConsumption(electricMeter: ElectricMeter): void;

  cancelUpdatePowerConsumption(): void;
}
