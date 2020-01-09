<template>
  <v-card class="pa-2">
    <v-layout>
      <div>
        <v-layout align-center justify-center fill-height>
          <v-avatar size="88">
            <v-img :src="receivedStudent.imageURL" />
          </v-avatar>
        </v-layout>
      </div>
      <div>
        <v-card-title>{{receivedStudent.name}}</v-card-title>
        <v-card-subtitle>
          <div>
            <v-icon color="primary">mail</v-icon>
            {{receivedStudent.email}}
          </div>
        </v-card-subtitle>
      </div>
    </v-layout>
    <v-card-actions class="pa-0">
    <v-spacer/>
    <v-btn x-small color="error" @click.stop="didTapDelete">
      Remover <v-icon x-small>delete</v-icon>
    </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { db, FieldValue } from '@/firebase/db';

export default {
  name: 'StudentCard',
  props: {
    student: Object,
  },
  computed: {
    receivedStudent() {
      return this.$props.student;
    },
  },
  methods: {
    didTapDelete() {
      console.log(this.receivedStudent);
      db.collection('students').doc(this.receivedStudent.id).update({
        tutorials: FieldValue.arrayRemove(this.$route.params.tutorialID),
      });
      db.collection('tutorials').doc(this.$route.params.tutorialID).update({
        students: FieldValue.arrayRemove(this.receivedStudent.id),
      });
    },
  },
};
</script>
