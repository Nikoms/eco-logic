import { InitWaterMeter } from '@eco/domain/src/Water/UseCase/InitWaterMeter/InitWaterMeter';
import { InitWaterMeterRequest } from '@eco/domain/src/Water/UseCase/InitWaterMeter/InitWaterMeterRequest';
import { GetWaterMeters } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMeters';

export class InitWaterMeterController {
  constructor(private initWaterMeter: InitWaterMeter, private getWaterMeters: GetWaterMeters) {
  }

  async init(request: InitWaterMeterRequest) {
    await this.initWaterMeter.execute(request);
  }

  async initList() {
    await this.getWaterMeters.execute();
  }
}
