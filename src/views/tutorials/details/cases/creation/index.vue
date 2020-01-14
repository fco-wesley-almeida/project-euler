<template>
  <v-card
    color="background"
  >
    <v-toolbar color="primary" dark>
      <v-btn icon @click.native="didTapCancel()">
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title>Criação de Caso</v-toolbar-title>
      <v-spacer />
      <v-btn text @click.native="didTapSave()">Salvar</v-btn>
    </v-toolbar>
    <v-card-text>
      <v-layout align-center justify-center my-5>
        <v-flex xs12 md8 lg6>
          <v-stepper non-linear v-model="stepper" vertical>
            <v-stepper-step step="1" editable :rules="[() => tutorialCase.title !== '' || stepper == 1]">
              <span class="title">Título{{tutorialCase.title ? ': ' + tutorialCase.title : ''}}</span>
              <span
                class="subtitle-2 disabled--text"
              >Será exibido aos alunos somente quando este caso estiver ativo</span>
            </v-stepper-step>

            <v-stepper-content step="1" >
              <v-text-field
                v-model="tutorialCase.title"
                placeholder="Insira aqui o título do caso"
              />
            </v-stepper-content>

            <v-stepper-step step="2" editable>
              <span class="title">Conteúdo</span>
              <span
                class="subtitle-2 disabled--text"
              >5000 caracteres. 3 vídeos. 2 fotos.</span>
            </v-stepper-step>

            <v-stepper-content step="2">
              <taiper-editor v-model="tutorialCase.content"/>
            </v-stepper-content>

            <v-stepper-step step="3" editable>
              <span class="title">Objetivos</span>
              <span
                class="subtitle-2 disabled--text"
              >Total: 5</span>
            </v-stepper-step>

            <v-stepper-content step="3">
              <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
            </v-stepper-content>
          </v-stepper>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import { db, Timestamp } from "@/firebase/db";
import formRules from "@/utils/formRules";
import TaiperEditor from "@/components/taiper_editor/index";

const cases = db.collection("cases");

export default {
  mixins: [formRules],
  components: {TaiperEditor},
  data() {
    return {
      stepper: 1,
      tutorialCase: {
        title: "",
        content: []
      }
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
      }
    },
    minDate() {
      const date = new Date();
      const correctDate = new Date();
      correctDate.setDate(date.getDate() - 1);
      return correctDate.toISOString();
    }
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
            currentCase: null
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
      this.name = "";
      this.date = "";
      this.formattedDate = "";
      this.groupSize = 1;
      this.$emit("finished");
    }
  }
};
</script>
