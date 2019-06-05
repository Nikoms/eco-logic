import { Engine } from '@eco/core-travel/src/entity/Car';

export class AddCarViewModel {
  displayed = false;
  engines = [Engine.gasoline, Engine.diesel, Engine.CNG, Engine.LPG];
  titleLabel = 'Add a car';
  cancelLabel = 'Cancel';
  saveLabel = 'Save';
  consumptionLabel = 'Consumption';
  engineLabel = 'Engine';
  consumptionSuffix = 'l/100';
  nameLabel = 'Name of the car';
  kmLabel = 'Km initial';
}
