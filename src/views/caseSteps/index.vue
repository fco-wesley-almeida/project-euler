<template>
  <v-layout>
  <router-view :tutorialCase="tutorialCase" :participants="participants">
  </router-view>
  </v-layout>
</template>

<script>
  import {db} from '@/firebase/config';
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
          .collection('users')
          .where('tutorials', 'array-contains', this.$route.params.tutorialID),
      );
    }
  }
</script>
