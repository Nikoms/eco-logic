export class AddCarRequest {
  constructor(public name: string,
              public consumption: string,
              public engine: string,
              public km: string,
              public id?: string,
              public date?: Date) {

  }
}
