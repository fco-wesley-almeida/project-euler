<template>
  <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="white">
    <v-toolbar-title class="display-1 black--text">
      <v-app-bar-nav-icon @click.stop="$emit('drawerChanged')"></v-app-bar-nav-icon>
      {{ title }}
    </v-toolbar-title>
    <v-spacer />
    <v-menu>
      <template v-slot:activator="{on}">
        <v-avatar size="40" v-on="on" style="cursor: pointer">
          <v-img :src="avatarContent" />
        </v-avatar>
      </template>
      <v-list>
        <v-subheader>{{ userName }}</v-subheader>
        <v-divider />
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, index) in menuOptions" :key="index" @click="onMenuClick(item)">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapMutations } from 'vuex';
import { auth } from '@/firebase/db';

export default {
  data: () => ({
    logo: '/assets/logo.png',
    title: null,
    menuOptions: [
      { title: 'Editar perfil', route: '/editarPerfil' },
      { title: 'Sair', route: '/login' },
    ],
  }),

  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown;
    },
    userName() {
      return auth.currentUser.displayName;
    },
    avatarContent() {
      return auth.currentUser.photoURL;
    },
  },

  mounted() {
    this.title = this.$route.name;
  },

  watch: {
    $route(val) {
      if (val.meta.breadcrumb !== 'disabled') {
        this.title = this.$store.state.app[val.meta.breadcrumb] || val.name;
      } else {
        this.title = val.name;
      }
    },
  },

  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer', 'user']),
    onClickBtn() {
      this.setDrawer(!this.$store.state.app.drawer);
    },
    onMenuClick(item) {
      this.$router.push(item.route);
    },
  },
};
</script>

<style scoped>
.v-toolbar {
  flex: none;
}
</style>
