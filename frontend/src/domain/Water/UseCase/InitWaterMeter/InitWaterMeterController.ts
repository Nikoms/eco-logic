import { InitWaterMeter } from '@/domain/Water/UseCase/InitWaterMeter/InitWaterMeter';
import { InitWaterMeterRequest } from '@/domain/Water/UseCase/InitWaterMeter/InitWaterMeterRequest';
import { GetWaterMeters } from '@/domain/Water/UseCase/GetWaterMeters/GetWaterMeters';

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
