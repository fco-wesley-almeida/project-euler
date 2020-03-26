<template>
  <v-text-field
    :rules="[formRules.required]"
    background-color="transparent"
    v-model="value.value"
    :readonly="readonly"
    :solo="readonly"
    :flat="readonly"
    :style="readonly ? 'margin-bottom: -20px;' : ''"
    :hide-details="readonly ? true : false"
    autofocus
    class="mx-2"
    v-if="type === 'title'"
    :class="textStyle"
  ></v-text-field>
  <v-textarea
    background-color="transparent"
    :style="readonly ? 'padding-left: 2px;' : ''"
    :hide-details="readonly ? true : false"
    :rules="[formRules.required]"
    v-model="value.value"
    :readonly="readonly"
    :solo="readonly"
    :flat="readonly"
    autofocus
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
    },
    readonly: {
      type: Boolean,
      default: false
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
