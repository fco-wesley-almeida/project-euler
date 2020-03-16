<template>
  <v-layout wrap pa-5>
    <v-fade-transition mode="out-in">
      <router-view :participants="participants" :tutorialCase="tutorialCase" style="margin-bottom: 76px" />
    </v-fade-transition>
    <v-bottom-navigation
      v-model="bottomNav"
      color="primary"
      fixed
    >
      <v-btn :to="{ name: 'TermosIndividual', params: this.$route.params }">
        <span>Individual</span>
        <v-icon>person</v-icon>
      </v-btn>

      <v-btn v-if="hasRanking" :to="{ name: 'TermosGeral', params: this.$route.params }">
        <span>Geral</span>
        <v-icon>view_list</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script>
  export default {
    name: 'Step1',
    data: () => ({
      bottomNav: 0,
      activationDialog: false,
    }),
    props: {
      tutorialCase: Object,
      participants: Array
    },
    computed: {
      hasRanking() {
        return this.tutorialCase.currentStep > 1;
      }
    }
  };
</script>
