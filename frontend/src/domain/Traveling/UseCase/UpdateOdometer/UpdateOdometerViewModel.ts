import { UpdateOdometerRequest } from '@/domain/Traveling/UseCase/UpdateOdometer/UpdateOdometerRequest';

export interface UpdateOdometerCarViewModel {
  id: string;
  name: string;
  km: string;
}

export class UpdateOdometerViewModel {
  displayed = false;
  titleText = 'Save your current odometer';
  cancelText = 'Cancel';
  saveText = 'Save';
  carName = '';
  lastKm = '';
  form = new UpdateOdometerRequest('', '');
}
