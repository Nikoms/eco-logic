<template>
    <v-data-table
            :headers="headers"
            :items="travels"
            class="elevation-1"
            hide-actions
    >
        <template slot="items" slot-scope="props">
            <td>
                <v-icon>{{ getIcon(props.item.type) }}</v-icon>
            </td>
            <td class="text-xs-right"><strong>{{ props.item.km }} km</strong></td>
            <td class="text-xs-right">{{ props.item.description }}</td>
            <td class="text-xs-right">{{ props.item.date }}</td>
        </template>
    </v-data-table>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { handle } from '@eco/infrastructure/src/handlers';
  import { Travel, TravelType } from '@eco/core-travel/src/entity/Travel';
  import { GetTravels } from '@eco/core-travel/src/interactor/GetTravels';

  @Component
  export default class ListTravels extends Vue {
    travels: Travel[] = [];
    headers = [
      { text: '', sortable: false },
      { text: 'Distance', sortable: false, value: 'km', align: 'right' },
      { text: 'Description', value: 'description', sortable: false, align: 'right' },
      { text: 'Date', value: 'date', align: 'right' },
    ];

    async mounted() {
      await this.refresh();
    }

    getIcon(type: TravelType) {
      return type === TravelType.car ? 'mdi-car' : 'mdi-airplane mdi-rotate-45';
    }

    async refresh() {
      this.travels = [];
      this.travels = await handle(new GetTravels());
    }
  }
</script>
