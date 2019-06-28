export class AddCarbonRequest {

  constructor(public readonly kg: number,
              public readonly description: string,
              public readonly id?: string,
              public readonly date?: Date) {
  }
}
