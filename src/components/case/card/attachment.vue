<template>
  <div>
    <v-card color="card">
      <v-card-text class="py-2">
        <v-layout align-center>
          <v-btn icon @click="toogleVisibility">
            <v-icon class="">
              {{ attachment.visible ? "visibility" : "visibility_off" }}
            </v-icon>
          </v-btn>
          <taiper-editor v-model="attachmentView" readonly />
        </v-layout>
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
    attachments: Array,
  },
  data() {
    return {
      db,
    };
  },
  computed: {
    attachmentView() {
      return [this.attachment];
    },
    caseID() {
      return this.$route.params.caseID;
    },
  },
  methods: {
    toogleVisibility() {
      const indexAttach = this.attachments.findIndex(
        (attach) => attach === this.attachment
      );
      const newAttachment = JSON.parse(JSON.stringify(this.attachment));
      const newAttachments = JSON.parse(JSON.stringify(this.attachments));
      newAttachment.visible = !this.attachment.visible;
      newAttachments[indexAttach] = newAttachment;
      try {
        const db = this.db;
        const collection = db.collection("cases");
        const doc = collection.doc(this.caseID);
        const promise = doc.update({ annexes: newAttachments });
      } catch (e) {
      }
    },
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
