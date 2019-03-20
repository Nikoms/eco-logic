import { Events } from '@eco/core-travel/src/event/Events';
import { AddCarbon } from './interactor/AddCarbon';

const co2Listeners: { [action: string]: ((event: any) => any)[] } = {
  [`${Events.odometerUpdated}`]: [AddCarbon.fromOdometerEvent],
};

export { co2Listeners };
