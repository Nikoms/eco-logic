export class WaterConsumption {
  constructor(public id: string,
              public readonly m3: number,
              public readonly waterMeterId: string,
              public readonly date: Date) {
  }
}
