<template>
  <v-layout align-center>
    <v-icon v-if="!readonly" style="cursor: move" class="handle">drag_indicator</v-icon>
    <v-flex xs12>
      <component :readonly="readonly" v-bind:is="shownComponent" v-model="value" />
    </v-flex>
    <v-icon v-if="!readonly" color="error" @click="remove">delete</v-icon>
  </v-layout>
</template>

<script>
import FileClayblock from "./File";
import ImageClayblock from "./Image";
import TextClayblock from "./Text";
import VideoClayblock from "./Video";

export default {
  components: { FileClayblock, ImageClayblock, TextClayblock, VideoClayblock },
  props: {
    value: {
      type: Object
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    shownComponent() {
      if (this.value.type.includes("file")) {
        return FileClayblock;
      } else if (this.value.type.includes("text")) {
        return TextClayblock;
      } else if (this.value.type.includes("image")) {
        return ImageClayblock;
      } else if (this.value.type.includes("video")) {
        return VideoClayblock;
      }
      return TextClayblock;
    }
  },
  methods: {
    updateValue: function(value) {
      this.$emit("input", value);
    },
    remove() {
      this.$emit("remove");
    }
  }
};
</script>
