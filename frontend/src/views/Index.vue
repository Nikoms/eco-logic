<template>
</template>


<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class Index extends Vue {
    mounted() {
      // Redirection pour la bottom-nav. Si une des rubriques pointe vers "/", il semblerait qu'elle soit toujours sélectionnée (dans la ui), même si on passe à une autre rubrique
      this.$router.push('home');
    }
  }
</script>
