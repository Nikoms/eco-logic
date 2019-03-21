<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-data-iterator :items="travels" hide-actions>
        <template v-slot:item="props">
            <v-card class="mx-auto mb-3 mt-3" color="#ff8000" dark max-width="400">
                <v-card-title>
                    <v-icon large left>mdi-airplane mdi-rotate-45</v-icon>
                    <span class="title">{{ props.item.date.toLocaleDateString('fr') }}</span><span class="title font-weight-light"> {{ props.item.description ? `: ${props.item.description}` : '' }}</span>
                </v-card-title>
                <v-card-text class="headline font-weight-bold text-xs-right">{{ props.item.km }} Km</v-card-text>
            </v-card>
        </template>
    </v-data-iterator>
    <!--<v-data-table-->
    <!--:headers="headers"-->
    <!--:items="travels"-->
    <!--class="elevation-1"-->
    <!--hide-actions-->
    <!--&gt;-->
    <!--<template slot="items" slot-scope="props">-->
    <!--<td>-->
    <!--<v-icon>mdi-airplane mdi-rotate-45</v-icon>-->
    <!--</td>-->
    <!--<td class="text-xs-right"><strong>{{ props.item.km }} km</strong></td>-->
    <!--<td class="text-xs-right">{{ props.item.description }}</td>-->
    <!--<td class="text-xs-right">{{ props.item.date }}</td>-->
    <!--</template>-->
    <!--</v-data-table>-->
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { handle } from '@eco/infrastructure/src/handlers';
  import { PlaneTravel } from '@eco/core-travel/src/entity/PlaneTravel';
  import { GetPlaneTravels } from '@eco/core-travel/src/interactor/GetPlaneTravels';

  @Component
  export default class ListPlaneTravels extends Vue {
    travels: PlaneTravel[] = [];
    dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    headers = [
      { text: '', sortable: false },
      { text: 'Distance', sortable: false, value: 'km', align: 'right' },
      { text: 'Description', value: 'description', sortable: false, align: 'right' },
      { text: 'Date', value: 'date', align: 'right' },
    ];

    async mounted() {
      await this.refresh();
    }

    async refresh() {
      this.travels = [];
      this.travels = await handle(new GetPlaneTravels());
    }
  }
</script>
