<template>
  <v-layout wrap justify-center align-center>
    <v-flex xs12 md8 lg6 v-if="tutorialCase.currentStep == 5">
        <v-timeline dense style="margin-left: -25px"> 
                <v-timeline-item
                :color="shouldHighlightStep(i) || tutorialCase.statusClose == 'finished' ? 'primary' : 'gray'"
                small
                v-for="i in tutorialCase.currentStepClose"
                v-bind:key="i"
                >
                <v-layout style="margin-left: -20px">
                    <v-flex>    
                        <v-card color="card" class="mr-2">
                            <v-card-title :class="`headline ${shouldHighlightStep(i) ? 'primary white--text' : ''} pt-2`">
                            Passo
                            {{tutorialCase.currentStepClose - i + 6}}
                            <v-spacer />
                            </v-card-title>
                            <v-card-text class="body-1 mt-3">{{stepDescription(tutorialCase.currentStepClose - i)}}</v-card-text>
                            <v-card-actions>
                            <v-spacer />
                            <v-btn
                                @click="stepTapped(tutorialCase.currentStepClose - i + 5)"
                                :text="!$vuetify.theme.dark"
                                color="primary"
                            >Ver respostas</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                    <v-snackbar v-model="snackbar" color="primary"> Passos finalizados com sucesso.</v-snackbar>
                </v-layout>
                </v-timeline-item>
        </v-timeline>
    </v-flex>
    <div v-else> Conclua os passos de abertura primeiro.</div>
    <v-flex xs12>
      <v-layout justify-center align-center>
        <v-btn
          fixed
          style="position: fixed; bottom: 0; right: 0; margin-right: 16px; margin-bottom: 72px"
          v-show="tutorialCase.statusClose != 'finished'"
          @click="activationDialog = true"
          color="primary"
        >
          {{advanceLabel}}
          <v-icon class="ml-2">{{advanceIcon}}</v-icon>
        </v-btn>
      </v-layout>
    </v-flex>
    <v-dialog v-model="activationDialog" transition="fade-transition" max-width="290">
      <v-card color="card">
        <v-card-title class="headline">{{advanceDialogTitle}}</v-card-title>

        <v-card-text>{{advanceDialogMessage}}</v-card-text>

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
import { finishCase } from "@/firebase/api/case";
import { advanceStepClose } from "@/firebase/api/steps";
import { processTermsWithID } from "../../firebase/api/steps";

export default {
  name: "CaseStepsClose",
  props: {
    tutorialCase: Object
  },
  data: () => ({
    activationDialog: false,
    snackbar: false
  }),
  computed: {
    advanceLabel() {
      return this.tutorialCase.currentStepClose < 2 ? "Avançar" : "Finalizar";
    },
    advanceIcon() {
      return this.tutorialCase.currentStepClose < 2 ? "redo" : "check";
    },
    advanceDialogTitle() {
      if (this.tutorialCase.currentStepClose == 2) {
        return "Finalizar Caso";
      }
      return "Passo 6";
    },
    advanceDialogMessage() {
      if (this.tutorialCase.currentStepClose < 2) {
        return "Deseja realmente finalizar este passo? Os alunos não poderão mais enviar respostas.";
      }
      return "Deseja finalizar este caso? Os alunos não poderão mais enviar respostas ao passo 7 e você poderá tornar outro caso ativo.";
    }
  },
  methods: {
    shouldHighlightStep(i) {
      if(this.tutorialCase.currentStepClose == 2){
      }
      return i == 1 && this.tutorialCase.statusClose != 'finished';
    },
    didTapAdvance() {
      if (this.tutorialCase.currentStepClose == 2) {
        finishCase(this.$route.params.caseID);
        this.snackbar = true;
      } else if (this.tutorialCase.currentStepClose < 2) {
        advanceStepClose(this.$route.params.caseID, this.tutorialCase.currentStepClose);
      } else {
        processTermsWithID(this.$route.params.caseID);
      }
      this.activationDialog = false;
    },
    stepTapped(index) {
      this.$store.state.app.currentStepClose = "Passo " + index;
      this.$router.push({
        name: "CaseStepsClose",
        params: { ...this.$route.params, step: index }
      });
    },
    stepDescription(i) {
      let descriptions = [
        "Estudo em casa e construção do mapa individual",
        "Construção e apresentação do mapa coletivo"
      ];
      return descriptions[i];
    }
  }
};
</script>
