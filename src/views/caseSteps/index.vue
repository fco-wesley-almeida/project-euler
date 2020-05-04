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
      v-if="showsAdvanceButton"
      @click="activationDialog = true"
      fab
      color="primary"
      fixed
      bottom
      right
    >
      <v-icon>redo</v-icon>
    </v-btn>
    <v-dialog v-model="activationDialog" transition="fade-transition" max-width="290">
      <v-card color="card">
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
      advanceStep(this.$route.params.caseID, this.tutorialCase.currentStep);
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
        this.shownStep < 9
      );
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
