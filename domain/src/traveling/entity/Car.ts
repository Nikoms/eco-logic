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
    public readonly engine: Engine) {
  }
}
