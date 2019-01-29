<template>
    <v-app>
        <v-toolbar app>
            <v-toolbar-title class="headline text-uppercase">
                <span>eco</span>
                <span class="font-weight-light">logic</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>

        <v-content>
            <router-view/>
        </v-content>

        <v-bottom-nav
                :value="true"
                absolute
                color="transparent">
            <v-btn color="teal" flat :to="{ name: 'home'}">
                <span>Home</span>
                <v-icon>mdi-home</v-icon>
            </v-btn>
            <v-btn color="teal" flat :to="{ name: 'power-consumption'}">
                <span>Electricity</span>
                <v-icon>mdi-flash</v-icon>
            </v-btn>
            <v-btn color="teal" flat :to="{ name: 'water-consumption'}">
                <span>Water</span>
                <v-icon>mdi-water</v-icon>
            </v-btn>
            <v-btn color="teal" flat :to="{ name: 'traveling-consumption'}">
                <span>Travel</span>
                <v-icon>mdi-gas-station</v-icon>
            </v-btn>
        </v-bottom-nav>
    </v-app>
</template>

<script>
    export default {
        name: 'App',
        components: {},
        data() {
            return {};
        },
    };
</script>
