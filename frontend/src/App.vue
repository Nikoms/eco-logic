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

        <v-bottom-nav app
                :value="true"
                fixed
                >
            <v-btn color="teal" flat :to="{ name: 'home'}">
                <span>Home</span>
                <v-icon>mdi-home</v-icon>
            </v-btn>
            <v-btn color="teal" flat :to="{ name: 'traveling'}">
                <span>Travel</span>
                <v-icon>mdi-map-marker-multiple</v-icon>
            </v-btn>
            <v-btn color="teal" flat :to="{ name: 'electricity'}">
                <span>Electricity</span>
                <v-icon>mdi-flash</v-icon>
            </v-btn>
            <v-btn color="teal" flat :to="{ name: 'fuel-oil'}">
                <span>Fuel oil</span>
                <v-icon>mdi-fuel</v-icon>
            </v-btn>
            <v-btn color="teal" flat :to="{ name: 'water'}">
                <span>Water</span>
                <v-icon>mdi-water</v-icon>
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
