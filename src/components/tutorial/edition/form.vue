<template>
  <v-form ref="form" v-model="valid">
    <v-flex xs12>
      <v-textarea
        v-model="name"
        v-on="updateValue()"
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
        v-on="updateValue()"
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
        v-on="updateValue()"
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

<script>
import { Timestamp } from "@/firebase/config";
import formRules from "@/utils/formRules";

export default {
  mixins: [formRules],
  data: () => ({
    name: "",
    description: "",
    date: "",
    valid: false,
    isoDate: null,
    loading: false
  }),
  props: {
    value: Object
  },
  watch: {
    value(newValue) {
      let timestamp = newValue.date;
      if (timestamp != null) {
        let date = timestamp.toDate();
        this.isoDate = date.toISOString().split("T")[0]
      }
      this.name = newValue.name;
      this.description = newValue.description;
    }
  },
  computed: {
    tutorial() {
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
    userData() {
      return this.$store.state.app.user;
    },
    formattedDate() {
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
      let form = this.$refs.form;
      form.validate();
      if (this.valid) {
        this.updateValue();
      }
      this.$emit("validate", this.valid);
    },
    clear() {
      let form = this.$refs.form;
      form.reset();
    },
    updateValue() {
      let newValue = this.value;
      if (!newValue) {
        newValue = {};
      }
      newValue = Object.assign(newValue, this.tutorial);
      this.$emit("input", newValue);
    }
  }
};
</script>
