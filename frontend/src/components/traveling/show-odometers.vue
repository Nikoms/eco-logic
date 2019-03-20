<template>
    <v-data-table
            :headers="headers"
            :items="odometers"
            class="elevation-1"
            hide-actions
    >
        <template slot="items" slot-scope="props">
            <td>{{ props.item.carName }}</td>
            <td class="text-xs-right"><strong>{{ props.item.km }}</strong></td>
            <td class="text-xs-right">{{ props.item.date }}</td>
        </template>
    </v-data-table>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { handle } from '@/handlers';
  import { Car } from '@eco/core-travel/src/entity/Car';
  import { GetCars } from '@eco/core-travel/src/interactor/GetCars';
  import { Odometer } from '@eco/core-travel/src/entity/Odometer';
  import { GetLastOdometer } from '@eco/core-travel/src/interactor/GetLastOdometer';

  @Component
  export default class ShowOdometers extends Vue {
    odometers: any[] = [];
    headers = [
      { text: 'Car', sortable: false },
      { text: 'km', sortable: false },
      { text: 'Date', sortable: false },
    ];

    async mounted() {
      await this.refresh();
    }

    async refresh() {
      this.odometers = [];
      const cars = await handle<Car[]>(new GetCars());
      for (const car of cars) {
        const lastOdometer = await handle<Odometer | undefined>(new GetLastOdometer(car.id));
        if (lastOdometer) {
          this.odometers.push({
            carName: car.name,
            km: lastOdometer.km + ' km',
            date: lastOdometer.date.toISOString(),
          });
        } else {
          this.odometers.push({ carName: car.name, km: '-', date: '-' });
        }
      }
    }
  }
</script>
