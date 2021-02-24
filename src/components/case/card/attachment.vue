<template>
  <div class="">
    <!-- <v-layout fill-height align-center justify-center pa-2>
      <v-flex xs12 md8 lg6>
          <case-content :title="''" :content="[attachment]"/>
      </v-flex>
    </v-layout> -->

      <v-card color="card" style="">
        <v-card-text class="py-2" style="">
          <v-btn icon @click="toogleVisibility" style="">
            <v-icon class="">
              {{ attachment.visible ? 'visibility' : 'visibility_off' }}
            </v-icon>
          </v-btn>
            <taiper-editor v-model="attachmentView" readonly/>
        </v-card-text>
      </v-card>
  </div>

</template>

<script>

import { db } from "@/firebase/config";
import TaiperEditor from "@/components/taiper_editor/index";

export default {
  components: { TaiperEditor },
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
    attachmentView ()  {
      return [this.attachment];
    },
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
        const promise = doc.update({annexes: newAttachments})
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
