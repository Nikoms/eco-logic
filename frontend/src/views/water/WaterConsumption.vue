<template>
    <div>
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
    dialog = false;

    showDialog() {
      this.dialog = true;
      setImmediate(() => {
        (<any> this.$refs.form).startEditing();
      });
    }

    added() {
      this.dialog = false;
      (<any> this.$refs.list).refresh(); // En attendant redux/rematch
    }
  }
</script>
