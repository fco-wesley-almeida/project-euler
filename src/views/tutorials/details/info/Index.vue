<template>
  <v-layout wrap justify-center align-center pb-5>
    <v-flex xs12 md10 lg6>
      <v-card>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-layout wrap pa-5 justify-center align-center>
              <v-flex xs12>
                <v-textarea
                  v-model="tutorial.name"
                  :rules="[formRules.required]"
                  color="accent"
                  label="Título"
                  auto-grow
                  rows="1"
                />
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  v-model="tutorial.description"
                  prepend-icon="assignment"
                  color="accent"
                  label="Descrição"
                  auto-grow
                  rows="1"
                />
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  slot="activator"
                  :rules="[formRules.required]"
                  v-model="formattedDate"
                  xs12
                  pb-2
                  label="Data de início"
                  prepend-icon="event"
                  readonly
                />
                <v-layout wrap column align-start justify-center>
                  <v-date-picker class="mx-auto" v-model="computedDate" locale="pt-br" />
                </v-layout>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-btn
      v-show="tutorialHasChanged"
      small
      dark
      fab
      style="position: fixed; bottom: 0; right: 0; margin-right: 112px; margin-bottom: 64px"
      @click="didTapRevert"
      color="disabled"
    >
      <v-icon>undo</v-icon>
    </v-btn>
    <v-btn
      v-show="tutorialHasChanged"
      primary
      dark
      style="position: fixed; bottom: 0; right: 0; margin-right: 8px; margin-bottom: 64px"
      @click="didTapSave"
      :loading="loading"
      color="primary"
    >Salvar</v-btn>

    <v-snackbar
      v-model="snackbar"
      color="success"
      bottom
      right
      :timeout="2000"
    >Salvo com sucesso!</v-snackbar>
  </v-layout>
</template>

<script>
import { db, Timestamp } from '@/firebase/db';
import formRules from '@/utils/formRules';

export default {
  name: 'TutorialInfo',
  mixins: [formRules],
  data() {
    return {
      tutorial: {
        name: '',
        description: '',
        date: '',
      },
      snackbar: false,
      originalTutorial: {},
      formattedDate: '',
      isoDate: null,
      valid: false,
      loading: false,
    };
  },
  mounted() {
    this.$bind(
      'originalTutorial',
      db.collection('tutorials').doc(this.$route.params.tutorialID),
    );
    this.$bind(
      'tutorial',
      db.collection('tutorials').doc(this.$route.params.tutorialID),
    );
  },
  computed: {
    tutorialHasChanged() {
      return (
        this.tutorial.name !== this.originalTutorial.name
        || this.tutorial.description !== this.originalTutorial.description
        || this.tutorial.date !== this.originalTutorial.date
      );
    },
    user() {
      return this.$store.state.app.user;
    },
    tutorialRef() {
      return db.collection('tutorials').doc(this.$route.params.tutorialID);
    },
    computedDate: {
      get() {
        if (this.tutorial.date) {
          const dateString = this.tutorial.date.toDate().toISOString();
          const dateArray = dateString.split('T');
          if (this.formattedDate === '') {
            this.updateFormattedDate(dateArray[0]);
          }
          return dateArray[0];
        }
        return null;
      },
      set(v) {
        const date = new Date(v);
        this.tutorial.date = Timestamp.fromDate(new Date(v));
        let day = date.getUTCDate();
        day = day >= 10 ? day : `0${day}`;
        let month = date.getUTCMonth();
        month += 1;
        month = month >= 10 ? month : `0${month}`;
        this.formattedDate = `${day}/${month}/${date.getUTCFullYear()}`;
      },
    },
  },
  methods: {
    updateFormattedDate(v) {
      const date = new Date(v);
      let day = date.getUTCDate();
      day = day >= 10 ? day : `0${day}`;
      let month = date.getUTCMonth();
      month += 1;
      month = month >= 10 ? month : `0${month}`;
      this.formattedDate = `${day}/${month}/${date.getUTCFullYear()}`;
    },
    didTapSave() {
      if (this.valid) {
        const vm = this;
        vm.loading = true;
        this.tutorialRef.update(this.tutorial).then(() => {
          vm.loading = false;
          vm.snackbar = true;
        });
      } else {
        this.$refs.form.validate();
      }
    },
    didTapRevert() {
      this.tutorial.name = this.originalTutorial.name;
      this.tutorial.description = this.originalTutorial.description;
      this.tutorial.date = this.originalTutorial.date;
    },

    close() {
      this.loading = false;
      this.name = '';
      this.date = '';
      this.formattedDate = '';
      this.$emit('finished');
    },
  },
};
</script>
