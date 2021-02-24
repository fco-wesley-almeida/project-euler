<template>
    <v-card color="card" hover @click="onClick">
            <v-card-title>{{receivedTutorial.name}}</v-card-title>
            <v-card-subtitle color="red">
              <div>
                <v-icon color="disabled">group</v-icon>
                Participantes: {{participantsCount}}
              </div>
              <div>
                <v-icon color="disabled">event</v-icon>
                Data: {{date}}
              </div>
            </v-card-subtitle>
          </v-card>
</template>

<script>
export default {
  name: 'TutorialCard',
  props: {
    tutorial: Object,
  },
  methods: {
    onClick() {
      this.$store.state.app.currentTutorialName = this.receivedTutorial.name;
      this.$router.push({name: "TutorialInfo", params: {tutorialID: this.receivedTutorial.id}});
    },
  },
  computed: {
    date() {
      let convertedDate = this.receivedTutorial.date.toDate();

      let day = convertedDate.getUTCDate();
      let dayString = day >= 10 ? `${day}` : `0${day}`;

      let month = convertedDate.getUTCMonth();
      month += 1;
      let monthString = month >= 10 ? `${month}` : `0${month}`;
      return `${dayString}/${monthString}/${convertedDate.getUTCFullYear()}`;
    },
    receivedTutorial() {
      return this.$props.tutorial;
    },
    caseCount() {
      return this.receivedTutorial.cases ? this.receivedTutorial.cases.length || 0 : 0;
    },
    participantsCount() {
      return this.receivedTutorial.students ? this.receivedTutorial.students.length || 0 : 0;
    },
  },
};
</script>
