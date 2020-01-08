<template>
  <v-app id="app">
    <toolbar
      v-if="userID !== null"
    />
    <v-content id="content">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </v-content>
  </v-app>
</template>

<script>
import toolbar from '@/components/navigation/Toolbar.vue';

export default {
  name: 'app',
  components: { toolbar },
  computed: {
    userID: {
      get() {
        return this.$store.state.app.user;
      },
    },
    padding: {
      get() {
        return 0;
      },
    },
  },
};
</script>

<style>

#app {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: var(--v-background-base);
}

.theme--light.v-card .v-card__subtitle, .theme--light.v-card > .v-card__text {
  color: #ff0000;
}
</style>
