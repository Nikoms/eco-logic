import { ListConsumptions } from '@eco/domain/src/Water/UseCase/ListConsumptions/ListConsumptions';

export class ListConsumptionsController {
  constructor(private listConsumptions: ListConsumptions) {

  }

  refresh() {
    this.listConsumptions.execute();
  }
}
