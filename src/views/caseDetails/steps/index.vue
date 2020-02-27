<template>
  <v-layout wrap justify-center align-center>
    <v-flex xs12 md8 lg6>
      <v-timeline>
        <v-timeline-item small v-for="i in tutorialCase.currentStep" v-bind:key="i">
          <template v-slot:opposite>
        <span
          :class="`headline font-weight-bold primary--text`"
          v-text="'24/10/2020'"
        ></span>
          </template>
          <v-layout>
            <v-flex>
          <v-card>
            <v-card-title>Passo {{i}}</v-card-title>
            <v-card-text>Leitura do caso e demarcação de termos desconhecidos</v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn text color="primary">Ver respostas</v-btn>
            </v-card-actions>
          </v-card>
            </v-flex>
          </v-layout>
        </v-timeline-item>
      </v-timeline>
    </v-flex>
    <v-flex xs12>
      <v-layout justify-center align-center>
      <v-btn v-show="tutorialCase.currentStep < 9" @click="didTapAdvance" color="primary">Avançar para passo {{tutorialCase.currentStep+1}} <v-icon>redo</v-icon></v-btn>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  import {db, Timestamp} from '@/firebase/db';

  export default {
    name: 'CaseSteps',
    data: () => ({
      tutorialCase: {currentStep: 0}
    }),
    mounted() {
      this.$bind(
        'tutorialCase',
        db.collection('cases').doc(this.$route.params.caseID),
      );
    },
    computed: {
      routePrefix() {
        return `/tutorias/${this.$route.params.tutorialID}/caso/${this.$route.params.caseID}`;
      },
    },
    methods: {
      didTapAdvance() {
        this.tutorialCase.currentStep++;
      }
    }
  };
</script>
