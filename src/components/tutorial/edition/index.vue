<template>
  <v-card color="background">
    <v-flex>
      <v-toolbar color="primary" dark>
        <v-btn icon @click.native="didTapCancel()">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Criação de tutoria</v-toolbar-title>
        <v-spacer />
        <v-btn text @click.native="didTapSave()">Salvar</v-btn>
      </v-toolbar>
    </v-flex>
    <v-card-text class="pa-5">
      <v-layout wrap justify-center align-center>
        <v-flex xs12 md8 lg6>
          <v-card color="card">
            <v-card-text>
              <tutorial-form ref="form" v-model="tutorial" @validate="checkValidation" />
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import TutorialForm from "./form.vue";
import { Tutorial } from "@/firebase/models/tutorial";
import { createTutorial } from "@/firebase/api/tutorial";

export default {
  components: { TutorialForm },
  data: () => ({
    tutorial: new Tutorial(),
    valid: false,
    loading: false
  }),
  computed: {
    userData() {
      return this.$store.state.app.user;
    }
  },
  methods: {
    didTapSave() {
      let form = this.$refs.form;
      form.validate();
      if (this.valid) {
        const vm = this;
        vm.loading = true;
        createTutorial(
          this.tutorial,
          this.userData.uid,
          this.userData.name
        ).then(() => {
          vm.close();
        });
      }
    },
    didTapCancel() {
      this.close();
    },
    checkValidation(v) {
      this.valid = v;
    },
    close() {
      this.tutorial = new Tutorial();
      let form = this.$refs.form;
      form.clear();
      this.$emit("finished");
    }
  }
};
</script>
