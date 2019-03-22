<template>
    <div v-if="hasMeter">
        <ListPowerConsumptions ref="list"/>
    </div>
    <div v-else>
        <InitPower @init="powerInitialized"/>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import AddPowerConsumption from '@/app/electricity/components/update-power-consumption.vue';
  import ListPowerConsumptions from '@/app/electricity/components/list-electric-meters.vue';
  import InitPower from '@/app/electricity/components/init-power.vue';
  import { handle } from '@eco/infrastructure/src/handlers';
  import { ElectricMeter } from '@eco/core-electricity/src/entity/ElectricMeter';
  import { GetElectricMeters } from '@eco/core-electricity/src/interactor/GetElectricMeters'; // @ is an alias to /src

  @Component({
    components: {
      InitPower,
      AddPowerConsumption,
      ListPowerConsumptions,
    },
  })
  export default class PowerConsumption extends Vue {
    hasMeter = false;

    async mounted() {
      this.hasMeter = (await handle<ElectricMeter[]>(new GetElectricMeters())).length > 0;
    }

    powerInitialized() {
      this.hasMeter = true;
    }

    added() {
      (this.$refs.list as ListPowerConsumptions).refresh(); // En attendant redux/rematch
    }
  }
</script>
