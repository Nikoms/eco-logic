<template>
    <div class="water-consumption">
        Please add your latest Water Consumption below
        <AddWaterConsumption/>
        <ListWaterConsumptions/>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import AddWaterConsumption from '@/components/water/add-water-consumption.vue';
  import ListWaterConsumptions from '@/components/water/list-water-consumptions.vue'; // @ is an alias to /src

  @Component({
    components: {
      AddWaterConsumption, ListWaterConsumptions,
    },
  })
  export default class WaterConsumption extends Vue {
  }
</script>
