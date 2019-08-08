import { CarViewModel } from './ViewModel';

export class UpdateOdometerViewModel {
  displayed = false;
  titleText = 'Save your current odometer';
  cancelText = 'Cancel';
  saveText = 'Save';
  selectedCar?: CarViewModel;
  previouslyPlaceHolder = '';
}
