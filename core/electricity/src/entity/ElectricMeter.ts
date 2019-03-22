export class ElectricMeter {
  constructor(public readonly id: string, public readonly name: string, private _kWh: number, private _lastKWhUpdate: Date) {
  }

  get kWh() {
    return this._kWh;
  }

  get lastKWhUpdate() {
    return this._lastKWhUpdate;
  }

  updateKwh(kWh: number) {
    this._kWh = kWh;
    this._lastKWhUpdate = new Date();
  }
}
