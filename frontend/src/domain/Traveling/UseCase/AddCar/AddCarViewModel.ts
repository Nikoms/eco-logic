import { Engine } from '@eco/core-travel/src/entity/Car';
import { AddCarRequest } from '@/domain/Traveling/UseCase/AddCar/AddCarRequest';

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
  form = new AddCarRequest('', '', '', '');
}
