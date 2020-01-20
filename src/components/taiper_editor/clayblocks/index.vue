<template>
  <v-card class="pa-2" flat>
    <v-layout align-center>
      <v-icon style="cursor: move" class="handle">drag_indicator</v-icon>
      <v-flex xs12>
        <p style="margin: auto">{{value.type}}</p>
      </v-flex>
      <v-icon>delete</v-icon>
    </v-layout>
  </v-card>
</template>

<script>
import FileClayblock from "./File";
import ImageClayblock from "./Image";
import TextClayblock from "./Text";
import VideoClayblock from "./Video";

export default {
  props: {
    value: {
      type: Object
    }
  },
  methods: {
    updateValue: function(value) {
      this.$emit("input", value);
    }
  }
};
</script>