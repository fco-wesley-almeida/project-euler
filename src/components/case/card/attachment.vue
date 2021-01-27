<template>
  <v-card
    class="mx-auto"
    color="primary"
    dark
    max-width="400"
  >
    <v-card-title>
      <span class="title font-weight-light">{{ attachment.title.toUpperCase() }}</span>
    </v-card-title>

<!--    <v-card-text class="headline font-weight-bold">-->
<!--      <div v-if="attachmentType === 'Imagem'">-->
<!--        <v-img width="50%" height="50%" :src="attachment.value"></v-img>-->
<!--      </div>-->
<!--    </v-card-text>-->

    <v-card-actions class="mt-n5">
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-icon>{{ iconAttachment }}</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ attachmentType }}</v-list-item-title>
        </v-list-item-content>

        <v-row
          align="center"
          justify="end"
        >

          <v-btn icon @click="toogleVisibility">
            <v-icon class="">
              {{ attachment.visible ? 'visibility' : 'visibility_off' }}
              </v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon class="">
                edit
              </v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon class="" style="color:red">
                delete
              </v-icon>
          </v-btn>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>

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
