<template>
  <v-text-field
    :rules="[formRules.required]"
    v-model="value.value"
    class="mx-2"
    v-if="type === 'title'"
    :class="textStyle"
  ></v-text-field>
  <v-textarea
    :rules="[formRules.required]"
    v-model="value.value"
    class="mx-2"
    auto-grow
    rows="1"
    v-else
    :class="textStyle"
  ></v-textarea>
</template>

<script>
import formRules from "@/utils/formRules";
export default {
  mixins: [formRules],
  props: {
    value: {
      type: Object
    }
  },
  methods: {
    updateValue: function(value) {
      this.$emit("input", value);
    }
  },
  computed: {
    type() {
      if (this.value.type.includes("title")) {
        return "title";
      }
      return "body";
    },
    textStyle() {
      if (this.type === "title") {
        return "headline font-weight-bold";
      }
      return this.type;
    }
  }
};
</script>