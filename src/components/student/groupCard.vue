<template>
  <v-card color="card" class="pa-2">
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
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn small color="primary" v-on="on">Adicionar</v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in groups" :key="index">
            <v-list-item-title @click="didTapAdd(item.id)">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Router from "vue-router/types/vue";
import { removeStudentFromTutorial } from "@/firebase/api/student";
import { Student } from "@/firebase/models/student";
import { addUserToGroup } from "@/firebase/api/group";

export default Vue.extend({
  name: "StudentCard",
  data: () => ({
    deletionDialog: false
  }),
  props: {
    student: Object,
    groups: Array,
    showRemoveButton: { type: Boolean, default: false }
  },
  computed: {
    receivedStudent(): Student {
      return this.$props.student;
    }
  },
  methods: {
    didTapAdd(groupID: string) {
        addUserToGroup(this.$route.params.caseID, groupID, this.student.id)
    },
    removeStudent() {
      removeStudentFromTutorial(
        this.receivedStudent.id,
        this.$route.params.tutorialID
      );
    }
  }
});
</script>

<style scoped>
.v-card__title {
  word-break: keep-all;
  word-wrap: break-word;
  hyphens: auto;
}
.v-card__subtitle {
  word-wrap: break-word;
  hyphens: auto;
}
.v-card__subtitle {
  word-wrap: break-word;
  hyphens: auto;
}
</style>