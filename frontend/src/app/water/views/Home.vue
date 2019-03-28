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
  import AddWaterConsumption from '@/app/water/components/add-water-consumption.vue';
  import ListWaterConsumptions from '@/app/water/components/list-water-consumptions.vue';
  import InitWater from '@/app/water/components/init-water.vue';
  import { getWaterMeters } from '@eco/infrastructure/src/di'; // @ is an alias to /src

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
      this.hasMeter = (await getWaterMeters.execute()).length > 0;
    }

    showDialog() {
      this.dialog = true;
      setImmediate(() => {
        (this.$refs.form as AddWaterConsumption).startEditing();
      });
    }

    added() {
      this.dialog = false;
      (this.$refs.list as ListWaterConsumptions).refresh(); // En attendant redux/rematch
    }

    waterInitialized() {
      this.hasMeter = true;
    }
  }
</script>
