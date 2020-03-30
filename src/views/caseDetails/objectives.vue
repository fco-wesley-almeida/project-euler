<template>
  <v-layout fill-height align-center justify-center px-2>
    <v-flex xs12 md8 lg6>
      <v-card>
        <v-card-text class="pt-2 pb-10">
          <taiper-editor v-model="tutorialCase.objectives" readonly />
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

