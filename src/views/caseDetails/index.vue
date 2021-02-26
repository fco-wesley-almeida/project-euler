<template>
  <v-layout fill-height align-start wrap pa-5>
    <v-fade-transition mode="out-in">
      <router-view style="margin-bottom: 76px" :tutorialCase="tutorialCase" />
    </v-fade-transition>
    <v-bottom-navigation
      color="primary"
      background-color="secondary"
      fixed
    >
      <v-btn :to="{name: 'CaseSteps', params: $route.params}">
        <span>Passos de abertura</span>
        <v-icon>timeline</v-icon>
      </v-btn>

      <v-btn :to="{name: 'CloseSteps', params: $route.params}">
        <span>Passos de fechamento</span>
        <v-icon>timeline</v-icon>
      </v-btn>

      <v-btn :to="{name: 'CaseContent', params: $route.params}">
        <span>Conteúdo</span>
        <v-icon>book</v-icon>
      </v-btn>

      <v-btn :to="{name: 'CaseAttachments', params: $route.params}">
        <span>Anexos</span>
        <v-icon>attachment</v-icon>
      </v-btn>

      <v-btn :to="{name: 'CaseReferences', params: $route.params}">
        <span>Referências</span>
        <v-icon>assignment</v-icon>
      </v-btn>

      <v-btn :to="{name: 'CaseObjectives', params: $route.params}">
        <span>Objetivos</span>
        <v-icon>mdi-bullseye-arrow</v-icon>
      </v-btn>

      <v-btn :to="{name: 'CaseGroups', params: $route.params}">
        <span>Grupos</span>
        <v-icon>group</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script>
import {db} from '@/firebase/config';

export default {
  
  data: () => ({
    tutorialCase: {currentStep: 0},
  }),
  mounted() {
    this.$bind(
      'tutorialCase',
      db.collection('cases').doc(this.$route.params.caseID),
    );
  },
}
</script>