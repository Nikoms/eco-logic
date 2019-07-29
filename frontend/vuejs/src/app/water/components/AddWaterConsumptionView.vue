<template>
    <v-dialog v-model="viewModel.displayed" max-width="600px">
        <v-form v-if="viewModel.hasMeters"
                @submit.prevent="$water.controller.addConsumption(forms)">
            <v-card>
                <v-card-text>
                    <v-text-field v-for="(form, index) in forms" :key="viewModel.meters[index].id"
                                  v-model="form.quantity"
                                  type="number"
                                  :label="form.name"
                                  suffix="m3"
                                  ref="consumptionField"
                    ></v-text-field>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="secondary" @click="$water.presenter.hideAddWaterConsumption()">
                        Cancel
                    </v-btn>
                    <v-btn type="submit" flat color="primary">Save consumption</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
        <v-alert v-else value="true" color="error" icon="warning" outline>{{viewModel.errorMessage}}</v-alert>
    </v-dialog>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { WaterMeter } from '@eco/domain';

  type WaterForm = { meterId: string, quantity: string, name: string };
  @Component
  export default class AddWaterConsumptionView extends Vue {
    viewModel = this.$water.viewModel;
    forms: WaterForm[] = [];

    @Watch('viewModel.displayed') onDisplayedChanged(newValue: boolean) {
      if (newValue) {
        this.forms = this.viewModel.meters.map((meter: WaterMeter) => ({
          meterId: meter.id,
          name: meter.name,
          quantity: '',
        }));

        setTimeout(() => {
          const consumptionFields = this.$refs.consumptionField as any[];
          if (consumptionFields.length > 0) {
            consumptionFields[0].focus();
          }
        },0);
      }
    }
  }
</script>
