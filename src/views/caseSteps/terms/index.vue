<template>
  <v-layout wrap pa-5>
    <v-fade-transition mode="out-in">
      <router-view style="margin-bottom: 76px" />
    </v-fade-transition>
    <v-bottom-navigation
      v-model="bottomNav"
      color="primary"
      fixed
    >
      <v-btn :to="`${routePrefix}/individual`">
        <span>Individual</span>
        <v-icon>person</v-icon>
      </v-btn>

      <v-btn :to="`${routePrefix}/geral`">
        <span>Grupos</span>
        <v-icon>trophy</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script>
  export default {
    name: 'Step1',
    data: () => ({
      bottomNav: 0,
    }),
    computed: {
      routePrefix() {
        return `/tutorias/${this.$route.params.tutorialID}/casos/${this.$route.params.caseID}/steps/1`;
      },
    },
  };
</script>
