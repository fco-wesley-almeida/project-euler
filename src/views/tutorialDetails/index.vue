<template>
  <v-layout wrap pa-5 fill-height>
  <v-fade-transition mode="out-in">
    <router-view style="margin-bottom: 76px" />
  </v-fade-transition>
  <v-bottom-navigation
    v-model="bottomNav"
    background-color="secondary"
    color="primary"
    fixed
  >
    <v-btn :to="`${routePrefix}/informacoes`">
      <span>Informações</span>
      <v-icon>info</v-icon>
    </v-btn>

    <v-btn :to="`${routePrefix}/casos`">
      <span>Casos</span>
      <v-icon>list</v-icon>
    </v-btn>

    <v-btn :to="`${routePrefix}/notas`">
      <span>Notas</span>
      <v-icon>assignment_turned_in</v-icon>
    </v-btn>

    <v-btn :to="`${routePrefix}/participantes`">
      <span>Participantes</span>
      <v-icon>group</v-icon>
    </v-btn>
  </v-bottom-navigation>
  </v-layout>
</template>

<script>
export default {
  name: 'Tutorial',
  data: () => ({
    bottomNav: 0,
  }),
  computed: {
    routePrefix() {
      return `/tutorias/${this.$route.params.tutorialID}`;
    },
  },
};
</script>
