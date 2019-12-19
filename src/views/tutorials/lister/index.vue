<template>
  <v-layout wrap>
    <v-flex v-for="(tutorial, index) in receivedTutorials" :key="index" xs12 sm6 md4>
      <v-layout pa-3 pt-5>
        <v-flex xs12>
          <tutorial-card :tutorial="tutorial"/>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import TutorialCard from './Card.vue';

export default {
  name: 'TutorialLister',
  props: {
    tutorials: Array,
  },
  components: { TutorialCard },
  computed: {
    receivedTutorials() {
      return this.$props.tutorials;
    },
  },
};
</script>
