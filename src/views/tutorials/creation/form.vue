<template>
  <v-form lazy-validation ref="form" v-model="valid">
    <v-flex xs12>
      <v-textarea
        v-model="name"
        :rules="[formRules.required]"
        color="accent"
        label="Título"
        auto-grow
        rows="1"
      />
    </v-flex>
    <v-flex xs12>
      <v-textarea
        v-model="description"
        prepend-icon="assignment"
        color="accent"
        label="Descrição"
        auto-grow
        rows="1"
      />
    </v-flex>
    <v-flex xs12>
      <v-text-field
        readonly
        slot="activator"
        :rules="[formRules.required]"
        v-model="formattedDate"
        xs12
        pb-2
        label="Data de início"
        prepend-icon="event"
      />
      <v-layout wrap column align-start justify-center>
        <v-date-picker landscape full-width class="mx-auto" v-model="isoDate" locale="pt-br" />
      </v-layout>
    </v-flex>
  </v-form>
</template>

<script lang="ts">
import { db, Timestamp } from "@/firebase/db";
import { Tutorial } from "@/models/tutorial";
import { UserData } from "@/models/user";
import Vue from "vue";
import Router from "vue-router/types/vue";
import formRules from "@/utils/formRules";

export default {
  mixins: [formRules],
  data: () => ({
    name: "",
    description: "",
    date: "",
    valid: false,
    isoDate: null as string | null,
    loading: false
  }),
  props: {
    value: Object
  },
  computed: {
    tutorial(): Object {
      let date = null;
      if (this.isoDate != null) {
        date = Timestamp.fromDate(new Date(this.isoDate));
      }
      return {
        name: this.name,
        description: this.description,
        date: date
      };
    },
    userData(): UserData {
      return this.$store.state.app.user;
    },
    formattedDate(): string | null {
      if (this.isoDate == null) {
        return null;
      }
      const date = new Date(this.isoDate);

      let day = date.getUTCDate();
      let dayString = day >= 10 ? `${day}` : `0${day}`;

      let month = date.getUTCMonth();
      month += 1;
      let monthString = month >= 10 ? `${month}` : `0${month}`;
      return `${dayString}/${monthString}/${date.getUTCFullYear()}`;
    },
    minDate() {
      const date = new Date();
      const correctDate = new Date();
      correctDate.setDate(date.getDate() - 1);
      return correctDate.toISOString();
    }
  },
  methods: {
    validate() {
      let form = this.$refs.form as HTMLFormElement;
      form.validate();
      if (this.valid) {
        this.updateValue();
      }
      this.$emit("validate", this.valid);
    },
    clear(){
      let form = this.$refs.form as HTMLFormElement;
      form.reset();
    },
    updateValue() {
      let newValue = this.value;
      if (!newValue){
          newValue = {};
      }
      newValue = Object.assign(newValue, this.tutorial);
      this.$emit("input", newValue);
    }
  }
};
</script>