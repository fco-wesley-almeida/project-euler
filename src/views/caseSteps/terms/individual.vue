<template>
  <v-layout wrap justify-center align-start px-5>
    <v-flex xs12 md10 lg8>
      <lister
        :items="participants"
        cardBreakpoints="xs12 md6"
        searchPlaceholder="Buscar por nome ou email do participante"
        :customSearchFunction="searchParticipant"
      >
        <template v-slot:default="slotProps">
          <div class="pa-2">
            <participant-terms-card :participant="slotProps.item" :terms="getTerms(slotProps.item)" />
          </div>
        </template>
      </lister>
    </v-flex>
    <v-btn
      v-show="showingFAB"
      color="primary"
      fab
      style="position: fixed; bottom: 0; right: 0; margin-right: 16px; margin-bottom: 72px"
      @click="activationDialog = true"
    >
      <v-icon>redo</v-icon>
    </v-btn>
    <v-dialog v-model="activationDialog" transition="fade-transition" max-width="290">
      <v-card>
        <v-card-title class="headline">Passo 1</v-card-title>

        <v-card-text>Deseja realmente finalizar este passo? Os alunos não poderão mais enviar respostas.</v-card-text>

        <v-card-actions>
          <v-btn color="grey darken-1" class="ml-2" text @click="activationDialog = false">Cancelar</v-btn>
          <v-spacer />
          <v-btn color="primary" class="mr-2" text @click="didConfirmNext">Avançar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import {db} from '@/firebase/config';
  import Lister from '@/components/Lister';
  import ParticipantTermsCard from '@/components/steps/terms/cards/participant';
  import { proccessTerms } from '@/firebase/api/steps'

  export default {
    name: 'CaseSteps',
    components: { ParticipantTermsCard, Lister },
    data: () => ({
      answers: [],
      activationDialog: false
    }),
    props: {
      tutorialCase: Object,
      participants: Array
    },
    mounted() {
      this.$bind(
        'answers',
        db.collection(`timelines/${this.$route.params.caseID}/step1/`),
      );
    },
    computed: {
      searchParticipant() {
        return (participant, searchString) => {
          let searchableStrings = [];
          if (participant.name) {
            searchableStrings.push(participant.name.toLowerCase());
          }
          if (participant.email) {
            searchableStrings.push(participant.email.toLowerCase());
          }
          return searchableStrings.some(string =>
            string.includes(searchString.toLowerCase())
          );
        };

      },
      showingFAB() {
        return this.tutorialCase.currentStep == 1;
      },
    },
    methods: {
      didConfirmNext() {
        proccessTerms(this.$route.params.caseID, this.answers);
        this.activationDialog = false;
      },
      getTerms(participant) {
        let answers = this.answers.filter( (answer) => {
          return answer.id === participant.id
        });

        if (answers[0]) {
          console.log(answers[0].terms);
          return answers[0].terms;
        }
        return [];
      },

    }
  };
</script>
