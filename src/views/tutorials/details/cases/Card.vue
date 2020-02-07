<template>
  <v-card class="pa-2">
    <v-card-title>{{receivedTutorialCase.title}}</v-card-title>
    <v-card-actions class="pa-0">
      
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon color="primary" v-on="on">
            <v-icon>check</v-icon>
          </v-btn>
        </template>
        <span>Tornar ativo</span>
      </v-tooltip>
      <v-spacer />
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon color="disabled-lighten-3" v-on="on" @click.stop="didTapEdit">
            <v-icon>edit</v-icon>
          </v-btn>
        </template>
        <span>Editar</span>
      </v-tooltip>
      <v-spacer />
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon color="error" v-on="on" @click.stop="didTapRemove">
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
        v-if="showingEditDialog"
        :id="receivedTutorialCase.id"
        :tutorialCase="receivedTutorialCase"
        @finished="showingEditDialog = false"
      />
    </v-dialog>
    <v-dialog v-model="deletionDialog" transition="fade-transition" max-width="290">
      <v-card>
        <v-card-title class="headline">Remoção</v-card-title>

        <v-card-text>Deseja realmente remover este caso?</v-card-text>

        <v-card-actions>
          <v-btn color="grey darken-1" text @click="deletionDialog = false">Cancelar</v-btn>
          <v-spacer />
          <v-btn color="error darken-1" text @click="removeTutorialCase">Remover</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Router from "vue-router/types/vue";
import EditCase from "./edition/index.vue";
import { removeCaseFromTutorial } from "@/firebase/api/case";
import { TutorialCase } from "@/models/case";

export default Vue.extend({
  name: "TutorialCaseCard",
  components: { EditCase },
  data: () => ({
    deletionDialog: false,
    showingEditDialog: false
  }),
  props: {
    tutorialCase: Object
  },
  computed: {
    receivedTutorialCase(): TutorialCase {
      return this.$props.tutorialCase;
    }
  },
  methods: {
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
