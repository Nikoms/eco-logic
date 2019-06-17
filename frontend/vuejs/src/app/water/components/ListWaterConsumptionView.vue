<template>
    <v-data-table
            :headers="headers"
            :items="viewModel.consumptions"
            class="elevation-1"
            hide-actions
            :no-data-text="viewModel.noConsumptionsMessage"
    >
        <template slot="items" slot-scope="props">
            <td class="text-xs-right">{{ props.item.m3 }}</td>
            <td class="text-xs-right">{{ props.item.waterMeterId }}</td>
            <td class="text-xs-right">{{ props.item.date }}</td>
        </template>
    </v-data-table>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class ListWaterConsumptionView extends Vue {
    viewModel = this.$water.listConsumptionsPresenter.getViewModel();
    headers = [
      {
        text: this.viewModel.headerM3Label,
        sortable: false,
        value: 'm3',
      },
      { text: this.viewModel.headerMeterNameLabel, value: 'waterMeter', sortable: false },
      { text: this.viewModel.headerDateLabel, value: 'date' },
    ];

    async mounted() {
      this.$water.controller.refreshConsumptions();
    }
  }
</script>
