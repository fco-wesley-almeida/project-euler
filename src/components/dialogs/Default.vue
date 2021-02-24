<template>
  <v-dialog
    @click.native="updateValue(false)"
    v-model="value"
    max-width="500px"
    scrollable
    persistent
    transition="dialog-bottom-transition"
  >
    <v-card color="background">
      <v-flex>
        <v-toolbar :color="color" dark>
          <v-btn icon @click.native="updateValue(false)">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{title}}</v-toolbar-title>
          <v-spacer />
          <slot name="rightButton"></slot>
        </v-toolbar>
      </v-flex>
      <v-card-text class="pb-0">
        <slot v-if="value"></slot>
      </v-card-text>
      <v-card-actions>
        <slot name="actions"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean
    },
    title: {
      type: String
    },
    color: {
      type: String,
      default: 'primary'
    }
  },
  methods: {
    updateValue (v) {
      this.$emit('input', v)
    }
  }
}
</script>