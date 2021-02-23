<template>
  <div class="">
    <v-btn icon @click="toogleVisibility">
      <v-icon class="">
        {{ attachment.visible ? 'visibility' : 'visibility_off' }}
      </v-icon>
    </v-btn>
    <v-card
      class="mx-auto my-12"
      color="primary"
      dark
      max-width="400"
    >
    </v-card>
  </div>

</template>

<script>

import { db } from "@/firebase/config";

export default {
  props: {
    attachment: Object,
    attachments: Array
  },
  data() {
    return {
      db
    }
  },
  computed: {
    attachmentType () {
      return {
        'image/web': 'Imagem',
        'video/web': 'Vídeo',
        'pdf': 'PDF',
        'file': 'Arquivo'
      }[this.attachment.type] || 'Desconhecido'
    },
    iconAttachment () {
      return {
        'image/web': 'image',
        'video/web': 'ondemand_video',
        'pdf': 'picture_as_pdf',
        'file': 'insert_drive_file'
      }[this.attachment.type] || 'attach_file'
    },
    caseID () {
      return this.$route.params.caseID
    }
  },
  methods: {
    toogleVisibility () {
      const indexAttach = this.attachments.findIndex(attach => attach === this.attachment)
      const newAttachment = JSON.parse(JSON.stringify(this.attachment))
      const newAttachments = JSON.parse(JSON.stringify(this.attachments))
      newAttachment.visible = !this.attachment.visible
      newAttachments[indexAttach] = newAttachment
      try {
        const db = this.db
        const collection = db.collection('cases')
        const doc = collection.doc(this.caseID)
        const promise = doc.update({attachments: newAttachments})
      }catch (e) {
        console.error(e)
      }
    }
  }
}

</script>

<style scoped>

  .pointer{
    cursor: pointer;
  }

</style>
