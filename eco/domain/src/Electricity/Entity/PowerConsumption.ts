export class PowerConsumption {
  constructor(public readonly kWh: number,
              public readonly electricMeterId: string,
              public readonly date: Date) {
    if (kWh === undefined || kWh === null) {
      throw new Error('"kWh" empty');
    }
  }
}
