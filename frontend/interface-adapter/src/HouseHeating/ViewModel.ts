import { FuelOilOrder } from '@eco/domain/src/HouseHeating/Entity/FuelOilOrder';

export class ViewModel {
  totalFuelOilOrder: number = 0;
  lastOrders: FuelOilOrder[] = [];

  cancelLabel = 'Cancel';
  addLabel = 'Add command';
  literInputHelp = '';
  literInputSuffix = 'liters';
  literInputLabel = 'How much did your ordered';
  formDisplayed = false;
}
