import { AddConsumption } from './Water/UseCase/AddConsumption/AddConsumption';
import { AddConsumptionRequest } from './Water/UseCase/AddConsumption/AddConsumptionRequest';
import { AddConsumptionResponse } from './Water/UseCase/AddConsumption/AddConsumptionResponse';

import { AddWaterMeter } from './Water/UseCase/AddWaterMeter/AddWaterMeter';
import { AddWaterMeterRequest } from './Water/UseCase/AddWaterMeter/AddWaterMeterRequest';
import { AddWaterMeterResponse } from './Water/UseCase/AddWaterMeter/AddWaterMeterResponse';

import { GetConsumptions } from './Water/UseCase/GetConsumptions/GetConsumptions';
import { GetConsumptionsResponse } from './Water/UseCase/GetConsumptions/GetConsumptionsResponse';
import { GetWaterMetersResponse } from './Water/UseCase/GetWaterMeters/GetWaterMetersResponse';

import { GetWaterMeters } from './Water/UseCase/GetWaterMeters/GetWaterMeters';
import { WaterConsumption } from './Water/Entity/WaterConsumption';
import { WaterMeter } from './Water/Entity/WaterMeter';
import { Car, Engine } from './Traveling/Entity/Car';
import { Odometer } from './Traveling/Entity/Odometer';
import { PlaneTravel, Seat } from './Traveling/Entity/PlaneTravel';
import { OdometerUpdated } from './Traveling/Event/OdometerUpdated';
import { PlaneTravelAdded } from './Traveling/Event/PlaneTravelAdded';
import { TravelEvents } from './Traveling/Event/TravelEvents';
import { AddCar } from './Traveling/UseCase/AddCar/AddCar';
import { AddCarRequest } from './Traveling/UseCase/AddCar/AddCarRequest';
import { AddCarResponse } from './Traveling/UseCase/AddCar/AddCarResponse';
import { AddFlightResponse } from './Traveling/UseCase/AddFlight/AddFlightResponse';
import { AddFlight } from './Traveling/UseCase/AddFlight/AddFlight';
import { GetCar } from './Traveling/UseCase/GetCar/GetCar';
import { GetCars } from './Traveling/UseCase/GetCars/GetCars';
import { GetFlights } from './Traveling/UseCase/GetFlights/GetFlights';
import { UpdateCar } from './Traveling/UseCase/UpdateCar/UpdateCar';
import { UpdateOdometer } from './Traveling/UseCase/UpdateOdometer/UpdateOdometer';
import { AddFlightRequest } from './Traveling/UseCase/AddFlight/AddFlightRequest';
import { GetCarRequest } from './Traveling/UseCase/GetCar/GetCarRequest';
import { UpdateCarRequest } from './Traveling/UseCase/UpdateCar/UpdateCarRequest';
import { GetCarResponse } from './Traveling/UseCase/GetCar/GetCarResponse';
import { GetCarsResponse } from './Traveling/UseCase/GetCars/GetCarsResponse';
import { GetFlightsResponse } from './Traveling/UseCase/GetFlights/GetFlightsResponse';
import { UpdateCarResponse } from './Traveling/UseCase/UpdateCar/UpdateCarResponse';
import { UpdateOdometerRequest } from './Traveling/UseCase/UpdateOdometer/UpdateOdometerRequest';
import { UpdateOdometerResponse } from './Traveling/UseCase/UpdateOdometer/UpdateOdometerResponse';
import { FuelOilOrder } from './HouseHeating/Entity/FuelOilOrder';
import { FuelOilOrdered } from './HouseHeating/Event/FuelOilOrdered';
import { FuelOilEvents } from './HouseHeating/Event/FuelOilEvents';
import { AddFuelOilOrder } from './HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrder';
import { AddFuelOilOrderRequest } from './HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderRequest';
import { AddFuelOilOrderResponse } from './HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderResponse';
import { GetLastFuelOilOrders } from './HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrder';
import { GetLastFuelOilOrdersRequest } from './HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrdersRequest';
import { GetLastFuelOilOrdersResponse } from './HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrdersResponse';
import { GetTotalFuelOilOrder } from './HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrder';
import { GetTotalFuelOilOrderResponse } from './HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrderResponse';
import { ElectricMeter } from './Electricity/Entity/ElectricMeter';
import { PowerConsumption } from './Electricity/Entity/PowerConsumption';
import { ElectricityEvents } from './Electricity/Event/ElectricityEvents';
import { PowerUpdated } from './Electricity/Event/PowerUpdated';
import { GetElectricMeter } from './Electricity/UseCase/GetElectricMeter/GetElectricMeter';
import { GetElectricMeterRequest } from './Electricity/UseCase/GetElectricMeter/GetElectricMeterRequest';
import { GetElectricMeterResponse } from './Electricity/UseCase/GetElectricMeter/GetElectricMeterResponse';
import { GetElectricMeters } from './Electricity/UseCase/GetElectricMeters/GetElectricMeters';
import { GetElectricMetersResponse } from './Electricity/UseCase/GetElectricMeters/GetElectricMetersResponse';
import { SaveElectricMeter } from './Electricity/UseCase/SaveElectricMeter/SaveElectricMeter';
import { SaveElectricMeterRequest } from './Electricity/UseCase/SaveElectricMeter/SaveElectricMeterRequest';
import { SaveElectricMeterResponse } from './Electricity/UseCase/SaveElectricMeter/SaveElectricMeterResponse';
import { UpdatePowerConsumption } from './Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumption';
import { UpdatePowerConsumptionRequest } from './Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionRequest';
import { UpdatePowerConsumptionResponse } from './Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionResponse';
import { Carbon } from './Co2/Entity/Carbon';
import { initCo2Listeners } from './Co2/co2Listeners';
import { AddCarbon } from './Co2/UseCase/AddCarbon/AddCarbon';
import { AddCarbonRequest } from './Co2/UseCase/AddCarbon/AddCarbonRequest';
import { AddCarbonResponse } from './Co2/UseCase/AddCarbon/AddCarbonResponse';
import { GetCarbons } from './Co2/UseCase/GetCarbons/GetCarbons';
import { GetCarbonsResponse } from './Co2/UseCase/GetCarbons/GetCarbonsResponse';

// The only way to export interfaces with "isolatedModules" (react)
export * from './Co2/UseCase/GetCarbons/GetCarbonsPresenter';
export * from './Co2/UseCase/AddCarbon/AddCarbonPresenter';
export * from './Co2/Repository/CarbonRepository';
export * from './Water/UseCase/GetWaterMeters/GetWaterMetersPresenterInterface';
export * from './HouseHeating/FuelOilOrderRepositoryInterface';
export * from './HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderPresenterInterface';
export * from './HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrdersPresenterInterface';
export * from './HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrderPresenterInterface';
export * from './Traveling/UseCase/AddFlight/AddFlightPresenterInterface';
export * from './Traveling/UseCase/GetCar/GetCarPresenterInterface';
export * from './Traveling/UseCase/GetCars/GetCarsPresenterInterface';
export * from './Traveling/UseCase/GetFlights/GetFlightsPresenterInterface';
export * from './Traveling/UseCase/UpdateCar/UpdateCarPresenterInterface';
export * from './Traveling/UseCase/UpdateOdometer/UpdateOdometerPresenterInterface';
export * from './Traveling/UseCase/AddCar/AddCarPresenterInterface';
export * from './Water/UseCase/ConsumptionRepositoryInterface';
export * from './Water/UseCase/WaterMeterRepositoryInterface';
export * from './Water/UseCase/GetConsumptions/GetConsumptionsPresenterInterface';
export * from './Water/UseCase/AddWaterMeter/AddWaterMeterPresenterInterface';
export * from './Water/UseCase/AddConsumption/AddConsumptionPresenterInterface';
export * from './Electricity/Repository/ElectricityMeterRepositoryInterface';
export * from './Electricity/Repository/PowerConsumptionRepositoryInterface';
export * from './Electricity/UseCase/GetElectricMeter/GetElectricMeterPresenterInterface';
export * from './Electricity/UseCase/GetElectricMeters/GetElectricMetersPresenterInterface';
export * from './Electricity/UseCase/SaveElectricMeter/SaveElectricMeterPresenterInterface';
export * from './Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionPresenterInterface';
export * from './Traveling/UseCase/FlightRepositoryInterface';
export * from './Traveling/UseCase/CarRepositoryInterface';


// @ts-ignore
export {
  AddConsumption,
  AddConsumptionRequest,
  AddConsumptionResponse,
  AddWaterMeter,
  AddWaterMeterRequest,
  AddWaterMeterResponse,
  GetConsumptions,
  GetConsumptionsResponse,
  GetWaterMeters,
  GetWaterMetersResponse,
  WaterConsumption,
  WaterMeter,
  Car,
  Odometer,
  PlaneTravel,
  OdometerUpdated,
  PlaneTravelAdded,
  TravelEvents,
  AddCar,
  AddCarRequest,
  AddCarResponse,
  Seat,
  Engine,
  AddFlight,
  AddFlightRequest,
  AddFlightResponse,
  GetCar,
  GetCarRequest,
  GetCarResponse,
  GetCars,
  GetCarsResponse,
  GetFlights,
  GetFlightsResponse,
  UpdateCar,
  UpdateCarRequest,
  UpdateCarResponse,
  UpdateOdometer,
  UpdateOdometerRequest,
  UpdateOdometerResponse,
  FuelOilOrder,
  FuelOilEvents,
  FuelOilOrdered,
  AddFuelOilOrder,
  AddFuelOilOrderRequest,
  AddFuelOilOrderResponse,
  GetLastFuelOilOrders,
  GetLastFuelOilOrdersRequest,
  GetLastFuelOilOrdersResponse,
  GetTotalFuelOilOrder,
  GetTotalFuelOilOrderResponse,
  ElectricMeter,
  PowerConsumption,
  ElectricityEvents,
  PowerUpdated,
  GetElectricMeter,
  GetElectricMeterRequest,
  GetElectricMeterResponse,
  GetElectricMeters,
  GetElectricMetersResponse,
  SaveElectricMeter,
  SaveElectricMeterRequest,
  SaveElectricMeterResponse,
  UpdatePowerConsumption,
  UpdatePowerConsumptionRequest,
  UpdatePowerConsumptionResponse,
  Carbon,
  initCo2Listeners,
  AddCarbon, AddCarbonRequest, AddCarbonResponse,
  GetCarbons, GetCarbonsResponse,
};
