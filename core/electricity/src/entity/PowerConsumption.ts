export class PowerConsumption {
  constructor(public id: string,
              public readonly kWh: number,
              public readonly electricMeter: string,
              public readonly date: Date) {
  }
}
