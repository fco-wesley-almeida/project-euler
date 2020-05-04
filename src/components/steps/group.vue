<template>
  <v-card color="card">
    <v-card-title class="mb-0 pb-0 pr-2 my-auto">
      <span>{{group.title}}</span>
      <v-spacer />
      <v-btn icon fab small pl-3 v-if="showsMoreButton" color="primary" @click="participantDialog = true">
        <v-icon>group</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <taiper-editor v-model="answerContent" readonly placeholderMessage="Nenhuma resposta enviada" />
      <v-text-field
        class="my-3"
        readonly
        v-for="(participant, index) in shownParticipants"
        :key="participant.id"
        :value="participant.name"
        :hint="participant.email"
        persistent-hint
      >
        <template slot="prepend">
          <v-img
            :src="participant.imageURL || '/img/profile-default.jpg'"
            class="elevation-2"
            style="border-radius: 50%; padding-right: 12px; width: 30px; height: 30px"
          />
        </template>
        <template slot="append">
          <span v-if="index == 0">Relator</span>
          <span v-else-if="index == 1">Coordenador</span>
        </template>
      </v-text-field>
      <v-dialog scrollable v-model="participantDialog" v-if="participantDialog" max-width="500">
        <v-card color="card">
          <v-card-title color="primary">{{group.title}} - Integrantes</v-card-title>
          <v-card-text>
            <v-text-field
              class="my-3"
              readonly
              v-for="(participant, index) in participants"
              :key="participant.id"
              :value="participant.name"
              :hint="participant.email"
              persistent-hint
            >
              <template slot="prepend">
                <v-img
                  :src="participant.imageURL || '/img/profile-default.jpg'"
                  class="elevation-2"
                  style="border-radius: 50%; padding-right: 12px; width: 30px; height: 30px"
                />
              </template>
              <template slot="append">
                <span v-if="index == 0">Relator</span>
                <span v-else-if="index == 1">Coordenador</span>
                <span v-else>Participante</span>
              </template>
            </v-text-field>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card-text>
  </v-card>
</template>

<script>
import TaiperEditor from "@/components/taiper_editor/index";

export default {
  components: { TaiperEditor },
  props: {
    group: Object,
    participants: Array,
    answer: Object
  },
  data: () => ({
    participantDialog: false
  }),
  computed: {
    answerContent() {
      if (this.answer){
        return this.answer.content;
      }
      return [];
    },
    shownParticipants() {
      return this.participants.slice(0, 2);
    },
    showsMoreButton() {
      return this.participants.length > 2;
    }
  }
};
</script>

<style scoped>
.v-card__title {
  word-break: keep-all;
  word-wrap: break-word;
  hyphens: auto;
}
</style>
