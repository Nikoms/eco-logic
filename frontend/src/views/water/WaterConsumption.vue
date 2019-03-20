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

        <ListWaterConsumptions ref="list"/>
        <v-dialog v-model="dialog" max-width="600px">
            <AddWaterConsumption ref="form" @added="added"/>
        </v-dialog>

    </div>
    <div v-else>
        <InitWater @init="waterInitialized"/>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import AddWaterConsumption from '@/components/water/add-water-consumption.vue';
  import ListWaterConsumptions from '@/components/water/list-water-consumptions.vue';
  import InitWater from '@/components/water/init-water.vue';
  import { handle } from '@/handlers';
  import { WaterMeter } from '@eco/core-water/src/entity/WaterMeter';
  import { GetWaterMeters } from '@eco/core-water/src/interactor/GetWaterMeters'; // @ is an alias to /src

  @Component({
    components: {
      InitWater,
      AddWaterConsumption, ListWaterConsumptions,
    },
  })
  export default class WaterConsumption extends Vue {
    dialog = false;
    hasMeter = false;

    async mounted() {
      this.hasMeter = (await handle<WaterMeter[]>(new GetWaterMeters())).length > 0;
    }

    showDialog() {
      this.dialog = true;
      setImmediate(() => {
        (this.$refs.form as any).startEditing();
      });
    }

    added() {
      this.dialog = false;
      (this.$refs.list as any).refresh(); // En attendant redux/rematch
    }

    waterInitialized() {
      this.hasMeter = true;
    }
  }
</script>
