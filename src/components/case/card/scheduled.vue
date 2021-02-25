<template>
  <v-card color="card" class="pa-2 round" >
    <v-card-title>{{receivedTutorialCase.title}}</v-card-title>
    <v-card-actions class="pa-0">
      <template v-if="canBeActive">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn class="ml-2" icon color="primary" v-on="on" @click.stop="didTapActivate">
            <v-icon>check</v-icon>
          </v-btn>
        </template>
        <span>Tornar ativo</span>
      </v-tooltip>
      </template>
      <v-spacer />
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon class="mr-1" color="disabled-lighten-3" v-on="on" @click.stop="didTapEdit">
            <v-icon>edit</v-icon>
          </v-btn>
        </template>
        <span>Editar</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn class="mr-2" icon color="error" v-on="on" @click.stop="didTapRemove">
            <v-icon>delete</v-icon>
          </v-btn>
        </template>
        <span>Excluir</span>
      </v-tooltip>
    </v-card-actions>
    <v-dialog
      v-model="showingEditDialog"
      fullscreen
      transition="dialog-bottom-transition"
      scrollable
    >
      <edit-case
        title="Editar caso"
        v-if="showingEditDialog"
        :id="receivedTutorialCase.id"
        :tutorialCase="receivedTutorialCase"
        @finished="showingEditDialog = false"
      />
    </v-dialog>
    <v-dialog v-model="deletionDialog" transition="fade-transition" max-width="290">
      <v-card color="card">
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
      <v-card color="card">
        <v-card-title class="headline">Ativar</v-card-title>

        <v-card-text>Deseja realmente ativar este caso? Não será mais possível editá-lo e os grupos serão formados somente pelos participantes atuais.</v-card-text>

        <v-card-actions>
          <v-btn color="grey darken-1" class="ml-2" text @click="activationDialog = false">Cancelar</v-btn>
          <v-spacer />
          <v-btn color="primary" class="mr-2"  text @click="confirmActivation">Ativar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <fullscreen-dialog v-model="groupCreationDialog" :title="'Criação de grupos - ' + receivedTutorialCase.title">
        <group-creation
        :id="receivedTutorialCase.id"
        :tutorialCase="receivedTutorialCase"
        @finished="groupCreationDialog = false"
      />
    </fullscreen-dialog>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import EditCase from "../edition/index.vue";
import GroupCreation from "../group/creation.vue";

import FullscreenDialog from "@/components/dialogs/Fullscreen.vue";
import { removeCaseFromTutorial, updateCase } from "@/firebase/api/case";
import { TutorialCase } from "@/firebase/models/case";

export default Vue.extend({
  name: "TutorialCaseCard",
  components: { EditCase, FullscreenDialog, GroupCreation },
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
        this.groupCreationDialog = true;
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

<style scoped>
.v-card__title{
  word-break: keep-all;
  word-wrap: break-word;
  hyphens: auto;
}
</style>
