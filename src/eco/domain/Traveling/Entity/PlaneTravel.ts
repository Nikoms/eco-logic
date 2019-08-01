export enum Seat {
  economyClass = 'economyClass',
  businessClass = 'businessClass',
  firstClass = 'firstClass',
}

export class PlaneTravel {
  constructor(public readonly id: string, public readonly seat: Seat,
              public readonly km: number, public readonly description: string, public readonly date: Date) {
  }
}
