<template>
    <div>
        <v-speed-dial
                style="bottom: 70px"
                v-model="fab"
                fab
                fixed
                bottom
                right
                direction="top"
                transition="slide-y-reverse-transition"
        >
            <v-btn slot="activator" v-model="fab" color="blue darken-2" dark fab>
                <v-icon>mdi-plus</v-icon>
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-btn fab dark small color="green">
                <v-icon>mdi-car</v-icon>
            </v-btn>
            <v-btn fab dark small color="indigo">
                <v-icon>mdi-airplane</v-icon>
            </v-btn>
            <v-btn fab dark small color="red">
                <v-icon>mdi-settings</v-icon>
            </v-btn>
        </v-speed-dial>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class TravelingConsumption extends Vue {
    fab = null;
  }
</script>
