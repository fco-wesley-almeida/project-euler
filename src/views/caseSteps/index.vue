<template>
  <v-layout>
  <router-view :tutorialCase="tutorialCase" :participants="participants">
  </router-view>
  </v-layout>
</template>

<script>
  import {db} from '@/firebase/db';
  export default {
    data: () => ({
      tutorialCase: {},
      participants: []
    }),
    mounted() {
      this.$bind(
        "tutorialCase",
        db
          .doc(`cases/${this.$route.params.caseID}`)
      );
      this.$bind(
        'participants',
        db
          .collection('students')
          .where('tutorials', 'array-contains', this.$route.params.tutorialID),
      );
    }
  }
</script>
