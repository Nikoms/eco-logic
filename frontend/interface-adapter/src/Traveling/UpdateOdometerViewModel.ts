import { CarViewModel } from '@eco/frontend-interface-adapter/src/Traveling/ViewModel';

export class UpdateOdometerViewModel {
  displayed = false;
  titleText = 'Save your current odometer';
  cancelText = 'Cancel';
  saveText = 'Save';
  selectedCar?: CarViewModel;
}
