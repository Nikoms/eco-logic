<template>
    <div>
        <v-card class="mx-auto mb-3 mt-3" color="#ff8000" dark max-width="400">
            <v-card-title>
                <v-icon large left>mdi-fuel</v-icon>
                <span class="title">Fuel oil commands</span>
                <v-spacer></v-spacer>
                <v-btn flat icon @click="showAdd">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-card-title>
        </v-card>
        <v-card v-if="lastCommand !== null"class="mx-auto mb-3 mt-3" color="#26c6da" dark max-width="400">
            <v-card-title>
                <span class="title font-weight-light">Last order: </span><span
                    class="title">{{lastCommand.liters}} liters</span>
            </v-card-title>
            <v-card-text class="headline font-weight-bold text-xs-right">{{lastCommand.date.toLocaleDateString('fr')}}</v-card-text>
        </v-card>
        <v-dialog v-model="addDialog" max-width="600px">
            <AddFuelOilCommand @added="added" @cancel="cancelled" ref="addForm"/>
        </v-dialog>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import AddFuelOilCommand from '@/app/fuel-oil/components/add-fuel-oil-command.vue';
  import { api } from '../../../../../api/frontend/src/Api';
  import { FuelOilCommand } from '@eco/fuel-oil/src/entity/FuelOilCommand';

  @Component({
    components: { AddFuelOilCommand },
  })

  export default class TravelingConsumption extends Vue {
    addDialog = false;
    lastCommand: FuelOilCommand | null = null;

    mounted() {
      this.refreshView();
    }

    private async refreshView() {
      const lastCommand = await api.getLastFuelOilCommand();
      this.lastCommand = lastCommand || null;
    }

    added() {
      this.addDialog = false;
      this.refreshView();
    }

    cancelled() {
      this.addDialog = false;
    }

    showAdd() {
      this.addDialog = true;
      setImmediate(() => {
        (this.$refs.addForm as AddFuelOilCommand).startEditing();
      });
    }
  }
</script>
