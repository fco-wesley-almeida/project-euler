<template>
  <v-layout wrap justify-center align-center px-1>
    <v-flex xs12 md10 lg8>
      <lister
        :items="groups"
        cardBreakpoints="xs12 md6"
        searchPlaceholder="Buscar por título do grupo ou nome/email de participantes"
        :customSearchFunction="searchGroup"
        :customSortFunction="sortGroups"
      >
        <template v-slot:default="slotProps">
          <div class="pa-2">
            <group-answer-card
              :group="slotProps.item"
              :participants="getParticipants(slotProps.item)"
              :answer="getAnswer(slotProps.item)"
            />
          </div>
        </template>
      </lister>
    </v-flex>
  </v-layout>
</template>

<script>
import { db } from "@/firebase/config";
import Lister from "@/components/Lister";
import GroupAnswerCard from "@/components/answer/group";

export default {
  components: { GroupAnswerCard, Lister },
  props: {
    groups: Array,
    participants: Array
  },
  data: () => ({
    answers: []
  }),
  mounted() {
    this.setupFirebaseListener();
  },
  watch: {
    $route(val) {
      this.setupFirebaseListener();
    }
  },
  computed: {
    searchGroup() {
      return (group, searchString) => {
        let searchableStrings = [];
        let groupParticipants = this.getParticipants(group);

        if (group.title) {
          searchableStrings.push(group.title.toLowerCase());
        }
        searchableStrings = searchableStrings.concat(
          groupParticipants.map(participant => participant.name.toLowerCase())
        );
        searchableStrings = searchableStrings.concat(
          groupParticipants.map(participant => participant.email.toLowerCase())
        );
        return searchableStrings.some(string =>
          string.includes(searchString.toLowerCase())
        );
      };
    },
    sortGroups() {
      return (a, b) => {
        return a.title
          .toLowerCase()
          .localeCompare(b.title.toLowerCase(), "en", { numeric: true });
      };
    },
    sortGroupParticipants() {
      return (a, b) => {
        if (a.id === a.group.reporterID) return -1;
        if (b.id === a.group.reporterID) return 1;

        if (a.id === a.group.coordinatorID) return -1;
        if (b.id === a.group.coordinatorID) return 1;

        return a.name
          .toLowerCase()
          .localeCompare(b.name.toLowerCase(), "en", { numeric: true });
      };
    }
  },
  methods: {
    setupFirebaseListener() {
      this.$bind(
        "answers",
        db.collection(
          `timelines/${this.$route.params.caseID}/step${this.$route.params.step}`
        )
      );
    },
    didTapAdvance() {
      this.tutorialCase.currentStep++;
    },
    getParticipants(group) {
      let foundParticipants = this.participants.filter(participant => {
        return group.participants.includes(participant.id);
      });
      for (let participant of foundParticipants) {
        participant.group = group;
      }
      return foundParticipants.sort(this.sortGroupParticipants);
    },
    getAnswer(group) {
      return this.answers.find(answer => {
        return answer.id === group.id;
      });
    }
  }
};
</script>
