<template>
    <div>
        <v-data-iterator :items="odometers" hide-actions>
            <template v-slot:item="props">
                <v-card class="mx-auto mb-3 mt-3" color="#26c6da" dark max-width="400">
                    <v-card-title>
                        <v-icon large left>mdi-car</v-icon>
                        <span class="title font-weight-light">{{ props.item.name }}</span>
                    </v-card-title>
                    <v-card-text class="headline font-weight-bold text-xs-right">{{ props.item.km }} Km</v-card-text>
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

  @Component
  export default class ListCars extends Vue {
    odometers: Car[] = [];
    async mounted() {
      await this.refresh();
    }

    async refresh() {
      this.odometers = await handle<Car[]>(new GetCars());
    }
  }
</script>
