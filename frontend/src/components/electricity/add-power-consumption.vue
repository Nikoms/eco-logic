<template>
    <div>
        <v-form v-if="canAdd">
            <v-card>
                <v-card-text>
                    <v-select v-if="hasMultipleMeters"
                              item-text="name"
                              item-value="id"
                              return-object
                              :value="selectedMeter" :items="meters" label="Electric meter"></v-select>

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
                    <v-btn flat color="primary" @click="sendMessage">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
        <v-alert v-else value="true" color="error" icon="warning" outline>{{errorMessage}}</v-alert>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { AddPowerConsumption as Add } from '../../../../application/src/interactor/electricity/AddPowerConsumption';
  import { handle } from '@/handlers';
  import { GetElectricMeters } from '../../../../application/src/interactor/electricity/GetElectricMeters';
  import ElectricMeter from '../../../../domain/src/electricity/entity/ElectricMeter';

  @Component
  export default class AddPowerConsumption extends Vue {
    consumption = '';
    meters: ElectricMeter[] = [];
    selectedMeter = '';
    hasMultipleMeters = false;
    canAdd = false;
    errorMessage = '';

    async sendMessage() {
      await handle(new Add(parseFloat(this.consumption), this.selectedMeter));
      this.clearMessage();
      this.$emit('added');
    }

    async mounted() {
      this.meters = await handle<ElectricMeter[]>(new GetElectricMeters());
      this.hasMultipleMeters = this.meters.length > 1;
      this.canAdd = this.meters.length > 0;
      if (this.canAdd) {
        this.selectedMeter = this.meters[0].id;
      } else {
        this.errorMessage = 'Please add an electric meter before adding (TODO, but in INIT app)';
      }
    }

    startEditing() {
      (<any> this.$refs.consumptionField).focus();
    }


    clearMessage() {
      this.consumption = '';
    }
  }
</script>
