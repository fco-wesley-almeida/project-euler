<template>
    <v-layout column>
      <span v-if="title" class="title">{{title}}</span>
      <v-card color="card">
        <v-card-text class="py-2">
          <taiper-editor :placeholderMessage="placeholderMessage" v-model="content" readonly />
        </v-card-text>
      </v-card>
  </v-layout>
</template>

<script>
import TaiperEditor from "@/components/taiper_editor/index";
export default {
  components: { TaiperEditor },
  props: {
    placeholderMessage: {
      default: () => null,
      type: String
    },
    content: Array,
    title: String
  }
};
</script>

