<template>
    <div>
        <v-form v-if="canAdd">
            <v-card>
                <v-card-text>
                    <v-select v-if="hasMultipleMeters"
                              item-text="name"
                              item-value="id"
                              return-object
                              v-model="selectedMeter" :items="meters" label="Electric meter"></v-select>

                    <v-text-field
                            v-model="consumption"
                            type="number"
                            label="Consumption"
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
    consumption = '';
    meters: ElectricMeter[] = [];
    selectedMeter?: ElectricMeter;
    hasMultipleMeters = false;
    canAdd = false;
    errorMessage = '';

    async saveConsumption() {
      if(this.selectedMeter){
        await handle(new Add(parseFloat(this.consumption), this.selectedMeter));
        this.clearForm();
        this.$emit('added');
      }
    }

    async mounted() {
      this.meters = await handle<ElectricMeter[]>(new GetElectricMeters());
      this.hasMultipleMeters = this.meters.length > 1;
      this.canAdd = this.meters.length > 0;
      if (this.canAdd) {
        this.selectedMeter = this.meters[0];
      } else {
        this.errorMessage = 'Please add an electric meter before adding (TODO, but in INIT app)';
      }
    }

    startEditing() {
      if (this.canAdd) {
        (<any> this.$refs.consumptionField).focus();
      }
    }


    clearForm() {
      this.consumption = '';
    }
  }
</script>
