export class FuelOilOrderViewModel {
  constructor(public readonly quantity: string, public readonly date: string) {

  }
}

export class ViewModel {
  totalFuelOilOrder: string = '';
  lastOrders: FuelOilOrderViewModel[] = [];

  cancelLabel = 'Cancel';
  addLabel = 'Add command';
  literInputHelp = '';
  literInputSuffix = 'liters';
  literInputLabel = 'How much did your ordered';
  formDisplayed = false;
}
