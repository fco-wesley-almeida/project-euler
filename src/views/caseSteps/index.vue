<template>
  <v-layout align-center justify-center wrap px-4>
    <v-flex xs11 fill-height>
      <v-fade-transition>
        <component
          :is="shownComponent"
          :tutorialCase="tutorialCase"
          :participants="participants"
          :groups="groups"
          :step="shownStep"
        />
      </v-fade-transition>
    </v-flex>
    <v-btn
      v-if="showsPreviousButton"
      @click.native.stop="didTapPrevious"
      x-small
      fab
      color="primary"
      style="position: fixed; left: 8px; top: 50%"
    >
      <v-icon>navigate_before</v-icon>
    </v-btn>
    <v-btn
      v-if="showsNextButton"
      @click="didTapNext"
      x-small
      fab
      color="primary"
      style="position: fixed; right: 8px; top: 50%"
    >
      <v-icon>navigate_next</v-icon>
    </v-btn>
    <v-btn
      fixed
      style="position: fixed; bottom: 0; right: 0; margin-right: 16px; margin-bottom: 72px"
      v-show="showsAdvanceButton"
      @click="activationDialog = true"
      color="primary"
    >
      {{advanceLabel}}
      <v-icon class="ml-2">{{advanceIcon}}</v-icon>
    </v-btn>
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
import { advanceStep } from "@/firebase/api/steps";
import { finishCase } from "@/firebase/api/case";
import TermStep from "@/views/caseSteps/terms/index";
import GroupStep from "@/views/caseSteps/group/index";
import IndividualStep from "@/views/caseSteps/individual/index";

export default {
  components: { TermStep },
  data: () => ({
    tutorialCase: {},
    participants: [],
    shownComponent: TermStep,
    activationDialog: false,
    groups: [],
    shownStep: 1
  }),
  methods: {
    didTapNext() {
      this.$store.state.app.currentStep = "Passo " + (this.shownStep + 1);
      this.$router.push({
        name: "CaseStep",
        params: { ...this.$route.params, step: this.shownStep + 1 }
      });
    },
    didTapPrevious() {
      this.$store.state.app.currentStep = "Passo " + (this.shownStep - 1);
      this.$router.push({
        name: "CaseStep",
        params: { ...this.$route.params, step: this.shownStep - 1 }
      });
    },
    didTapAdvance() {
      if (this.tutorialCase.currentStep == 9) {
        finishCase(this.$route.params.caseID);
      } else {
        advanceStep(this.$route.params.caseID, this.tutorialCase.currentStep);
      }
      this.activationDialog = false;
    },
    updateComponent() {
      this.shownComponent = undefined;
      setTimeout(() => {
        if (this.shownStep == 1) {
          this.shownComponent = TermStep;
        } else if (this.shownStep == 6) {
          this.shownComponent = IndividualStep;
        } else {
          this.shownComponent = GroupStep;
        }
      }, 100);
    }
  },
  mounted() {
    this.shownStep = this.$route.params.step;
    this.$bind(
      "groups",
      db.collection(`cases/${this.$route.params.caseID}/groups`)
    );
    this.$bind("tutorialCase", db.doc(`cases/${this.$route.params.caseID}`));
    this.$bind(
      "participants",
      db
        .collection("users")
        .where("tutorials", "array-contains", this.$route.params.tutorialID)
    );
    this.updateComponent();
  },
  watch: {
    $route(val) {
      this.shownStep = this.$route.params.step;
      this.updateComponent();
    }
  },
  computed: {
    showsNextButton() {
      return this.shownStep < this.tutorialCase.currentStep;
    },
    showsPreviousButton() {
      return this.shownStep > 1;
    },
    showsAdvanceButton() {
      return (
        this.shownStep > 1 &&
        this.shownStep === this.tutorialCase.currentStep &&
        this.tutorialCase.status != "finished"
      );
    },
    advanceLabel() {
      return this.tutorialCase.currentStep < 9 ? "Avançar" : "Finalizar";
    },
    advanceIcon() {
      return this.tutorialCase.currentStep < 9 ? "redo" : "check";
    },
    advanceDialogTitle() {
      if (this.tutorialCase.currentStep == 9) {
        return "Finalizar Caso";
      }
      return "Passo " + this.tutorialCase.currentStep;
    },
    advanceDialogMessage() {
      if (this.tutorialCase.currentStep < 9) {
        return "Deseja realmente finalizar este passo? Os alunos não poderão mais enviar respostas.";
      }
      return "Deseja finalizar este caso? Os alunos não poderão mais enviar respostas ao passo 9 e você poderá tornar outro caso ativo.";
    }
  }
};
</script>

<style>
.fade-transition {
  transition: opacity 1s ease;
}

.fade-enter,
.fade-leave {
  opacity: 0;
}
</style>
