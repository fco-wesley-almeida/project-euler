<template>
  <v-app id="app">
    <v-content id="content">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  computed: {
    userID: {
      get() {
        return this.$store.state.app.userID;
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
</style>
