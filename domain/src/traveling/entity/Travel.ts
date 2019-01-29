export enum TravelType {
  car = 'car',
  flight = 'flight'
}


export class Travel {
  constructor(public readonly id: string, public readonly type: TravelType, public readonly typeId: string,
              public readonly km: number, public readonly date: Date) {
  }
}
