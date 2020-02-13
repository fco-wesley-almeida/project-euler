<template>
    <v-card hover @click="onClick">
            <v-card-title>{{receivedTutorial.name}}</v-card-title>
            <v-card-subtitle color="red">
              <div>
                <v-icon color="disabled">group</v-icon>
                Participantes: {{participantsCount}}
              </div>
            </v-card-subtitle>
            <v-card-text>
              <div>Caso atual: {{receivedTutorial.currentCase || "Nenhum"}}</div>
              <div>
                <v-icon color="primary">assignment</v-icon>
                Casos agendados: {{receivedTutorial.scheduledCases || 0}}
              </div>
              <div>
                <v-icon color="disabled">assignment</v-icon>
                Casos finalizados: {{receivedTutorial.finishedCases || 0}}
              </div>
            </v-card-text>
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
      this.$router.push(`/tutorias/${this.receivedTutorial.id}`);
    },
  },
  computed: {
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
