export class PowerConsumption {
  constructor(public id: string,
              public readonly kWh: number,
              public readonly electricMeterId: string,
              public readonly date: Date) {
  }
}
