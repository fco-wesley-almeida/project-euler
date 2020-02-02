<template>
  <v-card class="pa-2">
    <v-card-title>{{receivedTutorialCase.title}}</v-card-title>
    <v-card-actions class="pa-0">
    <v-spacer/>
    <v-btn x-small color="primary" @click.stop="didTapEdit">
      Editar <v-icon x-small>edit</v-icon>
    </v-btn>
    <v-btn x-small color="error" @click.stop="didTapRemove">
      Remover <v-icon x-small>delete</v-icon>
    </v-btn>
    </v-card-actions>
    <v-dialog
        v-model="deletionDialog"
        transition="fade-transition"
        max-width="290"
      >
        <v-card>
          <v-card-title class="headline">Remoção</v-card-title>

          <v-card-text>
            Deseja realmente remover este participante? Ele não terá mais acesso ao conteúdo desta tutoria.
          </v-card-text>

          <v-card-actions>

            <v-btn
              color="grey darken-1"
              text
              @click="deletionDialog = false"
            >
              Cancelar
            </v-btn>
            <v-spacer/>
            <v-btn
              color="error darken-1"
              text
              @click="removeTutorialCase"
            >
              Remover
            </v-btn>
          </v-card-actions>
        </v-card>

      </v-dialog>
  
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Router from 'vue-router/types/vue';
import { removeCaseFromTutorial } from '@/firebase/api/case';
import { TutorialCase } from '@/models/case';

export default Vue.extend({
  name: 'TutorialCaseCard',
  data: () => ({
    deletionDialog: false,
  }),
  props: {
    tutorialCase: Object,
  },
  computed: {
    receivedTutorialCase() : TutorialCase {
      return this.$props.tutorialCase;
    },
  },
  methods: {
    didTapRemove() {
      console.log(this.receivedTutorialCase);
      this.deletionDialog = true;
    },
    removeTutorialCase() {
      if (this.receivedTutorialCase.id)
        removeCaseFromTutorial(this.receivedTutorialCase.id, this.$route.params.tutorialID);
    }
  },
});
</script>
