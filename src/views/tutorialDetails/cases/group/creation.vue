<template>
  <v-form v-model="valid" ref="groupForm">
  <v-layout>
    <template v-if="!configIsSet">
      <group-size :numberOfParticipants="numberOfParticipants"
                  @finished="didFinishGroupSize">
      </group-size>
    </template>
    <template v-else>
      <group-form :students="students" v-model="groups">
      </group-form>
    </template>
    <v-scale-transition>
      <v-btn
        primary
        fixed
        bottom
        right
        dark
        @click.native.stop="didTapSave"
        color="primary"
      >Salvar</v-btn>
    </v-scale-transition>
  </v-layout>
  </v-form>
</template>

<script>
  import GroupSize from "./size.vue";
  import GroupForm from "./form.vue";
  import {db} from '@/firebase/db';

  export default {
    name: "GroupCreation",
    components: {GroupSize, GroupForm},
    data: () => ({
      students: [],
      configIsSet: false,
      groups: [],
      valid: false
    }),
    props: {
      tutorialCase: {type: Object},
      id: {type: String}
    },
    mounted() {
      this.$bind(
        'students',
        db
          .collection('students')
          .where('tutorials', 'array-contains', this.$route.params.tutorialID),
      );
    },
    computed: {
      numberOfParticipants() {
        return this.students.length;
      }
    },
    methods: {
      didTapSave(){
        this.$refs.groupForm.validate();
      },
      didFinishGroupSize(groupSize, numberOfGroups, remainder) {
        let groups = [];
        for (var g = 0; g < numberOfGroups; g++) {
          let size = groupSize;
          if (g < remainder) {
            size++;
          }
          let participants = [];
          for (var p = 0; p < size; p++){
            participants.push({value: undefined, key: `group-${g}-participant-${p}`});
          }
          groups.push({participants});
        }
        console.log(groups);
        this.groups = groups;
        this.configIsSet = true;
      }
    }
  };
</script>

<style>
  input[type="file"] {
    display: none;
  }
</style>
