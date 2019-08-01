export class AddConsumptionRequest {
  constructor(public meterId: string, public m3: string, public id?: string, public date?: Date) {

  }
}
