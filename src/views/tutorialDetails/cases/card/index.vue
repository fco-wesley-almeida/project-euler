<template>
  <component 
    :is="component"
    :tutorialCase="tutorialCase"
    :canBeActive="canBeActive"
  />
</template>

<script lang="ts">
import Vue from "vue";
import Router from "vue-router/types/vue";
import EditCase from "./edition/index.vue";
import ActiveCaseCard from "./active.vue";
import ScheduledCaseCard from "./scheduled.vue";
import { removeCaseFromTutorial } from "@/firebase/api/case";
import { TutorialCase } from "@/models/case";

export default Vue.extend({
  name: "TutorialCaseCard",
  components: { ScheduledCaseCard },
  props: {
    tutorialCase: Object,
    canBeActive: Boolean
  },
  computed: {
    receivedTutorialCase(): TutorialCase {
      return this.$props.tutorialCase;
    },
    component() {
      if (this.receivedTutorialCase.status == "scheduled"){
        return ScheduledCaseCard;
      }

      if (this.receivedTutorialCase.status == "active"){
        return ActiveCaseCard;
      }

      return ScheduledCaseCard;
    }
  },
});
</script>
