<template>
    <v-dialog v-model="viewModel.displayed" max-width="600px">
        <v-form v-if="viewModel.hasMeters"
                @submit.prevent="$water.addConsumptionController.addConsumption(forms)">
            <v-card>
                <v-card-text>
                    <v-text-field v-for="(form, index) in forms" :key="viewModel.meters[index].id"
                                  v-model="form.m3"
                                  type="number"
                                  :label="viewModel.meters[index].name"
                                  suffix="m3"
                                  ref="consumptionField"
                    ></v-text-field>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn type="submit" flat color="primary">Save consumption</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
        <v-alert v-else value="true" color="error" icon="warning" outline>{{viewModel.errorMessage}}</v-alert>
    </v-dialog>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { AddConsumptionRequest } from '@/domain/Water/UseCase/AddConsumption/AddConsumptionRequest';

  @Component
  export default class AddWaterConsumptionView extends Vue {
    presenter = this.$water.addConsumptionPresenter;
    viewModel = this.$water.addConsumptionPresenter.getViewModel();
    forms: AddConsumptionRequest[] = [];

    @Watch('viewModel.displayed') onDisplayedChanged(newValue: boolean) {
      if (newValue) {
        this.forms = this.viewModel.meters.map(meter => new AddConsumptionRequest(meter.id, ''));
        setImmediate(() => {
          const consumptionFields = this.$refs.consumptionField as any[];
          if (consumptionFields.length > 0) {
            consumptionFields[0].focus();
          }
        });
      }
    }
  }
</script>
