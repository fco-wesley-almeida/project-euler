<template>
  <v-layout wrap justify-center align-center pa-5>
    <v-flex xs12 md10 lg8>
      <lister
        :items="participants"
        cardBreakpoints="xs12 md6 lg4"
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
  </v-layout>
</template>

<script>
  import {db} from '@/firebase/db';
  import Lister from '@/components/Lister';
  import ParticipantTermsCard from '@/components/steps/terms/cards/participant';

  export default {
    name: 'CaseSteps',
    components: { ParticipantTermsCard, Lister },
    data: () => ({
      participants: [],
      answers: []
    }),
    mounted() {
      this.$bind(
        'answers',
        db.collection(`timelines/${this.$route.params.caseID}/step1/`),
      );

      this.$bind(
        'participants',
        db
          .collection('students')
          .where('tutorials', 'array-contains', this.$route.params.tutorialID),
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

      }
    },
    methods: {
      didTapAdvance() {
        this.tutorialCase.currentStep++;
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
