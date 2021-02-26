<template>
  <v-layout wrap justify-center align-center>
    <v-flex xs12 md8 lg6>
      <v-timeline dense style="margin-left: -25px">
        <v-timeline-item
          :color="
            shouldHighlightStep(step.id - tutorialCase.currentStep + 1) ||
            tutorialCase.status == 'finished'
              ? 'primary'
              : 'grey'
          "
          small
          v-for="(step, i) in steps"
          v-bind:key="i"
        >
          <v-layout style="margin-left: -20px">
            <v-flex>
              <v-card color="card" class="mr-2">
                <v-card-title
                  :class="`headline ${
                    shouldHighlightStep(step.id - tutorialCase.currentStep + 1)
                      ? 'primary white--text'
                      : ''
                  } pt-2`"
                >
                  Passo
                  {{ step.id }}
                  <v-spacer />
                </v-card-title>
                <v-card-text class="body-1 mt-3">{{
                  stepDescription(step.id - 1)
                }}</v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    @click="stepTapped(step.id)"
                    :text="!$vuetify.theme.dark"
                    color="primary"
                    >Ver respostas</v-btn
                  >
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
          v-if="allowAdvanceButton"
          fixed
          style="
            position: fixed;
            bottom: 0;
            right: 0;
            margin-right: 16px;
            margin-bottom: 72px;
          "
          v-show="tutorialCase.status != 'finished'"
          @click="activationDialog = true"
          color="primary"
        >
          {{ advanceLabel }}
          <v-icon class="ml-2">{{ advanceIcon }}</v-icon>
        </v-btn>
      </v-layout>
    </v-flex>
    <v-dialog
      v-model="activationDialog"
      transition="fade-transition"
      max-width="290"
    >
      <v-card color="card">
        <v-card-title class="headline">{{ advanceDialogTitle }}</v-card-title>

        <v-card-text>{{ advanceDialogMessage }}</v-card-text>

        <v-card-actions>
          <v-btn
            color="grey darken-1"
            class="ml-2"
            text
            @click="activationDialog = false"
            >Cancelar</v-btn
          >
          <v-spacer />
          <v-btn color="primary" class="mr-2" text @click="didTapAdvance"
            >Avançar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" color="primary" :timeout="-1">
      {{ messageAdvance ? messageAdvance.message : '' }}
      <template v-slot:action="{ attrs }">
        <v-btn text :color="'white'" v-bind="attrs" @click="snackbar = false">
          Ok
        </v-btn>
      </template>
    </v-snackbar>
  </v-layout>
</template>

<script>
import { db } from "@/firebase/config";
import { finishCase } from "@/firebase/api/case";
import { advanceStep } from "@/firebase/api/steps";
import { processTermsWithID } from "../../firebase/api/steps";

export default {
  // name: "CaseSteps",
  props: {
    tutorialCase: Object,
    stepsToRender: Array,
    messageAdvance: Object,
  },
  data: () => ({
    activationDialog: false,
    finalStep: 7,
    snackbar: false,
  }),
  computed: {
    steps() {
      const stepsToRender = JSON.parse(JSON.stringify(this.stepsToRender))
      const filteredSteps = stepsToRender.reverse().filter((number) => {
        return number <= this.tutorialCase.currentStep;
      });
      return filteredSteps.map((number) => {
        return {
          id: number,
        };
      });
    },
    allowAdvanceButton() {
      const stepsToRender = JSON.parse(JSON.stringify(this.stepsToRender))
      const firstStep = stepsToRender[0];
      const lastStep = stepsToRender.reverse()[0];
      const { currentStep } = this.tutorialCase;
      return currentStep >= firstStep && currentStep <= lastStep;
    },
    advanceLabel() {
      return this.tutorialCase.currentStep < this.finalStep
        ? "Avançar"
        : "Finalizar";
    },
    advanceIcon() {
      return this.tutorialCase.currentStep < this.finalStep ? "redo" : "check";
    },
    advanceDialogTitle() {
      if (this.tutorialCase.currentStep == this.finalStep) {
        return "Finalizar Caso";
      }
      return "Passo " + this.tutorialCase.currentStep;
    },
    advanceDialogMessage() {
      if (this.tutorialCase.currentStep < this.finalStep) {
        return "Deseja realmente finalizar este passo? Os alunos não poderão mais enviar respostas.";
      }
      return "Deseja finalizar este caso? Os alunos não poderão mais enviar respostas ao passo 7 e você poderá tornar outro caso ativo.";
    },
  },
  methods: {
    shouldHighlightStep(i) {
      return i == 1 && this.tutorialCase.status != "finished";
    },
    didTapAdvance() {
      if (this.messageAdvance && this.tutorialCase.currentStep === this.messageAdvance.step) {
        this.snackbar = true;
      }
      if (this.tutorialCase.currentStep == this.finalStep) {
        finishCase(this.$route.params.caseID);
      } else if (this.tutorialCase.currentStep > 1) {
        advanceStep(this.$route.params.caseID, this.tutorialCase.currentStep);
      } else {
        processTermsWithID(this.$route.params.caseID);
      }
      this.activationDialog = false;
    },
    stepTapped(index) {
      this.$store.state.app.currentStep = "Passo " + index;
      this.$router.push({
        name: "CaseStep",
        params: { ...this.$route.params, step: index },
      });
    },
    stepDescription(i) {
      let descriptions = [
        "Leitura do caso e demarcação dos termos desconhecidos",
        "Lista de problemas",
        "Chuva de ideias",
        "Sistematizar a análise e hipóteses para solução do problema",
        "Listagem dos objetivos de aprendizagem",
        "Estudo em casa e construção do mapa individual",
        "Construção e apresentação do mapa coletivo",
        "Artigo científico",
        "Caso integrador",
      ];
      return descriptions[i];
    },
  },
};
</script>
