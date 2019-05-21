<template>
    <v-dialog v-model="viewModel.displayed" max-width="600px">
        <v-form v-if="viewModel.selectedCar" @submit.prevent="saveOdometer">
            <v-card>
                <v-card-title>
                    <v-icon large left>mdi-car</v-icon>
                    <span class="title font-weight-light">{{viewModel.titleText}}</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="km"
                                  type="number"
                                  :label="carName"
                                  suffix="km"
                                  ref="carField"
                                  :placeholder="lastKm"
                    ></v-text-field>

                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="secondary" @click="presenter.cancelOdometer()">{{viewModel.cancelText}}</v-btn>
                    <v-btn type="submit" flat color="primary">{{viewModel.saveText}}</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { UpdateOdometerPresenterInterface } from '@/domain/Traveling/UseCase/UpdateOdometer/UpdateOdometerPresenterInterface';
  import { UpdateOdometer as UpdateOdometerUseCase } from '@/domain/Traveling/UseCase/UpdateOdometer/UpdateOdometer';
  import { UpdateOdometerRequest } from '@/domain/Traveling/UseCase/UpdateOdometer/UpdateOdometerRequest';
  import { UpdateOdometerController } from '@/domain/Traveling/UseCase/UpdateOdometer/UpdateOdometerController';

  @Component
  export default class UpdateOdometerView extends Vue {
    presenter: UpdateOdometerPresenterInterface = this.$travelingFactory.travelingHomePresenter;

    controller = new UpdateOdometerController(new UpdateOdometerUseCase(this.presenter!));
    viewModel = this.presenter!.getUpdateOdometerViewModel();

    carId = '';
    km = '';
    lastKm = '';
    carName = '';

    async saveOdometer() {
      this.controller.updateOdometer(new UpdateOdometerRequest(this.carId, this.km));
    }

    @Watch('viewModel.selectedCar')
    onPropertyChanged() {
      this.km = '';
      this.carId = `${this.viewModel.selectedCar ? this.viewModel.selectedCar.id : ''}`;
      this.carName = `${this.viewModel.selectedCar ? this.viewModel.selectedCar.name : ''}`;
      this.lastKm = `${this.viewModel.selectedCar ? this.viewModel.selectedCar.km : ''}`;
    }

    @Watch('viewModel.displayed') onDisplayChanged(displayed: boolean) {
      if (displayed) {
        setImmediate(() => {
          (this.$refs.carField as any).focus();
        });
      }
    }
  }
</script>
