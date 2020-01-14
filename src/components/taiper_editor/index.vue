<template>
  <v-layout wrap align-center justify-center pa-2>
    <v-flex xs12>
      <lister
        :items="value"
        cardBreakpoints="xs12"
        searchText
        hideSearchbar
        :customSearchFunction="customSearch"
        emptyListIcon="edit"
        emptyListMessage="Clique no botão de + para inserir textos, imagens, vídeos, áudios ou arquivos em geral."
      >
        <template v-slot:default="slotProps">
          <div class="pa-2">
            <clayblock v-model="slotProps.item" />
          </div>
        </template>
      </lister>
    </v-flex>
    <v-menu bottom origin="center center" transition="slide-y-transition">
      <template v-slot:activator="{on}">
        <v-btn class="mt-2" v-on="on" fab color="primary" dark small>
          <v-icon>add</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item-group color="primary" :value="null">
          <v-list-item v-for="(item, index) in menuOptions" :key="index" @click="onMenuClick(item)">
            <v-list-item-icon><v-icon color="primary">{{ item.icon }}</v-icon></v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </v-layout>
</template>

<script>
import Lister from "@/components/Lister";
import Clayblock from "./clayblocks/index";

export default {
  components: { Lister, Clayblock },
  data() {
    return {
      menuOptions: [
        { title: "Subtítulo", icon: "title" },
        { title: "Texto", icon: "text_fields" },
        { title: "Imagem", icon: "image" },
        { title: "Video", icon: "movie" }
      ]
    };
  },
  props: {
    value: {
      type: Array
    }
  },
  methods: {
    customSearch(value){
      return (item, searchString) => {
        return true;
      };
    },
    updateValue: function(value) {
      this.$emit("input", value);
    },
    onMenuClick: function(item) {
      if (item.title === "Subtítulo"){
        this.addToValue({type: 'text/title', value: ''})
      }

      if (item.title === "Texto"){
        this.addToValue({type: 'text/body', value: ''})
      }

      if (item.title === "Imagem"){
        this.addToValue({type: 'image/web', value: ''})
      }
    },
    addToValue(item){
      const newValue = this.value;
      newValue.push(item);
      this.updateValue(newValue);
    }
  }
};
</script>