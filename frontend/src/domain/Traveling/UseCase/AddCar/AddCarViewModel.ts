import { Engine } from '@eco/core-travel/src/entity/Car';

export class AddCarViewModel {
  displayed = false;
  engines = [Engine.gasoline, Engine.diesel, Engine.CNG, Engine.LPG];
  titleLabel = 'Add a car';
  cancelLabel = 'Cancel';
  saveLabel = 'Save';
  consumptionLabel = 'Description';
  kmLabel = 'Km initial';
}
