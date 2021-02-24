<template>
    <steps :stepsToRender="[1,2,3,4,5]" :tutorialCase="tutorialCase"/>
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