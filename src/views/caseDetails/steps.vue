<template>
  <v-layout wrap justify-center align-center>
    <v-flex xs12 md8 lg6>
      <v-timeline dense style="margin-left: -25px">
        <v-timeline-item
          :color="i == 1 ? 'primary' : 'grey'"
          small
          v-for="i in tutorialCase.currentStep"
          v-bind:key="i"
        >
          <v-layout style="margin-left: -20px">
            <v-flex>
              <v-card class="mr-2">
                <v-card-title :class="`headline ${i == 1 ? 'primary white--text' : ''} pt-2`">
                  Passo
                  {{tutorialCase.currentStep - i + 1}}
                  <v-spacer />
                </v-card-title>
                <v-card-subtitle :class="`${i == 1 ? 'primary' : ''} pb-1`">
                  <v-icon
                    small
                    class="mr-2 mb-2"
                    :color="`${i == 1 ? 'rgba(255, 255, 255, 0.75)' : ''}`"
                  >calendar_today</v-icon>
                  <span
                    class="body-1 my-auto"
                    :style="`height: 100%; ${i == 1 ? 'color: rgba(255, 255, 255, 0.75)' : ''}`"
                  >24/20/2020</span>
                </v-card-subtitle>
                <v-card-text class="body-1 mt-3">
                  Leitura do caso e demarcação de termos
                  desconhecidos
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    @click="stepTapped(tutorialCase.currentStep - i + 1)"
                    :text="!$vuetify.theme.dark"
                    color="primary"
                  >Ver respostas</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-timeline-item>
      </v-timeline>
    </v-flex>
    <v-flex xs12>
      <v-layout justify-center align-center>
        <v-btn
          fixed
          style="position: fixed; bottom: 0; right: 0; margin-right: 16px; margin-bottom: 72px"
          v-show="tutorialCase.currentStep < 9"
          @click="activationDialog = true"
          color="primary"
        >
          Avançar
          <v-icon class="ml-2">redo</v-icon>
        </v-btn>
      </v-layout>
    </v-flex>
    <v-dialog v-model="activationDialog" transition="fade-transition" max-width="290">
      <v-card>
        <v-card-title class="headline">Passo {{tutorialCase.currentStep}}</v-card-title>

        <v-card-text>
          Deseja realmente finalizar este passo? Os alunos não poderão mais enviar
          respostas.
        </v-card-text>

        <v-card-actions>
          <v-btn color="grey darken-1" class="ml-2" text @click="activationDialog = false">Cancelar</v-btn>
          <v-spacer />
          <v-btn color="primary" class="mr-2" text @click="didTapAdvance">Avançar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { db } from "@/firebase/config";
import { advanceStep } from "@/firebase/api/steps";
import { processTermsWithID } from "../../firebase/api/steps";

export default {
  name: "CaseSteps",
  props: {
    tutorialCase: Object
  },
  data: () => ({
    activationDialog: false
  }),
  computed: {
    routePrefix() {
      return `/tutorias/${this.$route.params.tutorialID}/caso/${this.$route.params.caseID}`;
    }
  },
  methods: {
    didTapAdvance() {
      if (this.tutorialCase.currentStep > 1) {
        advanceStep(this.$route.params.caseID, this.tutorialCase.currentStep);
      } else {
        processTermsWithID(this.$route.params.caseID);
      }
      this.activationDialog = false;
    },
    stepTapped(index) {
      this.$store.state.app.currentStep = "Passo " + index;
      // if (index === 1) {
      //   this.$router.push({name: 'TermsIndividual', params: {...this.$route.params, step: 1}});
      // } else {
      this.$router.push({
        name: "CaseStep",
        params: { ...this.$route.params, step: index }
      });
      // }
    }
  }
};
</script>
