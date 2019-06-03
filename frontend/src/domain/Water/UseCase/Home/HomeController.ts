import { GetWaterMeters } from '@/domain/Water/UseCase/GetWaterMeters';

export class HomeController {
  constructor(private getWaterMeters: GetWaterMeters) {

  }

  initList() {
    this.getWaterMeters.execute();
  }
}
