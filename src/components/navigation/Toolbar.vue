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
    <fullscreen-dialog v-model="profileDialog" title="Editar perfil">
        <edit-profile />
    </fullscreen-dialog>
  </v-app-bar>
</template>

<script>
import { mapMutations } from "vuex";
import { auth } from "@/firebase/config";
import EditProfile from "@/views/profile/index";
import FullscreenDialog from "@/components/dialogs/Fullscreen";

export default {
  data: () => ({
    logo: "/assets/logo.png",
    title: null,
    profileDialog: false,
    menuOptions: [
      { title: "Editar perfil", route: "profileDialog" },
      { title: "Sair", route: "/login" }
    ]
  }),
components: { FullscreenDialog, EditProfile },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown;
    },
    userName() {
      return auth.currentUser.displayName || auth.currentUser.email;
    },
    avatarContent() {
      return this.$store.state.app.user.imageURL || auth.currentUser.photoURL || '/img/profile-default.jpg';
    }
  },

  mounted() {
    this.title = this.$route.name;
  },

  watch: {
    $route(val) {
      if (val.meta && val.meta.breadcrumbs) {
        let text = val.meta.breadcrumbs[val.meta.breadcrumbs.length-1].text;
        this.title = this.$store.state.app[text] || text || val.name;
      } else {
        this.title = val.name;
      }
    }
  },

  methods: {
    ...mapMutations("app", ["setDrawer", "toggleDrawer", "user"]),
    onClickBtn() {
      this.setDrawer(!this.$store.state.app.drawer);
    },
    onMenuClick(item) {
      if (item.route == "profileDialog"){
        this.profileDialog = true;
      }
      else{
      this.$router.push(item.route);
      }
    }
  }
};
</script>

<style scoped>
.v-toolbar {
  flex: none;
}
</style>
