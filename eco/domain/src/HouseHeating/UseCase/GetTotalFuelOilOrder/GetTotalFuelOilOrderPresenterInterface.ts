import { GetTotalFuelOilOrderResponse } from '@eco/domain/src/HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrderResponse';

export interface GetTotalFuelOilOrderPresenterInterface {
  presentGetTotalFuelOilOrder(response: GetTotalFuelOilOrderResponse): void;
}
