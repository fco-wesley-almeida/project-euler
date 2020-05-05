<template>
  <v-layout wrap justify-center align-center px-0>
    <v-flex xs12 md10 lg8>
      <lister
        :items="participantsWithoutGroup"
        cardBreakpoints="xs12 md6"
        hideSearchBar
      >
        <template v-slot:default="slotProps">
          <div class="pa-2">
            <student-card :student="slotProps.item" />
          </div>
        </template>
      </lister>
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
import { db } from "@/firebase/config";
import Lister from "@/components/Lister";
import StudentCard from "@/components/student/Card";
import GroupCard from "@/components/group/card";

export default {
  name: "CaseSteps",
  components: { GroupCard, StudentCard, Lister },
  data: () => ({
    groups: [],
    participants: []
  }),
  mounted() {
    this.$bind(
      "groups",
      db.collection(`cases/${this.$route.params.caseID}/groups`)
    );

    this.$bind(
      "participants",
      db
        .collection("users")
        .where("tutorials", "array-contains", this.$route.params.tutorialID)
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
    },
    participantsWithoutGroup() {
      let filtered = this.participants.slice();
      filtered.filter( (participant) => {
        return !this.groups.some((group) => group.participants.includes(participant.id));
      });
      return filtered;
    }
  },
  methods: {
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
    }
  }
};
</script>
