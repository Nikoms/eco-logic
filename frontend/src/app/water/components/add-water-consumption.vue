<template>
    <div>
        <v-form v-if="canAdd" @submit.prevent="saveConsumption">
            <v-card>
                <v-card-text>
                    <v-text-field v-for="(formMeter, index) in formMeters" :key="formMeter.id"
                                  v-model="formMeters[index].consumption"
                                  type="number"
                                  :label="formMeter.meter.name"
                                  suffix="m3"
                                  ref="consumptionField"
                    ></v-text-field>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn type="submit" flat color="primary" @click="saveConsumption">Save consumption</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
        <v-alert v-else value="true" color="error" icon="warning" outline>{{errorMessage}}</v-alert>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { WaterMeter } from '@eco/core-water/src/entity/WaterMeter';
  import { AddWaterConsumptionRequest } from '@eco/core-water/src/use-case/AddWaterConsumption';
  import { addWaterConsumption, getWaterMeters } from '@eco/infrastructure/src/di';

  @Component
  export default class AddWaterConsumption extends Vue {
    formMeters: { meter: WaterMeter, consumption: string }[] = [];
    meters: WaterMeter[] = [];
    hasMultipleMeters = false;
    canAdd = false;
    errorMessage = '';

    async saveConsumption() {
      for (const formMeter of this.formMeters) {
        if (formMeter.consumption.trim().length > 0) {
          await addWaterConsumption.execute(new AddWaterConsumptionRequest(parseFloat(formMeter.consumption), formMeter.meter));
        }
      }
      this.clearForm();
      this.$emit('added');
    }

    async mounted() {
      this.meters = await getWaterMeters.execute();
      this.clearForm();
      this.hasMultipleMeters = this.meters.length > 1;
      this.canAdd = this.meters.length > 0;
      if (!this.canAdd) {
        this.errorMessage = 'Please add a water meter before adding (TODO, but in INIT app)';
      }
    }

    startEditing() {
      if (this.canAdd) {
        (this.$refs.consumptionField as any)[0].focus();
      }
    }

    clearForm() {
      this.formMeters = this.meters.map(meter => ({ meter, consumption: '' }));
    }
  }
</script>
