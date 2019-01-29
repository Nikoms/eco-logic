<template>
    <div>
        <v-form>
            <v-card>
                <v-card-title>
                    <v-icon large left>mdi-car</v-icon>
                    <span class="title font-weight-light">Add a car</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="name" label="Name" ref="name"></v-text-field>
                    <v-text-field v-model="consumption" type="number" label="Consumption" suffix="l/100"></v-text-field>
                    <v-select v-model="engine" :items="engines" label="Engine"></v-select>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="sendMessage">Add a car</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { handle } from '@/handlers';
  import { AddCar } from '@eco/application/src/interactor/travel/AddCar';
  import { Engine } from '@eco/domain/src/traveling/entity/Car';

  @Component
  export default class AddCarComponent extends Vue {
    name = '';
    consumption = '';
    engine = Engine.gasoline;
    engines = [Engine.gasoline, Engine.diesel, Engine.CNG, Engine.LPG];

    async sendMessage() {
      await handle(new AddCar(this.name, parseFloat(this.consumption), this.engine));
      this.clearMessage();
      this.$emit('added');
    }

    startEditing() {
      (<any> this.$refs.name).focus();
    }

    clearMessage() {
      this.consumption = '';
      this.name = '';
      this.engine = Engine.gasoline;
    }
  }
</script>
