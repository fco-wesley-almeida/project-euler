<template>
  <v-layout align-center justify-center wrap>
    <v-flex xs11 md8 lg6 xl4>
      <v-card class="mt-3">
        <v-layout column class="pa-4">
          <v-select :items="participantOptions" v-model="participants"
                    v-on:change="didChangeParticipants" label="Nº de participantes por grupo"/>
          <v-select :hint="remainderLabel" persistent-hint :items="participantOptions"
                    v-model="groups" v-on:change="didChangeGroups" label="Nº de grupos"/>
          <v-btn :disabled="!canAdvance" class="mt-5" color="primary" @click="didTapAdvance">Avançar</v-btn>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: "GroupSize",
    data() {
      return {
        participants: null,
        groups: null,
        remainder: 0
      }
    },
    props: {
      numberOfParticipants: {
        type: Number
      }
    },
    computed: {
      participantOptions() {
        let size = this.$props.numberOfParticipants || 100;
        let array = [];
        for (var i = 1; i <= size; i++) {
          array.push({text: "" + i, value: i});
        }
        return array;
      },
      remainderLabel() {
        if (this.remainder <= 0) {
          return "";
        }
        if (this.remainder == 1) {
          return this.remainder + " participante sobrando! Um dos grupos possuirá " + (this.participants + 1) + " participantes."
        }
        return this.remainder + " participantes sobrando! " + this.remainder + " grupos possuirão " + (this.participants + 1) + " participantes."
      },
      canAdvance() {
        return this.participants != null && this.groups != null;
      }
    },
    methods: {
      didChangeParticipants(newValue) {
        let size = this.$props.numberOfParticipants || 100;
        this.groups = Math.floor(size / newValue);
        this.remainder = size % newValue;
      },
      didChangeGroups(newValue) {
        let size = this.$props.numberOfParticipants || 100;
        this.participants = Math.floor(size / newValue);
        this.remainder = size % newValue;
      },
      didTapAdvance(){
        this.$emit("finished", this.participants, this.groups, this.remainder);
      }
    }
  };
</script>

<style>
  input[type="file"] {
    display: none;
  }
</style>
