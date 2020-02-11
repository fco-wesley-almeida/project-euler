<template>
  <v-layout wrap justify-center align-start pa-0>
    <v-flex xs12 md8 lg6>
      <h4
        class="text-xs-center ma-1"
        style="color: #555555"
      >Compartilhe para adicionar novos participantes:</h4>
      <v-layout justify-center align-center wrap :column="$vuetify.breakpoint.smAndDown">
        <v-card class="ma-1" height="100" width="100">
          <v-layout align-center justify-center fill-height>
          <qrcode
            :value="$route.params.tutorialID"
            :options="{ width: 90, color:{ dark:'#0d47a1ff',}, }"
          ></qrcode>
          </v-layout>
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
    <!-- Content -->
    <v-flex xs12 md8 lg7>
      <lister :items="students" cardBreakpoints="xs12 md6" searchPlaceholder="Buscar por nome ou email" :customSearchFunction="filteredStudents">
          <template v-slot:default="slotProps">
            <div class="pa-2">
              <student-card :student="slotProps.item" />
            </div>
          </template>
      </lister>
    </v-flex>
    </v-layout>
</template>

<script>
import Vue from 'vue';
import VueQrcode from '@chenfengyuan/vue-qrcode';
import { db } from '@/firebase/db';
import StudentCard from './Card.vue';
import Lister from '@/components/Lister';

Vue.component(VueQrcode.name, VueQrcode);

export default {
  name: 'TutorialParticipants',
  data: () => ({
    students: [],
    searchString: '',
  }),
  components: { StudentCard, Lister },
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
      return function(student, searchString) {
        const searchableStrings = [];
        if (student.name) {
          searchableStrings.push(student.name.toLowerCase());
        }
        if (student.email) {
          searchableStrings.push(student.email.toLowerCase());
        }
        return searchableStrings.some(string => string.includes(searchString.toLowerCase()));
    };
    },
  },
};
</script>
