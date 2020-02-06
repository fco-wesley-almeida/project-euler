<template>
  <v-card
    color="background"
  >
    <v-flex>
    <v-toolbar color="primary" dark>
      <v-btn icon @click.native="didTapCancel()">
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title>Criação de Caso</v-toolbar-title>
      <v-spacer />
      <v-btn text :loading="loading" @click.native="didTapSave()">Salvar</v-btn>
    </v-toolbar>
    </v-flex>
    <v-card-text>
      <case-form ref="form" v-model="tutorialCase" @validate="checkValidation"/>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { db, Timestamp } from "@/firebase/db";
import formRules from "@/utils/formRules";
import CaseForm from "./form.vue"
import Vue from "vue";
import Router from "vue-router/types/vue";
import { TutorialCase } from "@/models/case";
import { createCase } from "@/firebase/api/case";

export default {
  mixins: [formRules],
  components: {CaseForm},
  data: () => ({
      stepper: 1,
      tutorialCase: new TutorialCase(),
      valid: false,
      loading: false
  }),
  methods: {
    didTapSave() {
      let form = this.$refs.form as any;
      form.validate();
      if (this.valid) {
        const vm = this;
        vm.loading = true;
        createCase(this.tutorialCase, this.$route.params.tutorialID).then(() => {
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
      this.loading = false;
      this.$emit("finished");
    }
  }
};
</script>
