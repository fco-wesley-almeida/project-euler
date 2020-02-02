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
    <v-card-text>
      <v-layout wrap justify-center align-center>
        <v-flex xs12 md8 lg6>
          <v-card>
            <v-card-text>
              <tutorial-form ref="form" v-model="tutorial" @validate="checkValidation" />
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Router from "vue-router/types/vue";
import TutorialForm from "./form.vue";
import { Tutorial } from "@/models/tutorial";
import { UserData } from "@/models/user";
import { db, Timestamp } from "@/firebase/db";
import { createTutorial } from "@/firebase/api/tutorial";

export default {
  components: { TutorialForm },
  data: () => ({
    tutorial: {} as Tutorial,
    valid: false,
    loading: false
  }),
  computed: {
    userData(): UserData {
      return this.$store.state.app.user;
    }
  },
  methods: {
    didTapSave() {
      let form = this.$refs.form as any;
      form.validate();
      if (this.valid) {
        console.log(this.valid);
        const vm = this;
        vm.loading = true;
        this.tutorial.teacherID = this.userData.uid;
        this.tutorial.teacherName = this.userData.name;
        this.tutorial.creationDate = Timestamp.fromDate(new Date());
        createTutorial(this.tutorial).then(() => {
          vm.close();
        });
      }
    },
    didTapCancel() {
      this.close();
    },
    checkValidation(v: boolean) {
      this.valid = v;
    },
    close() {
      this.tutorial = {} as Tutorial;
      let form = this.$refs.form as any;
      form.clear();
      this.$emit("finished");
    }
  }
};
</script>
