<template>
    <div>
        <v-card
                class="mx-auto"
                color="grey lighten-4"
                max-width="600"
        >
            <v-card-title>
                <v-icon color="indigo" class="mr-5" size="64">mdi-flash</v-icon>
                <v-layout column align-start>
                    <div class="caption grey--text text-uppercase">
                        Average
                    </div>
                    <div>
                        <span class="display-2 font-weight-black" v-text="average || '—'"></span>
                        <strong v-if="average">kWh/day</strong>
                    </div>
                </v-layout>

                <v-spacer></v-spacer>
            </v-card-title>

            <v-sheet color="transparent">
                <v-sparkline v-if="values.length > 1"
                             :value="values"
                             :gradient="gradient"
                             :labels="labels"
                             line-width="2"
                             padding="16"
                             auto-draw>
                </v-sparkline>
                <span v-else-if="values.length === 1">Only 1 value inserted</span>
                <span v-else>Please insert a consumption</span>
            </v-sheet>
        </v-card>
    </div>
</template>


<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { handle } from '@/handlers';
  import { GetAllPowerConsumptions } from '../../../../application/src/interactor/electricity/GetAllPowerConsumptions';
  import { PowerConsumption } from '../../../../domain/src/electricity/entity/PowerConsumption';

  const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea']
  ];

  @Component()
  export default class PowerConsumptionCharts extends Vue {
    gradient = gradients[5];
    average = '123';
    values = [];
    labels = [];

    async mounted() {
      const consumptions = await handle<Promise<PowerConsumption[]>>(new GetAllPowerConsumptions());
      this.values = consumptions.map(c => c.kWh);
      this.labels = consumptions.map(c => c.date.getDate() + '/' + (c.date.getMonth() + 1));
    }
  }
</script>
