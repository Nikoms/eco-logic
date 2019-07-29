import { ElectricViewModel } from './ViewModel';

export interface ElectricUI {
  showUpdatePowerConsumption(electricViewModel: ElectricViewModel): void;

  cancelUpdatePowerConsumption(): void;
}
