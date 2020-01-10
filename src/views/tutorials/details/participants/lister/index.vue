<template>
  <v-layout wrap>
    <template v-if="receivedStudents.length > 0">
    <transition-group
      name="list-complete"
      tag="div"
      class="layout align-start wrap"
    >
      <v-flex v-for="(student, index) in receivedStudents" :key="index" xs12 sm6>
        <v-layout pa-3 pt-5>
          <v-flex xs12>
            <student-card :student="student" />
          </v-flex>
        </v-layout>
      </v-flex>
       </transition-group>
    </template>
    <template v-else-if="searching">
      <v-layout wrap column align-center justify-center style="height: 30vh">
        <v-spacer />
        <v-flex xs1>
          <v-icon large class="text-xs-center mt-2">search</v-icon>
        </v-flex>
        <v-flex xs6>
          <h4
            class="text-xs-center mt-2 font-weight-regular"
            style="color: #aaaaaa"
          >Nenhum participante encontrado...</h4>
        </v-flex>
      </v-layout>
    </template>
    <template v-else>
      <v-layout wrap column align-center justify-center fill-height style="height: 30vh">
        <v-spacer />
        <v-flex xs1>
          <v-icon large class="text-xs-center mt-2">close</v-icon>
        </v-flex>
        <v-flex xs6>
          <h4
            class="text-xs-center mt-2 font-weight-regular"
            style="color: #aaaaaa"
          >Nenhum participante cadastrado...</h4>
        </v-flex>
      </v-layout>
    </template>
  </v-layout>
</template>

<script>
import StudentCard from './Card.vue';

export default {
  name: 'StudentLister',
  props: {
    students: Array,
    searching: Boolean,
  },
  components: { StudentCard },
  computed: {
    receivedStudents() {
      return this.$props.students;
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
  transition: transform 0.25s;
}
.list-complete-item {
  transition: all 0.25s;
  display: inline-block;
}
.list-complete-enter-active, .list-complete-leave-active
/* .list-complete-leave-active em versões anteriores a 2.1.8 */ {
  transition-property: all;
  transition-duration: 0.25s;
}
.list-complete-leave-active {
  position: absolute;
}
</style>
