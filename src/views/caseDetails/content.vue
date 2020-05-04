<template>
  <v-layout fill-height align-center justify-center pa-2>
    <v-flex xs12 md8 lg6>
      <v-card color="card">
        <v-card-text class="py-2">
          <taiper-editor v-model="tutorialCase.content" readonly />
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import TaiperEditor from "@/components/taiper_editor/index";
export default {
  components: { TaiperEditor },
  props: {
    tutorialCase: Object
  }
};
</script>

