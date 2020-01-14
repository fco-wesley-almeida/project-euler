<template>
  <v-app id="app">
    <toolbar
      v-if="userID !== null"
      @drawerChanged="drawer = !drawer"
    />
    <drawer :showDrawer="drawer" @drawerChanged="updateDrawer"/>
    <v-content id="content">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </v-content>
  </v-app>
</template>

<script>
import toolbar from '@/components/navigation/Toolbar.vue';
import drawer from '@/components/navigation/Drawer.vue';

export default {
  name: 'app',
  data: () => ({
    drawer: false,
    dialog: false,
  }),
  components: { toolbar, drawer },
  methods: {
    updateDrawer(value) {
      this.drawer = value;
    },
  },
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

::placeholder{
   opacity: 1;
}
</style>
