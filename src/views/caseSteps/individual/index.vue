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
            <individual-answer-card :participant="slotProps.item" :answer="getAnswer(slotProps.item)" />
          </div>
        </template>
      </lister>
    </v-flex>
  </v-layout>
</template>

<script>
  import {db} from '@/firebase/config';
  import Lister from '@/components/Lister';
  import IndividualAnswerCard from '@/components/steps/individual';

  export default {
    name: 'CaseSteps',
    components: { Lister, IndividualAnswerCard },
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
        db.collection(`timelines/${this.$route.params.caseID}/step${this.$route.params.step}/`),
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
    },
    methods: {
      getAnswer(participant) {
        return this.answers.find( (answer) => {
          return answer.id === participant.id
        });
      },
    }
  };
</script>
