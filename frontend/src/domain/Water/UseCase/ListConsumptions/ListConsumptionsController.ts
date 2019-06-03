import { ListConsumptions } from '@/domain/Water/UseCase/ListConsumptions/ListConsumptions';

export class ListConsumptionsController {
  constructor(private listConsumptions: ListConsumptions) {

  }

  refresh() {
    this.listConsumptions.execute();
  }
}
