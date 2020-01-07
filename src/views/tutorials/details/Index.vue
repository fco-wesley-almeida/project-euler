<template>
  <v-layout wrap justify-center align-center pa-5>
      <v-bottom-navigation
    v-model="bottomNav"
    color="primary"
    fixed
  >
    <v-btn>
      <span>Informações</span>
      <v-icon>info</v-icon>
    </v-btn>

    <v-btn>
      <span>Casos</span>
      <v-icon>list</v-icon>
    </v-btn>

    <v-btn>
      <span>Notas</span>
      <v-icon>assignment_turned_in</v-icon>
    </v-btn>
  </v-bottom-navigation>
  </v-layout>
</template>

<script>
export default {
  name: 'Tutorial',
  data: () => ({
    bottomNav: 0,
  }),
};
</script>
