<template>
    <steps :stepsToRender="[6,7]" :tutorialCase="tutorialCase"/>
</template>

<script>
import Steps from "./steps.vue";

export default {
  components: { Steps },
  props: {
    tutorialCase: Object,
  },
};
</script>