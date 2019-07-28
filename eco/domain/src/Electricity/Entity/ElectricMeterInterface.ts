export interface ElectricMeterInterface {
  id: string;
  name: string;
  kWh: number;
  lastKWhUpdate: Date;
}
