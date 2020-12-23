<template>
  <default-dialog
    :value="enabled"
    :title="title"
    :color="dialogColor"
    @input="close"
  >
    <p class="pt-2">{{ confirmationMessage }}</p>
    <slot></slot>
    <template slot="actions">
      <v-spacer />
      <v-btn text dark color="disabled" @click="close(false)">{{ abortButtonMessage }}</v-btn>
      <v-btn v-if="confirmationButtonMessage" dark :color="confirmationButtonColor" @click="close(true)">{{ confirmationButtonMessage }}</v-btn>
    </template>
  </default-dialog>
</template>

<script>
import DefaultDialog from '@/components/dialogs/Default'
export default {
  components: { DefaultDialog },
  props: {
    title: { required: true, type: String },
    enabled: { required: true, type: Boolean },
    dialogColor: { required: true, type: String },
    abortButtonMessage: { default: 'Cancelar', type: String },
    confirmationButtonColor: { required: true, type: String },
    confirmationButtonMessage: { default: '', type: String },
    confirmationMessage: { required: true, type: String }
  },
  methods: {
    close (confirm) {
      this.$emit(confirm ? 'confirm' : 'abort')
    }
  }
}
</script>


