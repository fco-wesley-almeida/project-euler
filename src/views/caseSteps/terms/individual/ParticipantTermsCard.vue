<template>
  <v-card>
    <v-card-title class="mb-0 pb-0">{{participant.name}}</v-card-title>
    <v-card-text>
      <v-select
        :value="terms"
        readonly
        label=""
        multiple
      >
        <template
          slot="prepend"
        >
          <v-img
            :src="participant.imageURL || '/img/profile-default.jpg'"
            class="elevation-2"
            style="border-radius: 50%; padding-right: 12px; width: 100px; height: 100px"
          />
        </template>
      </v-select>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: {
      participant: Object,
      terms: Array
    }
  }
</script>
