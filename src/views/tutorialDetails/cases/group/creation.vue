<template>
  <v-form v-model="valid" ref="groupForm">
    <v-layout>
      <template v-if="!configIsSet">
        <group-size :numberOfParticipants="numberOfParticipants"
                    @finished="didFinishGroupSize">
        </group-size>
      </template>
      <template v-else>
        <group-form ref="groupComponent" :students="students" v-model="groups">
        </group-form>
      </template>
      <v-scale-transition>
        <v-btn
          v-show="configIsSet"
          dark
          style="position: fixed; bottom: 0; right: 0; margin-right: 120px; margin-bottom: 16px"
          @click.native.stop="didTapAutofill"
          color="disabled"
        >
          Randomizar
          <v-icon>shuffle</v-icon>
        </v-btn>
      </v-scale-transition>
      <v-scale-transition>
        <v-btn
          v-show="configIsSet"
          primary
          dark
          style="position: fixed; bottom: 0; right: 0; margin-right: 16px; margin-bottom: 16px"
          @click.native.stop="didTapSave"
          color="primary"
        >Salvar
        </v-btn>
      </v-scale-transition>
    </v-layout>
    <v-dialog v-model="showErrorDialog" persistent>
      <v-card color="error" dark>
        <v-card-title class="headline">Erro</v-card-title>

        <v-card-text>É necessário ter pelo menos 1 participante na tutoria para ativar um caso
        </v-card-text>

        <v-card-actions>
          <v-spacer/>
          <v-btn color="white" class="mr-2" text @click="close">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
  import GroupSize from "./size.vue";
  import GroupForm from "./form.vue";
  import {db} from '@/firebase/db';
  import {createGroups} from "@/firebase/api/group";
  import {Group} from "@/models/group";

  export default {
    name: "GroupCreation",
    components: {GroupSize, GroupForm},
    data: () => ({
      students: null,
      showErrorDialog: false,
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
      setTimeout(() =>{ if (this.students) {
        if (this.students.length === 0) {
          this.showErrorDialog = true;
        }
      } }, 1000);

    },
    computed: {
      numberOfParticipants() {
        if (this.students) {
          return this.students.length;
        }
        return 0;
      },
    },
    methods: {
      didTapSave() {
        this.$refs.groupForm.validate();
        if (this.valid) {
          let generatedGroups = [];
          for (var i = 0; i < this.groups.length; i++) {
            let group = this.groups[i];
            let generatedGroup = new Group();
            generatedGroup.title = "Grupo " + (i + 1);
            generatedGroup.participants = group.participants.map((entry) => {
              return entry.value.id
            });
            generatedGroup.reporterID = generatedGroup.participants[0];
            generatedGroup.coordinatorID = generatedGroup.participants[1];
            generatedGroups.push(generatedGroup);
          }
          createGroups(this.id, generatedGroups).then(() => {
            this.close();
          }).catch((e) => {
            this.loading = false;
            console.log(e);
          });
        }
      },
      close() {
        this.loading = false;
        this.$emit("finished");
      },
      didTapAutofill() {
        this.$refs.groupComponent.autofill();
      },
      didFinishGroupSize(groupSize, numberOfGroups, remainder) {
        let groups = [];
        for (var g = 0; g < numberOfGroups; g++) {
          let size = groupSize;
          if (g < remainder) {
            size++;
          }
          let participants = [];
          for (var p = 0; p < size; p++) {
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
