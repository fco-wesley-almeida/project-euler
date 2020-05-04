<template>
  <v-expansion-panels color="card">
    <v-expansion-panel color="card">
      <v-expansion-panel-header class="card">
        <v-layout align-center justify-center>
          <v-flex xs10>
            <span class="title text-capitalize my-auto">{{entry.term}}</span>
          </v-flex>
          <v-flex xs2>
            <span class="subtitle-2 my-auto">{{voteLabel}}</span>
          </v-flex>
        </v-layout>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="card pt-0 mt-0">
        <v-text-field
          class="my-3"
          readonly
          v-for="(participant) in sortedParticipants"
          :key="participant.id"
          :value="participant.name"
          :hint="participant.email"
          persistent-hint
        >
          <template slot="prepend">
            <v-img
              :src="participant.imageURL || '/img/profile-default.jpg'"
              class="elevation-2"
              style="border-radius: 50%; padding-right: 12px; width: 30px; height: 30px"
            />
          </template>
        </v-text-field>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  props: {
    entry: Object,
    participants: Array
  },
  computed: {
    sortedParticipants() {
      return this.participants.filter(participant => {
        return this.entry.voters.includes(participant.id);
      });
    },
    voteLabel() {
      let label = this.entry.numberOfVotes + " voto";
      if (this.entry.numberOfVotes > 1) {
        label += "s";
      }
      return label;
    }
  },
  methods: {
    sort(a, b) {
      return ("" + a.name).localeCompare(b.name);
    }
  }
};
</script>
