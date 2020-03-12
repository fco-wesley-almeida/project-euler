<template>
  <v-card>
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
        <v-chip-group
          column
          multiple
          :value="terms"
          class="my-auto"
          v-if="terms.length > 0"
        >
          <v-chip :value="term" text-color="primary" color="primary" outlined v-for="term in terms" :key="term">
            {{ term }}
          </v-chip>
        </v-chip-group>
        <span v-else class="my-auto">Nenhum termo</span>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: {
      participant: Object,
      terms: Array
    },
    mounted() {
    }
  }
</script>
