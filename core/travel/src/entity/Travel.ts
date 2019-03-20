export enum TravelType {
  car = 'car',
  plane = 'plane',
}


export class Travel {
  constructor(public readonly id: string, public readonly type: TravelType, public readonly typeId: string,
              public readonly km: number, public readonly description: string, public readonly date: Date) {
  }
}
