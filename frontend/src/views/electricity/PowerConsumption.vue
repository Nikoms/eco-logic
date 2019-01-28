<template>
    <div class="power-consumption">
        Please add your latest Power Consumption below
        <AddPowerConsumption/>
        <ListPowerConsumptions/>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import AddPowerConsumption from '@/components/electricity/add-power-consumption.vue';
  import ListPowerConsumptions from '@/components/electricity/list-power-consumptions.vue'; // @ is an alias to /src

  @Component({
    components: {
      AddPowerConsumption, ListPowerConsumptions,
    },
  })
  export default class PowerConsumption extends Vue {
  }
</script>
