import { UpdateOdometerRequest } from '@/domain/Traveling/UseCase/UpdateOdometer/UpdateOdometerRequest';
import { UpdateOdometer } from '@/domain/Traveling/UseCase/UpdateOdometer/UpdateOdometer';

export class UpdateOdometerController {
  constructor(private updateOdometerUseCase: UpdateOdometer) {
  }

  updateOdometer(request: UpdateOdometerRequest) {
    this.updateOdometerUseCase.execute(request);
  }
}
