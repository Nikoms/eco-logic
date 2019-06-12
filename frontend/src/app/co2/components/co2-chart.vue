<template>
    <div>
        <v-card
                class="mx-auto"
                color="grey lighten-4"
                max-width="600"
        >
            <v-card-title>
                <v-icon color="indigo" class="mr-5" size="64">mdi-periodic-table-co2</v-icon>
                <v-layout column align-start>
                    <div class="caption grey--text text-uppercase">
                        Average
                    </div>
                    <div>
                        <span class="display-2 font-weight-black" v-text="average || '—'"></span>
                        <strong v-if="average">kg/day</strong>
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
                <span v-else>Continue to insert consumption! Results will follow</span>
            </v-sheet>
        </v-card>
    </div>
</template>


<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { api } from '@/infrastructure/Api';

  const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
  ];

  @Component({})
  export default class Co2Chart extends Vue {
    gradient = gradients[5];
    average = 0;
    values: number[] = [];
    labels: string[] = [];

    getDatesBetween(startDate: Date, endDate: Date) {
      const dates = [];

      // Strip hours minutes seconds etc.
      let currentDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
      );

      while (currentDate <= endDate) {
        dates.push(currentDate);

        currentDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 1, // Will increase month if over range
        );
      }

      return dates;
    }

    async mounted() {
      const carbons = await api.getCarbons();
      if (carbons.length > 0) {
        const rangeOfDates = this.getDatesBetween(carbons[0].date, carbons[carbons.length - 1].date);
        const dates = [];
        let totalKg = 0;
        for (const date of rangeOfDates) {
          const carbonsOfDay = carbons.filter(c => {
            return c.date.getFullYear() === date.getFullYear()
              && c.date.getMonth() === date.getMonth()
              && c.date.getDate() === date.getDate();
          });

          const kg = carbonsOfDay.reduce((total, c) => total + c.kg, 0);
          dates.push({
            date,
            kg,
          });
          totalKg += kg;
        }

        this.values = dates.map(summary => summary.kg);
        this.labels = dates.map(summary => summary.date.getDate() + '/' + (summary.date.getMonth() + 1));
        this.average = Math.round(totalKg / rangeOfDates.length);
      }
    }

  }
</script>
