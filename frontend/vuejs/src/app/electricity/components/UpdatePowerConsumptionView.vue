<template>
    <v-dialog v-model="viewModel.isFormDisplayed" max-width="600px">
        <v-form v-if="viewModel.isFormDisplayed"
                @submit.prevent="updateConsumption(viewModel.selectedMeter.id)">
            <v-card>
                <v-card-text>
                    <v-text-field v-model="kWh"
                                  type="number"
                                  :label="viewModel.selectedMeter.name"
                                  :placeholder="viewModel.selectedMeter.kWh"
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

  @Component
  export default class UpdatePowerConsumptionView extends Vue {
    kWh = '';
    viewModel = this.$electricity.viewModel;

    async updateConsumption(meterId: string) {
      await this.$electricity.controller.updatePowerConsumption(meterId, this.kWh);
    }

    @Watch('viewModel.isFormDisplayed')
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
