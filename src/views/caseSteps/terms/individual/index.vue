<template>
  <v-layout wrap justify-center align-center pa-5>
    <v-flex xs12 md10 lg8>
      <lister
        :items="participants"
        cardBreakpoints="xs12 md6 lg4"
        searchPlaceholder="Buscar por nome ou email do participante"
        :customSearchFunction="searchGroup"
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
  import ParticipantTermsCard from './ParticipantTermsCard';

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
      routePrefix() {
        return `/tutorias/${this.$route.params.tutorialID}/caso/${this.$route.params.caseID}`;
      },
      searchGroup() {
        return (group, searchString) => {
          let searchableStrings = [];
          let groupParticipants = this.getParticipants(group);

          if (group.title) {
            searchableStrings.push(group.title.toLowerCase());
          }
          searchableStrings = searchableStrings.concat(groupParticipants.map((participant) => participant.name.toLowerCase()));
          searchableStrings = searchableStrings.concat(groupParticipants.map((participant) => participant.email.toLowerCase()));
          console.log(searchableStrings);
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
        return this.answers.filter( (answer) => {
          return answer.id === participant.id
        })[0].terms;
      },

    }
  };
</script>
