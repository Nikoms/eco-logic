<template>
    <div>
        <v-form v-if="canAdd">
            <v-card>
                <v-card-text>
                    <v-text-field v-for="(formMeter, index) in formMeters" :key="formMeter.id"
                                  v-model="formMeters[index].consumption"
                                  type="number"
                                  :label="formMeter.meter.name"
                                  suffix="kWh"
                                  ref="consumptionField"
                    ></v-text-field>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="saveConsumption">Save consumption</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
        <v-alert v-else value="true" color="error" icon="warning" outline>{{errorMessage}}</v-alert>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { AddPowerConsumption as Add } from '@eco/application/src/interactor/electricity/AddPowerConsumption';
  import { handle } from '@/handlers';
  import { GetElectricMeters } from '@eco/application/src/interactor/electricity/GetElectricMeters';
  import { ElectricMeter } from '@eco/domain/src/electricity/entity/ElectricMeter';

  @Component
  export default class AddPowerConsumption extends Vue {
    formMeters: { meter: ElectricMeter, consumption: string }[] = [];
    meters: ElectricMeter[] = [];
    hasMultipleMeters = false;
    canAdd = false;
    errorMessage = '';

    async saveConsumption() {
      for (const formMeter of this.formMeters) {
        if (formMeter.consumption.trim().length > 0) {
          await handle(new Add(parseFloat(formMeter.consumption), formMeter.meter));
        }
      }
      this.clearForm();
      this.$emit('added');
    }

    async mounted() {
      this.meters = await handle<ElectricMeter[]>(new GetElectricMeters());
      this.clearForm();
      this.hasMultipleMeters = this.meters.length > 1;
      this.canAdd = this.meters.length > 0;
      if (!this.canAdd) {
        this.errorMessage = 'Please add an electric meter before adding (TODO, but in INIT app)';
      }
    }

    startEditing() {
      if (this.canAdd) {
        (this.$refs['consumptionField'] as any)[0].focus();
      }
    }

    clearForm() {
      this.formMeters = this.meters.map(meter => ({ meter, consumption: '' }));
    }
  }
</script>
