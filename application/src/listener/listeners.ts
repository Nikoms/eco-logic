import { EventDispatcher } from '../port/needed/EventDispatcher';
import { PowerConsumptionAdded } from '../event/PowerConsumptionAdded';
import { PowerConsumptionRepository } from '@eco/domain/src/electricity/repository/PowerConsumptionRepository';
import { Events } from '../event/Events';
import { handle } from 'frontend/src/handlers';
import { AddCarbon } from '../interactor/co2/AddCarbon';

export function initListeners(eventDispatcher: EventDispatcher, powerStore: PowerConsumptionRepository) {
  eventDispatcher.addListener(Events.powerConsumptionAdded, async (event: PowerConsumptionAdded) => {
    const consumptionBefore = await powerStore.getConsumptionBefore(event.power.id);
    const diff = consumptionBefore ? event.power.kWh - consumptionBefore.kWh : 0;
    handle(AddCarbon.fromPower(diff));
  });
}
