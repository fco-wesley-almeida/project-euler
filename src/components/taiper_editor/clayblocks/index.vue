<template>
  <v-card flat>
    <v-layout align-center>
      <v-icon style="cursor: move" class="handle">drag_indicator</v-icon>
      <v-flex xs12>
        <component v-bind:is="shownComponent" v-model="value"/>
      </v-flex>
      <v-icon color="error" @click="remove">delete</v-icon>
    </v-layout>
  </v-card>
</template>

<script>
import FileClayblock from "./File";
import ImageClayblock from "./Image";
import TextClayblock from "./Text";
import VideoClayblock from "./Video";

export default {
  components: {FileClayblock, ImageClayblock, TextClayblock, VideoClayblock},
  props: {
    value: {
      type: Object
    }
  },
  computed: {
    shownComponent() {
      console.log(this.value.type);
      if (this.value.type.includes("text")) {
        return TextClayblock;
      }
      if (this.value.type.includes("image")) {
        return ImageClayblock;
      }
      if (this.value.type.includes("file")) {
        return FileClayblock;
      }
      if (this.value.type.includes("video")) {
        return VideoClayblock;
      }
      return TextClayblock;
    }
  },
  methods: {
    updateValue: function(value) {
      this.$emit("input", value);
    },
    remove(){
      this.$emit("remove");
    }
  }
};
</script>