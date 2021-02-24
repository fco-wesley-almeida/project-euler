<template>
  <v-dialog v-model="value" fullscreen scrollable transition="dialog-bottom-transition">
    <v-card color="background">
      <v-flex>
        <v-toolbar color="primary" dark>
          <v-btn icon @click.native="updateValue(false)">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{title}}</v-toolbar-title>
        </v-toolbar>
      </v-flex>
      <v-card-text>
        <slot v-if="value"></slot>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "FullscreenDialog",
  props: {
    value: {
      type: Boolean
    },
    title: {
      type: String
    }
  },
  methods: {
    updateValue: function(value) {
      this.$emit("input", value);
    }
  }
};
</script>


