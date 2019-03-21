export enum Engine {
  diesel = 'diesel',
  gasoline = 'gasoline',
  LPG = 'LPG',
  CNG = 'CNG',
}

export class Car {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly consumption: number,
    public readonly engine: Engine,
    private _lastKmUpdate: Date,
    private _km: number) {
  }

  get km() {
    return this._km;
  }

  get lastKmUpdate() {
    return this._lastKmUpdate;
  }

  updateKm(km: number) {
    if (km < this._km) {
      throw new Error('You can not set a lower km. The last one was: ' + this._km);
    }
    this._lastKmUpdate = new Date();
    this._km = km;
  }
}
