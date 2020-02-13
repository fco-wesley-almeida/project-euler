<template>
  <v-card progre color="primary" dark class="pa-2">
    <v-card-title>{{receivedTutorialCase.title}}</v-card-title>
    <v-card-subtitle>
      <div>Passo atual: {{(receivedTutorialCase.currentStep || 1) + " / 9"}}</div>
      <v-progress-linear  color="white" class="mt-1" value="75" />
    </v-card-subtitle>
    
    <v-card-actions class="pa-0">
      <v-btn class="ml-2" text color="white" v-on="on">
        <v-icon>group</v-icon>
        <p class="my-auto">Grupos</p>
      </v-btn>
      <v-btn text class="mr-5" color="white" v-on="on">
        <v-icon>timeline</v-icon>
        <p class="my-auto">Linha do tempo</p>
      </v-btn>
      <v-spacer />
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn fab x-small class="mr-2" color="white" light v-on="on">
            <v-icon color="primary">redo</v-icon>
          </v-btn>
        </template>
        <span>Ir ao próximo passo</span>
      </v-tooltip>
    </v-card-actions>
    <v-dialog
      v-model="showingEditDialog"
      fullscreen
      transition="dialog-bottom-transition"
      scrollable
    >
      <edit-case
        v-if="showingEditDialog"
        :id="receivedTutorialCase.id"
        :tutorialCase="receivedTutorialCase"
        @finished="showingEditDialog = false"
      />
    </v-dialog>
    <v-dialog v-model="deletionDialog" transition="fade-transition" max-width="290">
      <v-card>
        <v-card-title class="headline">Exclusão</v-card-title>

        <v-card-text>Deseja realmente excluir este caso?</v-card-text>

        <v-card-actions>
          <v-btn color="grey darken-1" text @click="deletionDialog = false">Cancelar</v-btn>
          <v-spacer />
          <v-btn color="error darken-1" text @click="removeTutorialCase">Remover</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="activationDialog" transition="fade-transition" max-width="290">
      <v-card>
        <v-card-title class="headline">Ativar</v-card-title>

        <v-card-text>Deseja realmente ativar este caso? Não será mais possível editá-lo e os grupos serão formados somente pelos participantes atuais.</v-card-text>

        <v-card-actions>
          <v-btn color="grey darken-1" class="ml-2" text @click="activationDialog = false">Cancelar</v-btn>
          <v-spacer />
          <v-btn color="primary" class="mr-2" text @click="confirmActivation">Ativar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="groupCreationDialog"
      fullscreen
      transition="dialog-bottom-transition"
      scrollable
    >
      <edit-case
        v-if="groupCreationDialog"
        :id="receivedTutorialCase.id"
        :tutorialCase="receivedTutorialCase"
        @finished="groupCreationDialog = false"
      />
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Router from "vue-router/types/vue";
import EditCase from "../edition/index.vue";
import { removeCaseFromTutorial, updateCase } from "@/firebase/api/case";
import { TutorialCase } from "@/models/case";

export default Vue.extend({
  name: "TutorialCaseCard",
  components: { EditCase },
  data: () => ({
    deletionDialog: false,
    activationDialog: false,
    showingEditDialog: false,
    groupCreationDialog: false
  }),
  props: {
    tutorialCase: Object,
    canBeActive: Boolean
  },
  computed: {
    receivedTutorialCase(): TutorialCase {
      return this.$props.tutorialCase;
    }
  },
  methods: {
    didTapActivate() {
      this.activationDialog = true;
    },
    confirmActivation() {
      this.activationDialog = false;
      this.receivedTutorialCase.status = "active";
      updateCase(this.receivedTutorialCase, this.receivedTutorialCase.id);
      //this.groupCreationDialog = true;
    },
    didTapRemove() {
      this.deletionDialog = true;
    },
    didTapEdit() {
      this.showingEditDialog = true;
    },
    removeTutorialCase() {
      if (this.receivedTutorialCase.id)
        removeCaseFromTutorial(
          this.receivedTutorialCase.id,
          this.$route.params.tutorialID
        );
    }
  }
});
</script>
