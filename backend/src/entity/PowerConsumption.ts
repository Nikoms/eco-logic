import { JsonOf } from '../Type/JsonOf';
import uuid = require('uuid');


export class PowerConsumption {
  constructor(public id: string, public readonly kWh: number, public readonly date: Date) {
  }

  static fromRequest(request: JsonOf<PowerConsumption>) {
    return new PowerConsumption(uuid.v4(), request.kWh, new Date());
  }
}
