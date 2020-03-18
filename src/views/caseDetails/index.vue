<template>
  <v-layout wrap pa-5>
    <v-fade-transition mode="out-in">
      <router-view style="margin-bottom: 76px" />
    </v-fade-transition>
    <v-bottom-navigation
      color="primary"
      fixed
    >
      <v-btn :to="{name: 'CasoPassos', params: $route.params}">
        <span>Passos</span>
        <v-icon>timeline</v-icon>
      </v-btn>

      <v-btn :to="{name: 'CasoGrupos', params: $route.params}">
        <span>Grupos</span>
        <v-icon>group</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script>
  export default {
    name: 'Tutorial',
    computed: {
      routePrefix() {
        return `/tutorias/${this.$route.params.tutorialID}/casos/${this.$route.params.caseID}`;
      },
    },
  };
</script>
