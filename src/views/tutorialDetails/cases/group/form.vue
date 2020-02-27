<template>
  <v-layout xs12 lg8 align-center justify-center wrap>
    <lister
      :items="value"
      cardBreakpoints="xs12 lg6"
      :customSearchFunction="customSearch"
      hideSearchbar
      emptyListIcon="check"
      emptyListMessage="Nenhum caso ativo"
      emptySearchMessage="Nenhum caso encontrado"
    >
      <template v-slot:default="slotProps">
        <div class="pa-2">
          <v-card>
            <v-card-title>{{'Grupo ' + (slotProps.index + 1)}}</v-card-title>
            <v-card-text>
              <v-autocomplete class="my-3"
                              v-for="(participant, index) in slotProps.item.participants"
                              :rules="[formRules.required]"
                              :key="participant.key"
                              :items="sortedStudents"
                              :hint="participant.value ? participant.value.email : ''"
                              persistent-hint
                              item-text="name"
                              item-value="id"
                              no-data-text="Nenhum estudante encontrado"
                              return-object
                              :value="participant.value"
                              :filter="customFilter"
                              v-on:change="participantChanged($event, {groupIndex: slotProps.index, participantIndex: index, key: participant.key})"
                              :label="'Participante ' + (index+1)"
              >
                <template
                  slot="prepend"
                >
                  <v-img
                    v-if="participant.value"
                    :src="participant.value.imageURL || '/img/profile-default.jpg'"
                    class="elevation-2"
                    style="border-radius: 50%; padding-right: 12px; width: 30px; height: 30px"
                  />
                </template>
                <template
                  slot="item"
                  slot-scope="data">
                  <v-layout align-center class="my-2">
                    <div class="my-auto" style="height: 40px">
                      <v-img
                        :src="(data.item.imageURL) || '/img/profile-default.jpg'"

                        class="elevation-2 my-auto"
                        style="border-radius: 50%; padding-right: 12px; width: 40px; height: 40px; display: inline-block"
                      >
                        <template v-slot:placeholder>
                          <v-layout fill-height align-center justify-center ma-0>
                            <v-progress-circular indeterminate
                                                 color="grey"></v-progress-circular>
                          </v-layout>
                        </template>
                      </v-img>
                    </div>
                    <v-layout column align-center justify-start>
                      <span
                        style="margin: auto; margin-left: 12px; margin-bottom: -6px"
                      >{{ data.item.name }}</span>
                      <span
                        class="grey--text"
                        style="margin: auto; margin-left: 12px"
                      >{{ data.item.email }}</span>
                    </v-layout>
                    <v-flex/>
                    <div class="my-auto" style="height: 100%;">
                      <span class="my-auto caption text-color-grey text-align-right">{{participantMap[data.item.id] ? 'Grupo ' + (participantMap[data.item.id].groupIndex+1) : 'Sem grupo'}}</span>
                    </div>
                  </v-layout>
                </template>
                <template
                  slot="append">
                  <span v-if="index == 0">Relator</span>
                  <span v-else-if="index == 1">Coordenador</span>
                  <span v-else>Participante</span>
                </template>
              </v-autocomplete>
            </v-card-text>
          </v-card>
        </div>
      </template>
    </lister>
  </v-layout>
</template>

<script>
  import Lister from "@/components/Lister";
  import formRules from "@/utils/formRules";
  import {shuffle} from "@/utils/array";

  export default {
    name: "GroupCreationForm",
    mixins: [formRules],
    components: {Lister},
    data: () => ({
      groups: [],
      participantMap: {},
      sortedStudents: []
    }),
    watch: {
      students:{
        immediate: true,
        handler(newValue) {
          let newStudents = newValue.slice();
          newStudents.sort(this.sortStudent);
          this.sortedStudents = newStudents;
        }
      }
    },
    props: {
      students: {type: Array},
      value: {
        type: Array
      }
    },
    methods: {
      autofill(){
        let newStudents = shuffle(this.$props.students.slice());
        let newValue = this.$props.value.slice();
        let newParticipantMap = {};
        for (var groupIndex = 0; groupIndex < newValue.length; groupIndex++){
          let group = newValue[groupIndex];
          for (var participantIndex = 0; participantIndex < group.participants.length; participantIndex++){
            let student = newStudents.pop();
            group.participants[participantIndex].value = student;
            newParticipantMap[student.id] = {groupIndex, participantIndex};
          }
          newValue[groupIndex] = group;
        }
        this.participantMap = newParticipantMap;
        this.updateValue(newValue);
        console.log(newValue);
      },
      participantChanged(student, newKey) {
        let oldKey = this.participantMap[student.id];
        this.swap(oldKey, newKey, student);
        let newStudents = this.$props.students.slice();
        newStudents.sort(this.sortStudent);
        this.sortedStudents = newStudents;
      },
      swap(oldKey, newKey, student) {
        let swappedStudent = this.getParticipantMapEntry(newKey);
        this.updateParticipantMap(oldKey, swappedStudent);
        this.updateParticipantMap(newKey, student);
      },
      updateParticipantMap(key, value) {
        let currentValue = this.value;

        if (key) {
          currentValue[key.groupIndex]["participants"][key.participantIndex]["value"] = value;
        }
        if (value) {
          this.participantMap[value.id] = key;
        }

        this.updateValue(currentValue);
      },
      getParticipantMapEntry(key) {
        return this.value[key.groupIndex]["participants"][key.participantIndex]["value"];
      },
      updateValue: function (value) {
        this.$emit("input", value);
      },
      customFilter(student, queryText, itemText) {
        const textOne = student.name.toLowerCase()
        const textTwo = student.email.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
      },
      customSearch() {
        return (item, searchString) => {
          return true;
        };
      },
      sortStudent(a, b) {
        let aHasGroup = this.participantMap[a.id];
        let bHasGroup = this.participantMap[b.id];
        if (aHasGroup) {
          if (bHasGroup) {
            console.log("bothHaveGroups");
            return ("" + a.name).localeCompare(b.name);
          }
          console.log("A has Group");
          return 1;
        }
        if (bHasGroup) {
          console.log("B has Group");
          return -1;
        }
        console.log("None has Group");
        return ("" + a.name).localeCompare(b.name);
      }
    }
  }
</script>

<style scoped>

</style>
