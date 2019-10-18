<template>
  <v-app id="app">
    <v-content>
      <v-fade-transition mode="out-in">
        <router-view :key="$route.path" />
      </v-fade-transition>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'app',
};

</script>

<style>
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
