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

  @Component
  export default class ListWaterConsumption extends Vue {
    consumptions = [];

    async refresh() {
      this.consumptions = [];

      const rawResponse = await fetch('http://localhost:3000/water-consumption', {
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
