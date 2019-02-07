import { PowerConsumptionAdded } from '../event/PowerConsumptionAdded';
import { Events } from '../event/Events';
import { CarbonImpact } from '../service/CarbonImpact';

export function getListeners(carbonImpact: CarbonImpact) {
  return [
    {
      on: Events.powerConsumptionAdded,
      do: async (event: PowerConsumptionAdded) => await carbonImpact.fromPowerConsumption(event.power),
    },
  ];
}
