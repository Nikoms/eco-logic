<template>
    <div>
        <PowerConsumptionCharts/>
        <Chart></Chart>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import PowerConsumptionCharts from '@/components/electricity/power-consumption-charts.vue';
  import Chart from '@/components/Chart.vue';

  @Component({
    components: {
      Chart,
      PowerConsumptionCharts,
    },
  })
  export default class Home extends Vue {
  }
</script>
