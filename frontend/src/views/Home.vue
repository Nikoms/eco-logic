<template>
    <div>
        <PowerConsumptionCharts/>

        <v-dialog v-model="dialog" max-width="290">
            <v-card>
                <v-card-title class="headline">Do you have a day-night electric meters?</v-card-title>

                <v-card-text>In some house, you can have 2 electric meters, one for the night, the other for the day.
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-4" flat="flat" @click="initElectricMeter(true)">Day-night</v-btn>
                    <v-btn color="blue darken-4" flat="flat" @click="initElectricMeter(false)">Standard</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import PowerConsumptionCharts from '@/components/electricity/power-consumption-charts.vue';
  import { InitElectricMeter } from 'application/src/interactor/electricity/InitElectricMeter';
  import { handle } from '@/handlers';


  @Component({
    components: {
      PowerConsumptionCharts
    },
  })
  export default class Home extends Vue {
    dialog = false;

    mounted() {
      this.dialog = window.localStorage.getItem('electric-meter-is-set') === null;
    }

    async initElectricMeter(hasDayAndNightMeter: boolean) {
      this.dialog = false;
      window.localStorage.setItem('electric-meter-is-set', hasDayAndNightMeter.toString());
      await handle(new InitElectricMeter(hasDayAndNightMeter));
    }


  }
</script>
