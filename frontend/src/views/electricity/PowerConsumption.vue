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

        <ListPowerConsumptions ref="list"/>
        <v-dialog v-model="dialog" max-width="600px">
            <AddPowerConsumption ref="form" @added="added"/>
        </v-dialog>

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
    dialog = false;

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
  }
</script>
