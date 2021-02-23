<template>
  <v-form ref="tutorialCaseForm" v-model="validForm">
    <v-layout align-center justify-center my-5>
      <v-flex xs12 md8 lg6>
        <v-stepper class="card" non-linear v-model="stepper" vertical>
          <v-stepper-step
            step="1"
            editable
            :rules="[() => !hasBeenValidated || (tutorialCase.title !== '')]"
          >
            <span class="title">Título{{tutorialCase.title ? ': ' + tutorialCase.title : ''}}</span>
            <span
              class="subtitle-2 disabled--text"
            >Será exibido aos alunos somente quando este caso estiver ativo</span>
          </v-stepper-step>

          <v-stepper-content step="1">
            <v-text-field
              v-model="title"
              v-on="updateValue()"
              :rules="[formRules.required]"
              placeholder="Insira aqui o título do caso"
            />
          </v-stepper-content>

          <v-stepper-step step="2" editable :rules="[() => validContent]">
            <span class="title">Conteúdo</span>
            <span class="subtitle-2 disabled--text">{{contentDescriptionCard('content')}}</span>
          </v-stepper-step>
          <v-stepper-content step="2">
            <taiper-editor v-model="content" />
          </v-stepper-content>

          <v-stepper-step step="3" editable :rules="[]">
            <span class="title">Anexos</span>
            <span class="subtitle-2 disabled--text">{{contentDescriptionCard('annexes')}}</span>
          </v-stepper-step>
          <v-stepper-content step="3">
            <taiper-editor v-model="annexes" />
          </v-stepper-content>

          <v-stepper-step step="4" editable :rules="[]">
            <span class="title">Referências</span>
            <span class="subtitle-2 disabled--text">{{contentDescriptionCard('references')}}</span>
          </v-stepper-step>
          <v-stepper-content step="4">
            <taiper-editor v-model="references" />
          </v-stepper-content>

          <v-stepper-step step="5" editable :rules="[() => validObjectives]">
            <span class="title">Objetivos</span>
            <span class="subtitle-2 disabled--text">{{objectivesDescription}}</span>
          </v-stepper-step>
          <v-stepper-content step="5">
            <taiper-editor
              only="text/body"
              placeholder-message="Clique no botão de + para adicionar um objetivo"
              v-model="objectives"
            />
          </v-stepper-content>
        </v-stepper>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import formRules from "@/utils/formRules";
import TaiperEditor from "@/components/taiper_editor/index.vue";

export default {
  mixins: [formRules],
  components: { TaiperEditor },
  data: () => ({
    stepper: 1,
    hasBeenValidated: false,
    title: "",
    content: [],
    annexes: [],
    references: [],
    objectives: [],
    validForm: false
  }),
  props: {
    value: Object,
  },
  mounted () {
    console.log(this.value)
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        console.log('watch')
        this.title = newValue.title || "";
        this.content = newValue.content || [];
        this.references = newValue.references || [];
        this.annexes = newValue.annexes || [];
        this.objectives = newValue.objectives || [];
      }
    }
  },
  computed: {
    valid() {
      let form = this.$refs.tutorialCaseForm;
      form.validate();
      return this.validForm && this.validContent && this.validObjectives;
    },
    validContent() {
      return (
        !this.hasBeenValidated ||
        (this.content.length > 0 &&
          this.content.every(clayblock => {
            return clayblock.value !== "";
          }))
      );
    },
    validObjectives() {
      return (
        !this.hasBeenValidated ||
        (this.objectives.length > 0 &&
          this.objectives.every(clayblock => {
            return clayblock.value !== "";
          }))
      );
    },
    tutorialCase() {
      return {
        title: this.title,
        content: this.content,
        objectives: this.objectives
      };
    },
    contentDescription() {
      if (this.content){
        return "Total: "+ this.content.length + " items";
      }
      return "Nenhum conteúdo inserido";
    },
    objectivesDescription() {
      if (this.objectives){
        return "Total: " + this.objectives.length;
      }
      return "Nenhum objetivo cadastrado";
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
    contentDescriptionCard (contentReference) {
      const cont = this[contentReference]
      if (cont){
        return "Total: "+ cont.length + " items";
      }
      return "Nenhum conteúdo inserido";
    },
    clear() {
      let form = this.$refs.tutorialCaseForm;
      form.reset();
      this.content = [];
      this.objectives = [];
    },
    validate() {
      this.hasBeenValidated = true;
      if (this.valid) {
        this.updateValue();
      }
      this.$emit("validate", this.valid);
    }
  }
};
</script>
