<template>
  <v-layout wrap justify-center align-center pb-5>
    <v-flex xs12 md10 lg6>
      <v-card>
        <v-card-text>
          <tutorial-form ref="form" v-model="tutorial" @validate="checkValidation" />
        </v-card-text>
      </v-card>
    </v-flex>
    <v-scale-transition>
    <v-btn
      v-show="tutorialHasChanged"
      small
      dark
      fab
      style="position: fixed; bottom: 0; right: 0; margin-right: 120px; margin-bottom: 72px"
      @click="didTapRevert"
      color="disabled"
    >
      <v-icon>undo</v-icon>
    </v-btn>
    </v-scale-transition>
    <v-scale-transition>
    <v-btn
      v-show="tutorialHasChanged"
      primary
      dark
      style="position: fixed; bottom: 0; right: 0; margin-right: 16px; margin-bottom: 72px"
      @click.native.stop="didTapSave"
      :loading="loading"
      color="primary"
    >Salvar</v-btn>
    </v-scale-transition>

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
import TutorialForm from '@/views/tutorials/creation/form'

export default {
  name: 'TutorialInfo',
  components: {TutorialForm},
  data() {
    return {
      tutorial: undefined,
      snackbar: false,
      originalTutorial: undefined,
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
      if (this.tutorial && this.originalTutorial){

      return (
        this.tutorial.name !== this.originalTutorial.name
        || this.tutorial.description !== this.originalTutorial.description
        || this.tutorial.date.toDate().toISOString() !== this.originalTutorial.date.toDate().toISOString()
      );
      }
      return false; 
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
    checkValidation(value){
      this.valid = value;
    },
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
      this.$refs.form.validate();
      if (this.valid) {
        const vm = this;
        vm.loading = true;
        this.tutorialRef.update(this.tutorial).then(() => {
          vm.loading = false;
          vm.snackbar = true;
        });
      }
    },
    didTapRevert() {
      let revertObject = {};
      Object.assign(revertObject, this.originalTutorial);
      this.tutorial = revertObject;
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
