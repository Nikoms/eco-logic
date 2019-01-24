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
                <td class="text-xs-right">{{ props.item.kWh }}</td>
                <td class="text-xs-right">{{ props.item.date }}</td>
            </template>
        </v-data-table>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class ListPowerConsumption extends Vue {
    consumptions = [];
    headers = [
      {
        text: 'kWh',
        sortable: false,
        value: 'kWh'
      },
      { text: 'Date', value: 'date' },
    ];

    async refresh() {
      this.consumptions = [];

      const rawResponse = await fetch('http://localhost:3000/power-consumption', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      this.consumptions = await rawResponse.json();

    }
  }
</script>
