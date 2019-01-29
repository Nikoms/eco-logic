<template>
    <div>
        <v-fab-transition>
            <v-btn
                    style="bottom: 70px"
                    color="indigo"
                    key="add"
                    dark
                    fab
                    fixed
                    bottom
                    right
                    @click="dialog = !dialog"
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-fab-transition>

        <ListPowerConsumptions ref="list"/>
        <v-dialog v-model="dialog" max-width="600px">
            <AddPowerConsumption @added="added"/>
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

    added() {
      this.dialog = false;
      (<any> this.$refs.list).refresh(); // En attendant redux/rematch
    }
  }
</script>
