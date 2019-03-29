<template>
    <div>
        <div v-if="hasMeter">
            <ListPowerConsumptions ref="list" @selected="electricMeterSelected"/>
        </div>
        <div v-else>
            <InitPower @init="powerInitialized"/>
        </div>

        <v-dialog v-model="showDialog" max-width="600px">
            <UpdatePowerConsumption ref="form" @added="consumptionUpdated" @cancel="hideDialog"
                                    :electricMeter="selectedMeter"/>
        </v-dialog>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import UpdatePowerConsumption from '@/app/electricity/components/update-power-consumption.vue'; // @ is an alias to /src
  import ListPowerConsumptions from '@/app/electricity/components/list-electric-meters.vue';
  import InitPower from '@/app/electricity/components/init-power.vue';
  import { ElectricMeter } from '@eco/core-electricity/src/entity/ElectricMeter';
  import { api } from '../../../../../api/frontend/src/Api';

  @Component({
    components: {
      InitPower,
      UpdatePowerConsumption,
      ListPowerConsumptions,
    },
  })
  export default class PowerConsumption extends Vue {
    hasMeter = false;
    showDialog = false;
    selectedMeter: ElectricMeter | null = null;

    async mounted() {
      this.hasMeter = (await api.getElectricMeters()).length > 0;
    }

    powerInitialized() {
      this.hasMeter = true;
    }

    electricMeterSelected(electricMeter: ElectricMeter) {
      this.selectedMeter = electricMeter;
      setImmediate(() => {
        (this.$refs.form as UpdatePowerConsumption).startEditing();
      });
      this.showDialog = true;
    }

    hideDialog() {
      this.showDialog = false;
    }

    consumptionUpdated() {
      this.showDialog = false;
      (this.$refs.list as ListPowerConsumptions).refresh(); // En attendant redux/rematch
    }
  }
</script>
