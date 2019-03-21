<template>
    <div v-if="hasMeter">
        <v-btn
                style="bottom: 70px"
                color="indigo"
                key="add"
                dark
                fab
                fixed
                bottom
                right
                @click="showDialog">
            <v-icon>mdi-plus</v-icon>
        </v-btn>

        <ListPowerConsumptions ref="list"/>
        <v-dialog v-model="dialog" max-width="600px">
            <AddPowerConsumption ref="form" @added="added"/>
        </v-dialog>
    </div>
    <div v-else>
        <InitPower @init="powerInitialized"/>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import AddPowerConsumption from '@/components/electricity/add-power-consumption.vue';
  import ListPowerConsumptions from '@/components/electricity/list-power-consumptions.vue';
  import InitPower from '@/components/electricity/init-power.vue';
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
    dialog = false;
    hasMeter = false;

    async mounted() {
      this.hasMeter = (await handle<ElectricMeter[]>(new GetElectricMeters())).length > 0;
    }

    powerInitialized() {
      this.hasMeter = true;
    }

    showDialog() {
      this.dialog = true;
      setImmediate(() => {
        (this.$refs.form as AddPowerConsumption).startEditing();
      });
    }

    added() {
      this.dialog = false;
      (this.$refs.list as ListPowerConsumptions).refresh(); // En attendant redux/rematch
    }
  }
</script>
