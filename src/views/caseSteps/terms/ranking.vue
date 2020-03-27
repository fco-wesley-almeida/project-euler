<template>
  <v-layout wrap justify-center align-center pa-5>
    <v-flex xs12 md10 lg8>
      <lister
        :items="rankingEntries"
        cardBreakpoints="xs12 md6"
        searchPlaceholder="Buscar por termo"
        :customSearchFunction="searchEntry"
        :customSortFunction="sortEntries"
      >
        <template v-slot:default="slotProps">
          <div class="pa-2">
            <ranking-terms-card :entry="slotProps.item" :participants="participants" />
          </div>
        </template>
      </lister>
    </v-flex>
  </v-layout>
</template>

<script>
  import {db} from '@/firebase/db';
  import Lister from '@/components/Lister';
  import RankingTermsCard from '@/components/steps/terms/cards/ranking';

  export default {
    name: 'TermsRanking',
    components: { RankingTermsCard, Lister },
    data: () => ({
      rankingEntries: [],
      activationDialog: false
    }),
    props: {
      tutorialCase: Object,
      participants: Array
    },
    mounted() {
      this.$bind(
        'rankingEntries',
        db.collection(`timelines/${this.$route.params.caseID}/step1Ranking`),
      );
    },
    computed: {
      searchEntry() {
        return (entry, searchString) => {
          return entry.term.toLowerCase().includes(searchString.toLowerCase());
        };
      },
      sortEntries() {
        return (a, b) => {
          let diff  = b.numberOfVotes - a.numberOfVotes;
          if (diff == 0) {
            return ('' + a.term.toLowerCase()).localeCompare('' + b.term.toLowerCase());
          }
          return diff;
        };
      }
    }
  };
</script>
