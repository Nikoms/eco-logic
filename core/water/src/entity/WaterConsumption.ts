export class WaterConsumption {
  constructor(public id: string,
              public readonly m3: number,
              public readonly waterMeter: string,
              public readonly date: Date) {
  }
}
