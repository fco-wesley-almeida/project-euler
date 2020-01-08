<template>
  <v-layout
    wrap
    align-center
    justify-center
    fill-height
    style="background-color: rgba(0, 0, 0, 0.75)"
  >
    <v-flex xs11 md6 lg4>
      <v-card
        class="mainModal"
        color="#F5F5F5"
        style="height: 80vh; position: relative; padding: 0px"
      >
        <v-toolbar color="primary" dark>
          <v-btn icon @click.native="didTapCancel()">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Criação de tutoria</v-toolbar-title>
          <v-spacer />
          <v-btn text @click.native="didTapSave()">Salvar</v-btn>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid" style="height: 100%; overflow: scroll;">
            <v-layout wrap pa-5 justify-center align-center>
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
                  <v-date-picker
                    class="mx-auto"
                    v-model="computedDate"
                    locale="pt-br"
                  />
                </v-layout>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { db, Timestamp } from '@/firebase/db';
import formRules from '@/utils/formRules';

const tutorials = db.collection('tutorials');

export default {
  mixins: [formRules],
  data() {
    return {
      name: '',
      description: '',
      groupSize: 1,
      date: '',
      formattedDate: '',
      valid: false,
      isoDate: null,
      loading: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.app.user;
    },
    computedDate: {
      get() {
        return this.isoDate;
      },
      set(v) {
        const date = new Date(v);
        this.isoDate = v;

        let day = date.getUTCDate();
        day = day >= 10 ? day : `0${day}`;

        let month = date.getUTCMonth();
        month += 1;
        month = month >= 10 ? month : `0${month}`;
        this.formattedDate = `${day}/${month}/${date.getUTCFullYear()}`;
      },
    },
    minDate() {
      const date = new Date();
      const correctDate = new Date();
      correctDate.setDate(date.getDate() - 1);
      return correctDate.toISOString();
    },
  },
  methods: {
    didTapSave() {
      if (this.valid) {
        const vm = this;
        vm.loading = true;
        tutorials
          .add({
            name: this.name,
            date: Timestamp.fromDate(new Date(this.computedDate)),
            description: this.description,
            creationDate: Timestamp.now(),
            teacherID: this.$store.state.app.userID,
            students: [],
            cases: [],
            finishedCases: 0,
            scheduledCases: 0,
            currentCase: null,
          })
          .then(() => {
            vm.close();
          });
      } else {
        this.$refs.form.validate();
      }
    },
    didTapCancel() {
      this.close();
    },

    close() {
      this.loading = false;
      this.name = '';
      this.date = '';
      this.formattedDate = '';
      this.groupSize = 1;
      this.$emit('finished');
    },
  },
};
</script>

<style scoped>
.mainModal > .v-card__text {
  height: 88%;
  padding-bottom: 0px;
}
</style>
