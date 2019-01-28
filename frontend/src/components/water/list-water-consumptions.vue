<template>
    <div>
        <v-btn color="success" @click="refresh">Refresh</v-btn>
        <v-data-table
                :headers="headers"
                :items="consumptions"
                class="elevation-1"
                hide-actions
        >
            <template slot="items" slot-scope="props">
                <td class="text-xs-right">{{ props.item.m3 }}</td>
                <td class="text-xs-right">{{ props.item.date }}</td>
            </template>
        </v-data-table>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { handle } from '@/handlers';
  import { GetAllWaterConsumptions } from '../../../../application/src/interactor/water/GetAllWaterConsumptions';

  @Component
  export default class ListWaterConsumptions extends Vue {
    consumptions = [];
    headers = [
      {
        text: 'm3',
        sortable: false,
        value: 'm3'
      },
      { text: 'Date', value: 'date' },
    ];

    async mounted() {
      this.consumptions = await handle(new GetAllWaterConsumptions());
    }

    async refresh() {
      this.consumptions = [];
      this.consumptions = await handle(new GetAllWaterConsumptions());

    }
  }
</script>
