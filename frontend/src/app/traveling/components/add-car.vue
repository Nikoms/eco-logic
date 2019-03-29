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
                    <v-text-field v-model="km" label="Km initial"></v-text-field>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="secondary" @click="cancel" v-if="canCancel">Cancel</v-btn>
                    <v-btn flat color="primary" @click="sendMessage">Add a car</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { Engine } from '@eco/core-travel/src/entity/Car';
  import { api } from '../../../../../api/frontend/src/Api';

  @Component
  export default class AddCarComponent extends Vue {
    name = '';
    consumption = '';
    km = '0';
    engine = Engine.gasoline;
    engines = [Engine.gasoline, Engine.diesel, Engine.CNG, Engine.LPG];

    @Prop()
    canCancel?: boolean;

    async sendMessage() {
      await api.addCar(this.name, parseFloat(this.consumption), this.engine, parseFloat(this.km));
      this.clearForm();
      this.$emit('added');
    }

    cancel() {
      this.$emit('cancel');
    }

    startEditing() {
      (this.$refs.name as any).focus();
    }

    clearForm() {
      this.consumption = '';
      this.name = '';
      this.km = '0';
      this.engine = Engine.gasoline;
    }
  }
</script>
