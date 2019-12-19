<template>
  <v-layout wrap>
    <template v-if="receivedTutorials.length > 0">
      <v-flex v-for="(tutorial, index) in receivedTutorials" :key="index" xs12 sm6 md4>
        <v-layout pa-3 pt-5>
          <v-flex xs12>
            <tutorial-card :tutorial="tutorial" />
          </v-flex>
        </v-layout>
      </v-flex>
    </template>
    <template v-else-if="searching">
      <v-layout wrap column align-center justify-center style="height: 70vh">
        <v-spacer />
        <v-flex xs1>
          <v-icon large class="text-xs-center mt-2">search</v-icon>
        </v-flex>
        <v-flex xs6>
          <h4
            class="text-xs-center mt-2 font-weight-regular"
            style="color: #aaaaaa"
          >Nenhuma tutoria encontrada...</h4>
        </v-flex>
      </v-layout>
    </template>
    <template v-else>
      <v-layout wrap column align-center justify-center fill-height style="height: 70vh">
        <v-spacer />
        <v-flex xs1>
          <v-icon large class="text-xs-center mt-2">close</v-icon>
        </v-flex>
        <v-flex xs6>
          <h4
            class="text-xs-center mt-2 font-weight-regular"
            style="color: #aaaaaa"
          >Nenhuma tutoria cadastrada, adicione novas com o botão</h4>
        </v-flex>
      </v-layout>
    </template>
  </v-layout>
</template>

<script>
import TutorialCard from './Card.vue';

export default {
  name: 'TutorialLister',
  props: {
    tutorials: Array,
    searching: Boolean,
  },
  components: { TutorialCard },
  computed: {
    receivedTutorials() {
      return this.$props.tutorials;
    },
    receivedSearching() {
      return this.$props.searching;
    },
  },
};
</script>
