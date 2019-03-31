<template>
    <v-form @submit.prevent="addCommand">
        <v-card>
            <v-card-text>
                <v-text-field v-model="liters"
                              type="number"
                              label="Liters"
                              placeholder="How much did your ordered"
                              suffix="liters"
                              ref="liters"
                ></v-text-field>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="secondary" @click="cancel">Cancel</v-btn>
                <v-btn type="submit" flat color="primary">Add command</v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { api } from '../../../../../api/frontend/src/Api';

  @Component({})
  export default class AddFuelOilCommand extends Vue {
    liters: string = '';

    mounted() {
    }

    addCommand() {
      api.commandFuelOil(parseFloat(this.liters));
      this.liters = '';
      this.$emit('added');
    }

    cancel() {
      this.liters = '';
      this.$emit('cancel');
    }

    startEditing() {
      (this.$refs.liters as any).focus();
    }

  }
</script>
