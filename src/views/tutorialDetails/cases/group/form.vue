<template>
  <v-layout align-center justify-center wrap>
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
            <v-autocomplete v-for="(participant, index) in slotProps.item.participants"
                            :rules="[formRules.required]"
                            :key="participant.key"
                            :items="students"
                            no-data-text="Nenhum estudante encontrado"
                            return-object
                            :value="participant.value"
                            :filter="customFilter"
                            item-text="name"
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
                <v-layout align-center>
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
                  <div>
                    <p
                      style="margin: auto; margin-left: 12px"
                    >{{ data.item.name }}</p>
                    <p
                      class="grey--text"
                      style="margin: auto; margin-left: 12px"
                    >{{ data.item.email }}</p>
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

  export default {
    name: "GroupCreationForm",
    mixins: [formRules],
    components: {Lister},
    data: () => ({
      groups: [],
      participantMap: {}
    }),
    props: {
      students: {type: Array},
      value: {
        type: Array
      }
    },
    methods: {
      participantChanged(student, newKey) {
        console.log("CHANGED: " + newKey + " - " + student.name);
        let oldKey = this.participantMap[student.id];
        if (oldKey) {
          this.swap(oldKey, newKey, student);
        } else {
          this.updateParticipantMap(newKey, student)
        }
      },
      swap(oldKey, newKey, student) {
        let swappedStudent = this.getParticipantMapEntry(newKey);
        this.updateParticipantMap(oldKey, swappedStudent);
        this.updateParticipantMap(newKey, student);
      },
      updateParticipantMap(key, value){
        let currentValue = this.value;
        currentValue[key.groupIndex]["participants"][key.participantIndex]["value"] = value;
        if (value) {
          this.participantMap[value.id] = key;
        }
        this.updateValue(currentValue);
      },
      getParticipantMapEntry(key){
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
    }
  }
</script>

<style scoped>

</style>
