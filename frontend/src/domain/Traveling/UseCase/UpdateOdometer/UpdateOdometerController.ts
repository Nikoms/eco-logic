import { UpdateOdometer } from '@/domain/Traveling/UseCase/UpdateOdometer';
import { UpdateOdometerRequest } from '@/domain/Traveling/UseCase/UpdateOdometer/UpdateOdometerRequest';

export class UpdateOdometerController {
  constructor(private updateOdometerUseCase: UpdateOdometer) {
  }

  updateOdometer(request: UpdateOdometerRequest) {
    this.updateOdometerUseCase.execute(request);
  }
}
