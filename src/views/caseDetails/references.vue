<template>
  <v-layout fill-height align-center justify-center pa-2>
    <v-flex xs12 md8 lg6>
        <case-content :title="tutorialCase.title" :content="tutorialCase.references"/>
    </v-flex>
  </v-layout>
</template>

<script>
import CaseContent from "@/components/case/content";
export default {
  components: { CaseContent },
  props: {
    tutorialCase: Object
  }
};
</script>

