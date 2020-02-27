<template>
  <v-card progre color="primary" dark class="pa-2">
    <v-card-title>{{receivedTutorialCase.title}}</v-card-title>
    <v-card-subtitle>
      <div>Passo atual: {{(receivedTutorialCase.currentStep || 1) + " / 9"}}</div>
      <v-progress-linear  color="white" class="mt-1" value="75" />
    </v-card-subtitle>

    <v-card-actions class="pa-0">
      <v-btn @click="didTapGroup" class="ml-2" text color="white">
        <v-icon>group</v-icon>
        <p class="my-auto">Grupos</p>
      </v-btn>
      <v-btn @click="didTapSteps" text class="mr-5" color="white">
        <v-icon>timeline</v-icon>
        <p class="my-auto">Passos</p>
      </v-btn>
      <v-spacer />
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn fab x-small class="mr-2" color="white" light v-on="on">
            <v-icon color="primary">redo</v-icon>
          </v-btn>
        </template>
        <span>Ir ao próximo passo</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "TutorialCaseCard",
  props: {
    tutorialCase: Object,
    canBeActive: Boolean
  },
  computed: {
    receivedTutorialCase() {
      return this.$props.tutorialCase;
    },
    routePrefix() {
      return `/tutorias/${this.$route.params.tutorialID}/casos/${this.tutorialCase.id}`;
    }
  },
  methods: {
    didTapGroup(){
      let path = this.routePrefix + "/grupos";
      console.log(path);
      this.$router.push(path);
    },
    didTapSteps(){
      let path = this.routePrefix + "/passos";
      console.log(path);
      this.$router.push(path);
    }
  }
});
</script>
