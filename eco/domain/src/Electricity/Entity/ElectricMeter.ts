import { ElectricMeterInterface } from '@eco/domain/src/Electricity/Entity/ElectricMeterInterface';

export class ElectricMeter implements ElectricMeterInterface {
  constructor(public readonly id: string, public readonly name: string, private _kWh: number, private _lastKWhUpdate: Date) {
  }

  get kWh() {
    return this._kWh;
  }

  get lastKWhUpdate() {
    return this._lastKWhUpdate;
  }

  updateKwh(kWh: number, date?: Date) {
    this._kWh = kWh;
    this._lastKWhUpdate = date || new Date();
  }
}
