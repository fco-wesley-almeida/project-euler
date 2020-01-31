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
      <v-btn text @click.native="didTapSave()">Salvar</v-btn>
    </v-toolbar>
    </v-flex>
    <v-card-text>
      <v-form>
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
              >{{contentDescription}}</span>
            </v-stepper-step>

            <v-stepper-content step="2">
              <taiper-editor v-model="tutorialCase.content"/>
            </v-stepper-content>

            <v-stepper-step step="3" editable>
              <span class="title">Objetivos</span>
              <span
                class="subtitle-2 disabled--text"
              >{{objectivesDescription}}</span>
            </v-stepper-step>

            <v-stepper-content step="3">
              <taiper-editor only="text/body" placeholder-message="Clique no botão de + para adicionar um objetivo" v-model="objectives"/>
            </v-stepper-content>
          </v-stepper>
        </v-flex>
      </v-layout>
      </v-form>
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
      },
      objectives: []
    };
  },
  computed: {
    contentDescription() {
      return this.tutorialCase.content.length + " items";
    },
    objectiveDescription() {
      return "Total: " + this.objectives.length;
    },
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
        cases
          .add(this.tutorialCase)
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
