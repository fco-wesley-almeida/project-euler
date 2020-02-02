<template>
    <v-form ref="tutorialCaseForm" v-model="valid">
      <v-layout align-center justify-center my-5>
        <v-flex xs12 md8 lg6>
          <v-stepper non-linear v-model="stepper" vertical>
            <v-stepper-step step="1" editable :rules="[() => !hasBeenValidated || (tutorialCase.title !== '')]">
              <span class="title">Título{{tutorialCase.title ? ': ' + tutorialCase.title : ''}}</span>
              <span
                class="subtitle-2 disabled--text"
              >Será exibido aos alunos somente quando este caso estiver ativo</span>
            </v-stepper-step>

            <v-stepper-content step="1" >
              <v-text-field
                v-model="title"
                v-on="updateValue()"
                :rules="[formRules.required]"
                placeholder="Insira aqui o título do caso"
              />
            </v-stepper-content>

            <v-stepper-step step="2" editable :rules="[() => validContent]">
              <span class="title">Conteúdo</span>
              <span
                class="subtitle-2 disabled--text"
              >{{contentDescription}}</span>
            </v-stepper-step>

            <v-stepper-content step="2">
              <taiper-editor v-model="content"/>
            </v-stepper-content>

            <v-stepper-step step="3" editable :rules="[() => validObjectives]">
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
</template>

<script lang="ts">
import { db, Timestamp } from "@/firebase/db";
import { Tutorial } from "@/models/tutorial";
import { UserData } from "@/models/user";
import Vue from "vue";
import Router from "vue-router/types/vue";
import formRules from "@/utils/formRules";
import TaiperEditor from "@/components/taiper_editor/index.vue";

export default {
  mixins: [formRules],
  components: {TaiperEditor},
  data: () => ({
    stepper: 1,
    hasBeenValidated: false,
    title: "",
    content: [],
    objectives: [],
    valid: false
  }),
  props: {
    value: Object
  },
  watch: {
    value(newValue: any) {
      this.title = newValue.title;
      this.content = newValue.content;
      this.objectives = newValue.objectives;
    }
  },
  computed: {
    validContent() {
      return !this.hasBeenValidated || ( this.content.length > 0 && this.content.every( (clayblock) => {
        return clayblock.value !== "";
      } ));
    },
    validObjectives() {
      return !this.hasBeenValidated || ( this.objectives.length > 0 && this.objectives.every( (clayblock) => {
        return clayblock.value !== "";
      } ));
    },
    tutorialCase() : Object{
      return {
          title: this.title,
          content: this.content,
          objectives: this.objectives
      };
    },
    contentDescription() {
      return this.content.length + " items";
    },
    objectivesDescription() {
      return "Total: " + this.objectives.length;
    },
    minDate() {
      const date = new Date();
      const correctDate = new Date();
      correctDate.setDate(date.getDate() - 1);
      return correctDate.toISOString();
    }
  },
  methods: {
    updateValue() {
      let newValue = this.value;
      if (!newValue) {
        newValue = {};
      }
      newValue = Object.assign(newValue, this.tutorialCase);
      this.$emit("input", newValue);
    },
    clear() {
      let form = this.$refs.tutorialCaseForm as HTMLFormElement;
      form.reset();
      this.content = [];
      this.objectives = [];
    },
    validate() {
      this.hasBeenValidated = true;
      let form = this.$refs.tutorialCaseForm as HTMLFormElement;
      form.validate();
      if (this.valid && this.validContent && this.validObjectives) {
        this.updateValue();
      }
      this.$emit("validate", this.valid);
    },
  }
};
</script>