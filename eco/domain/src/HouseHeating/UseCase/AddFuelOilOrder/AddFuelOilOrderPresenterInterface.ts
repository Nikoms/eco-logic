import { AddFuelOilOrderResponse } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderResponse';

export interface AddFuelOilOrderPresenterInterface {
  getAddFuelOilOrderViewModel(): void;

  presentAddFuelOilOrder(response: AddFuelOilOrderResponse): void;
}
