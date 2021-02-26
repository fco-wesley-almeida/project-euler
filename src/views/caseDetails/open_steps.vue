<template>
    <steps 
        :stepsToRender="[1,2,3,4,5]"
        :tutorialCase="tutorialCase"
        :messageAdvance="{
            step: 5,
            message: 'Dirija-se ao passo de fechamento.'
        }"
    />
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