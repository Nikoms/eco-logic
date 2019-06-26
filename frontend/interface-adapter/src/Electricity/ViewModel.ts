export class ElectricViewModel {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly kWh: string,
    public readonly lastUpdateDate: string,
  ) {
  }
}

export class ViewModel {
  meters: ElectricViewModel[] = [];
  hasMeter = false;
  isFormDisplayed = false;
  selectedMeter?: ElectricViewModel;
}
