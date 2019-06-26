import { ElectricViewModel } from '@eco/frontend-interface-adapter/src/Electricity/ViewModel';

export interface ElectricUI {
  showUpdatePowerConsumption(electricViewModel: ElectricViewModel): void;

  cancelUpdatePowerConsumption(): void;
}
