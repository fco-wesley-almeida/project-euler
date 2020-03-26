<template>
  <v-layout wrap justify-center align-center pa-5>
    <v-flex xs12 md10 lg8>
      <lister
        :items="groups"
        cardBreakpoints="xs12 md6"
        searchPlaceholder="Buscar por título do grupo ou nome/email de participante"
        :customSearchFunction="searchGroup"
        :customSortFunction="sortGroups"
      >
        <template v-slot:default="slotProps">
          <div class="pa-2">
            <group-card :group="slotProps.item" :participants="getParticipants(slotProps.item)" />
          </div>
        </template>
      </lister>
    </v-flex>
  </v-layout>
</template>

<script>
  import {db} from '@/firebase/db';
  import Lister from '@/components/Lister';
  import GroupCard from '@/components/group/card';

  export default {
    name: 'CaseSteps',
    components: { GroupCard, Lister },
    data: () => ({
      groups: [],
      participants: []
    }),
    mounted() {
      this.$bind(
        'groups',
        db.collection(`cases/${this.$route.params.caseID}/groups`),
      );

      this.$bind(
        'participants',
      db
        .collection('students')
        .where('tutorials', 'array-contains', this.$route.params.tutorialID),
      );
    },
    computed: {
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
      },
      sortGroups() {
        return (a, b) => {
          a.title.toLowerCase().localeCompare('' + b.title.toLowerCase());
        };
      }
    },
    methods: {
      didTapAdvance() {
        this.tutorialCase.currentStep++;
      },
      getParticipants(group) {
        return this.participants.filter( (participant) => {
          return group.participants.includes(participant.id)
        })
      },

    }
  };
</script>
