<template>
    <v-data-table
            :headers="headers"
            :items="consumptions"
            class="elevation-1"
            hide-actions
            no-data-text="No consumption for the moment. Don't forget to add yours quickly"
    >
        <template slot="items" slot-scope="props">
            <td class="text-xs-right">{{ props.item.kWh }}</td>
            <td class="text-xs-right">{{ props.item.electricMeter }}</td>
            <td class="text-xs-right">{{ props.item.date }}</td>
        </template>
    </v-data-table>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { handle } from '@/handlers';
  import { GetAllPowerConsumptions } from '@eco/core-electricity/src/interactor/GetAllPowerConsumptions';

  @Component
  export default class ListPowerConsumptions extends Vue {
    consumptions = [];
    headers = [
      {
        text: 'kWh',
        sortable: false,
        value: 'kWh'
      },
      { text: 'Meter', value: 'electricMeter', sortable: false },
      { text: 'Date', value: 'date' },
    ];

    async mounted() {
      await this.refresh();
    }

    async refresh() {
      this.consumptions = [];
      this.consumptions = await handle(new GetAllPowerConsumptions());
    }
  }
</script>
