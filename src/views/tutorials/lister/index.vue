<template>
  <v-layout wrap>
    <template v-if="!showPlaceholder">
      <transition-group
      name="list-complete"
      tag="div"
      class="layout align-start wrap"
    >
      <v-flex v-for="tutorial in shownItems" :key="tutorial.id" xs12 sm6 md4>
        <v-layout pa-3 pt-5>
          <v-flex xs12>
            <tutorial-card :tutorial="tutorial" />
          </v-flex>
        </v-layout>
      </v-flex>
      </transition-group>
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
import Lister from '@/mixins/lister';
export default {
  name: 'TutorialLister',
  mixins: [Lister],
  props: {
    tutorials: Array,
    searching: Boolean,
  },
  components: { TutorialCard },
  computed: {
    items() {
      return this.$props.tutorials;
    },
    receivedSearching() {
      return this.$props.searching;
    },
  },
};
</script>

<style>
.list-complete-enter,
.list-complete-leave-active {
  opacity: 0;
}
.list-complete-move {
  transition: transform 0.5s;
}
.list-complete-item {
  transition: all 0.5s;
}
.list-complete-enter-active, .list-complete-leave-active{
  transition-property: all;
  transition-duration: 0.5s;
}
.list-complete-leave-active {
  position: absolute;
}
</style>
