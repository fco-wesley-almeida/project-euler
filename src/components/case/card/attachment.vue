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

          <v-btn icon>
            <v-icon class="">
                visibility
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

export default {
  props: {
    attachment: Object
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
    }
  }
}

</script>

<style scoped>

  .pointer{
    cursor: pointer;
  }

</style>
