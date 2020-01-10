<template>
  <v-layout wrap justify-center align-center pa-0>
    <v-flex xs12 md10 lg8>
      <h4
        class="text-xs-center ma-1"
        style="color: #555555"
      >Compartilhe para adicionar novos participantes:</h4>
      <v-layout justify-center align-center wrap :column="$vuetify.breakpoint.smAndDown">
        <v-card class="ma-1">
          <qrcode
            :value="$route.params.tutorialID"
            :options="{ width: 100, color:{ dark:'#0d47a1ff',}, }"
          ></qrcode>
        </v-card>
        <h3 class="text-xs-center ma-1"
        style="color: #555555">ou</h3>
        <v-card class="ma-1" height="100">
          <v-layout justify-center align-center fill-height>
            <div>
          <h2 class="text-xs-center ma-2" style="color: #0d47a1">{{$route.params.tutorialID}}</h2>
            </div>
          </v-layout>
        </v-card>
      </v-layout>
    </v-flex>
    <!-- Search bar -->
    <v-flex xs12 md10 lg8>
      <v-layout wrap pa-3>
        <v-toolbar style="border-radius: 20px">
          <v-text-field
            v-model="searchString"
            hide-details
            prepend-icon="search"
            single-line
            placeholder="Buscar por nome ou email"
          ></v-text-field>
        </v-toolbar>
      </v-layout>
    </v-flex>
    <!-- Content -->
    <v-flex xs12 md10 lg8>
      <student-lister :students="filteredStudents" :searching="searchString != ''" />
    </v-flex>
    </v-layout>
</template>

<script>
import Vue from 'vue';
import VueQrcode from '@chenfengyuan/vue-qrcode';
import { db } from '@/firebase/db';
import StudentLister from './lister/index.vue';

Vue.component(VueQrcode.name, VueQrcode);

export default {
  name: 'TutorialParticipants',
  data: () => ({
    students: [],
    searchString: '',
  }),
  components: { StudentLister },
  mounted() {
    this.$bind(
      'students',
      db
        .collection('students')
        .where('tutorials', 'array-contains', this.$route.params.tutorialID),
    );
  },
  computed: {
    filteredStudents() {
      return this.students.filter((student) => {
        const searchableStrings = [];
        if (student.name) {
          searchableStrings.push(student.name.toLowerCase());
        }
        if (student.email) {
          searchableStrings.push(student.email.toLowerCase());
        }
        return searchableStrings.some(string => string.includes(this.searchString.toLowerCase()));
      });
    },
  },
};
</script>
