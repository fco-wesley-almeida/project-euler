<template>
  <v-layout wrap justify-center align-center>
    <v-flex xs12 md8 lg6>
      <v-timeline dense style="margin-left: -25px">
        <v-timeline-item :color="i >= tutorialCase.currentStep ? 'primary' : 'grey'" small v-for="i in tutorialCase.currentStep" v-bind:key="i">
          <v-layout style="margin-left: -20px">
            <v-flex>
          <v-card>
            <v-card-title :class="`headline ${i >= tutorialCase.currentStep ? 'primary white--text' : ''} pt-2`">Passo {{i}}<v-spacer/></v-card-title>
            <v-card-subtitle :class="`${i >= tutorialCase.currentStep ? 'primary' : ''} pb-1`">
                <v-icon small class="mr-2 mb-2" :color="`${i >= tutorialCase.currentStep ? 'rgba(255, 255, 255, 0.75)' : 'grey'}`">calendar_today</v-icon>
                <span class="body-1 my-auto" :style="`height: 100%; ${i >= tutorialCase.currentStep ? 'color: rgba(255, 255, 255, 0.75)' : 'grey'}`">24/20/2020</span>
            </v-card-subtitle>
            <v-card-text class="body-1 black--text mt-3">Leitura do caso e demarcação de termos desconhecidos</v-card-text>
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
      <v-btn fixed style="position: fixed; bottom: 0; right: 0; margin-right: 16px; margin-bottom: 72px" v-show="tutorialCase.currentStep < 9" @click="didTapAdvance" color="primary">Avançar <v-icon class="ml-2">redo</v-icon></v-btn>
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
