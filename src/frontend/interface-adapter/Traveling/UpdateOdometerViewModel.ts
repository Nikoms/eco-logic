export type OdometerForm = {
  previouslyPlaceHolder: string,
  carName: string,
  carId: string,
  displayed: boolean,
};

export class UpdateOdometerViewModel {
  titleText = 'Save your current odometer';
  cancelText = 'Cancel';
  saveText = 'Save';
  previouslyPlaceHolder = '';
  form: OdometerForm = {
    previouslyPlaceHolder: '',
    carName: '',
    carId: '',
    displayed: false,
  };
}
