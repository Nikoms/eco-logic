<template>
    <div>
        <PowerConsumptionCharts/>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import PowerConsumptionCharts from '@/components/electricity/power-consumption-charts.vue';


  @Component({
    components: {
      PowerConsumptionCharts
    },
  })
  export default class Hom extends Vue {

  }
</script>
