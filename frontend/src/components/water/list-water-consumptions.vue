<template>
    <v-data-table
            :headers="headers"
            :items="consumptions"
            class="elevation-1"
            hide-actions
            no-data-text="No consumption for the moment. Don't forget to add yours quickly"
    >
        <template slot="items" slot-scope="props">
            <td class="text-xs-right">{{ props.item.m3 }}</td>
            <td class="text-xs-right">{{ props.item.waterMeter }}</td>
            <td class="text-xs-right">{{ props.item.date }}</td>
        </template>
    </v-data-table>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { handle } from '@/handlers';
  import { GetAllWaterConsumptions } from '@eco/core-water/src/interactor/GetAllWaterConsumptions';

  @Component
  export default class ListWaterConsumptions extends Vue {
    consumptions = [];
    headers = [
      {
        text: 'm3',
        sortable: false,
        value: 'm3',
      },
      { text: 'Meter', value: 'waterMeter', sortable: false },
      { text: 'Date', value: 'date' },
    ];

    async mounted() {
      await this.refresh();
    }

    async refresh() {
      this.consumptions = [];
      this.consumptions = await handle(new GetAllWaterConsumptions());
    }
  }
</script>
