export class AddFlightRequest {
  constructor(public seat: string, public km: string, public description: string, public id?: string, public date?: Date) {

  }
}
