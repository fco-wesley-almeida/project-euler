<template>
  <v-card color="card">
    <v-card-title class="mb-0 pb-0">{{participant.name}}</v-card-title>
    <v-card-text>
      <v-layout>
        <div class="mr-3">
      <v-img
        :src="participant.imageURL || '/img/profile-default.jpg'"
        class="elevation-2"
        style="border-radius: 50%; padding-right: 12px; width: 75px; height: 75px"
      />
        </div>
        <taiper-editor v-if="answer" v-model="answer.content" readonly />
        <span v-else class="my-auto">Nenhuma resposta enviada</span>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import TaiperEditor from "@/components/taiper_editor/index";

  export default {
  components: { TaiperEditor },
    props: {
      participant: Object,
      answer: Object
    }
  }
</script>
