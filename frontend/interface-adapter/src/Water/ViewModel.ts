export class WaterMeterViewModel {
  constructor(public readonly id: string, public readonly name: string) {
  }
}

export class WaterConsumptionViewModel {
  constructor(public readonly meterId: string,
              public readonly quantity: string,
              public readonly date: string) {
  }
}

export class ViewModel {
  meters: WaterMeterViewModel[] = [];
  hasMeters = false;
  hasMeter = false;
  errorMessage: string = '';
  displayed: boolean = false;

  consumptions: WaterConsumptionViewModel[] = [];
  noConsumptionsMessage = 'No consumption for the moment. Don\'t forget to add yours quickly';
  headerM3Label = 'm3';
  headerMeterNameLabel = 'Meter';
  headerDateLabel = 'Date';
}
