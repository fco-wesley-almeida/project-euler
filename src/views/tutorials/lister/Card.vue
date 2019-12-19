<template>
    <v-card hover>
            <v-card-title>{{receivedTutorial.name}}</v-card-title>
            <v-card-subtitle>
              <div>
                <v-icon color="disabled">group</v-icon>
                Participantes: {{participantsCount}}
              </div>
            </v-card-subtitle>
            <v-card-text>
              <div>Caso atual: {{caseCount}}</div>
              <div>
                <v-icon color="primary">assignment</v-icon>
                Casos futuros: {{caseCount}}
              </div>
              <div>
                <v-icon color="disabled">assignment</v-icon>
                Casos finalizados: {{caseCount}}
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
