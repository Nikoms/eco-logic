<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-data-iterator :items="travels" hide-actions>
        <template v-slot:item="props">
            <v-card class="mx-auto mb-3 mt-3" color="#26c6da" dark max-width="400">
                <v-card-title>
                    <v-icon large left>mdi-airplane mdi-rotate-45</v-icon>
                    <span class="title">{{ props.item.date.toLocaleDateString('fr') }}</span><span
                        class="title font-weight-light"> {{ props.item.description ? `: ${props.item.description}` : '' }}</span>
                </v-card-title>
                <v-card-text class="headline font-weight-bold text-xs-right">{{ props.item.km }} Km</v-card-text>
            </v-card>
        </template>
    </v-data-iterator>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { PlaneTravel } from '@eco/core-travel/src/entity/PlaneTravel';
  import { api } from '../../../../../api/frontend/src/Api';

  @Component
  export default class ListPlaneTravels extends Vue {
    travels: PlaneTravel[] = [];

    async mounted() {
      await this.refresh();
    }

    async refresh() {
      this.travels = await api.getPlaneTravels();
    }

  }
</script>
