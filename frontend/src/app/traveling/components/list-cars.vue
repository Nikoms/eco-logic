<template>
    <div>
        <v-data-iterator :items="cars" hide-actions>
            <template v-slot:item="props">
                <v-card class="mx-auto mb-3 mt-3" color="#26c6da" dark max-width="400"
                        @click="careSelected(props.item)">
                    <v-card-title>
                        <v-flex class="text-xs-left title">{{ props.item.name }}</v-flex>
                        <span class="title font-weight-light text-xs-right">{{ props.item.km }} Km</span>
                    </v-card-title>
                </v-card>
            </template>
        </v-data-iterator>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { handle } from '@eco/infrastructure/src/handlers';
  import { Car } from '@eco/core-travel/src/entity/Car';
  import { GetCars } from '@eco/core-travel/src/interactor/GetCars';
  import SaveOdometer from '@/app/traveling/components/save-odometer.vue';

  @Component({
    components: { SaveOdometer },
  })
  export default class ListCars extends Vue {
    cars: Car[] = [];

    async mounted() {
      await this.refresh();
    }

    async refresh() {
      this.cars = await handle<Car[]>(new GetCars());
    }

    careSelected(car: Car) {
      this.$emit('selected', car);
    }
  }
</script>
