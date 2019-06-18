<template>
    <v-dialog v-model="viewModel.displayed" max-width="600px">
        <v-form @submit.prevent="updateConsumption">
            <v-card>
                <v-card-text>
                    <v-text-field v-model="kWh"
                                  type="number"
                                  :label="viewModel.meterName"
                                  :placeholder="viewModel.lastKWh"
                                  suffix="kWh"
                                  ref="consumptionField"
                    ></v-text-field>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="secondary" @click="$electricity.ui.cancelUpdatePowerConsumption()">Cancel</v-btn>
                    <v-btn type="submit" flat color="primary">Update consumption</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { UpdatePowerConsumptionRequest } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionRequest';

  @Component
  export default class UpdatePowerConsumptionView extends Vue {
    kWh = '';
    viewModel = this.$electricity.electricityPresenter.getUpdatePowerConsumptionViewModel();

    updateConsumption() {
      const request = new UpdatePowerConsumptionRequest(this.viewModel.electricMeterId, this.kWh);
      this.$electricity.controller.updatePowerConsumption(request);
    }

    @Watch('viewModel.displayed')
    onPropertyChanged(displayed: boolean) {
      if (displayed) {
        this.kWh = '';
        setImmediate(() => {
          (this.$refs.consumptionField as any).focus();
        });
      }
    }
  }
</script>
