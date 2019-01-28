<template>
    <div>
        <v-form v-if="canAdd">
            <v-container>
                <v-layout>
                    <v-flex xs12 md4 v-if="hasMultipleMeters">
                        <v-select
                                item-text="name"
                                item-value="id"
                                return-object
                                :value="selectedMeter" :items="meters" label="Electric meter"></v-select>
                    </v-flex>

                    <v-flex xs12 md4>
                        <v-text-field
                                v-model="consumption"
                                type="number"
                                label="Consumption"
                                suffix="kWh"
                                :append-outer-icon="consumption ? 'mdi-send' : 'mdi-microphone'"
                                @click:append-outer="sendMessage"
                        ></v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
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

    clearMessage() {
      this.consumption = '';
    }
  }
</script>
