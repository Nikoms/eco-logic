export interface UpdateOdometerCarViewModel {
  id: string;
  name: string;
  km: string
};

export class UpdateOdometerViewModel {
  displayed = false;
  selectedCar: UpdateOdometerCarViewModel | null = null;
  titleText = 'Save your current odometer';
  cancelText = 'Cancel';
  saveText = 'Save';
}
