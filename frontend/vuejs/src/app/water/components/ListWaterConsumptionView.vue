<template>
    <v-data-table
            :headers="headers"
            :items="viewModel.consumptions"
            class="elevation-1"
            hide-actions
            :no-data-text="viewModel.noConsumptionsMessage"
    >
        <template slot="items" slot-scope="props">
            <td class="text-xs-right">{{ props.item.quantity }}</td>
            <td class="text-xs-right">{{ props.item.meterId }}</td>
            <td class="text-xs-right">{{ props.item.date }}</td>
        </template>
    </v-data-table>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class ListWaterConsumptionView extends Vue {
    viewModel = this.$water.viewModel;
    headers = [
      { value: 'quantity', text: this.viewModel.headerM3Label, sortable: false },
      { value: 'meterId', text: this.viewModel.headerMeterNameLabel, sortable: false },
      { value: 'date', text: this.viewModel.headerDateLabel, sortable: false },
    ];

    async mounted() {
      this.$water.controller.refreshConsumptions();
    }
  }
</script>
