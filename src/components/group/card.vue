<template>
  <v-card>
    <v-card-title class="mb-0 pb-0">{{group.title}}</v-card-title>
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
</template>

<script>
export default {
  props: {
    group: Object,
    participants: Array
  }
};
</script>

<style scoped>
.v-card__title{
  word-wrap: break-word;
  hyphens: auto;
}
</style>
