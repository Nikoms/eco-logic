<template>
    <div>
        <PowerConsumptionCharts/>
        <Chart></Chart>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import PowerConsumptionCharts from '@/app/electricity/components/power-consumption-charts.vue';
  import Chart from '@/app/common/components/chart/Chart.vue';

  @Component({
    components: {
      Chart,
      PowerConsumptionCharts,
    },
  })
  export default class Home extends Vue {
  }
</script>
