<template>
  <v-card flat>
    <v-icon style="cursor: move">drag_indicator</v-icon>
      {{value.type}}
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