<template>
  <v-card class="pa-2">
    <v-layout>
      <div>
        <v-layout align-center justify-center fill-height>
          <v-avatar size="88">
            <v-img :src="receivedStudent.imageURL || '/img/profile-default.jpg'" />
          </v-avatar>
        </v-layout>
      </div>
      <div>
        <v-card-title>{{receivedStudent.name}}</v-card-title>
        <v-card-subtitle>
          <div>
            <v-icon small color="primary">mail</v-icon>
            {{receivedStudent.email}}
          </div>
        </v-card-subtitle>
      </div>
    </v-layout>
    <v-card-actions class="pa-0">
    <v-spacer/>
    <v-btn v-if="showRemoveButton" x-small color="error" @click.stop="didTapRemove">
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
              @click="removeStudent"
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
import { removeStudentFromTutorial } from '@/firebase/api/student';
import { Student } from '@/firebase/models/student';

export default Vue.extend({
  name: 'StudentCard',
  data: () => ({
    deletionDialog: false,
  }),
  props: {
    student: Object,
    showRemoveButton: {type: Boolean, default: false}
  },
  computed: {
    receivedStudent() : Student {
      return this.$props.student;
    },
  },
  methods: {
    didTapRemove() {
      this.deletionDialog = true;
    },
    removeStudent(){
      removeStudentFromTutorial(this.receivedStudent.id, this.$route.params.tutorialID);
    }
  },
});
</script>

<style scoped>
.v-card__title{
  word-wrap: break-word;
  hyphens: auto;
}
</style>