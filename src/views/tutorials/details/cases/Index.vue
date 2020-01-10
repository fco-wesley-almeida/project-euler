<template>
  <v-layout wrap justify-center align-center pa-5 fill-height>
    <v-scale-transition>
    <v-btn
      primary
      dark
      fab
      style="position: fixed; bottom: 0; right: 0; margin-right: 16px; margin-bottom: 72px"
      @click="didTapSave"
      :loading="loading"
      color="primary"
    ><v-icon>add</v-icon></v-btn>
    </v-scale-transition>
  </v-layout>
</template>

<script>
export default {
  name: 'TutorialCases',
};
</script>
