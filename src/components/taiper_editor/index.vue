<template>
  <v-layout wrap align-center justify-center>
    <v-flex xs12>
      <lister
        ref="sortableLister"
        :items="value"
        :autosort="false"
        cardBreakpoints="xs12"
        searchText
        hideSearchbar
        :customSearchFunction="customSearch"
        emptyListIcon=""
        :emptyListMessage="placeholderMessage || 'Clique no botão de + para inserir textos, imagens, vídeos, áudios ou arquivos em geral.'"
      >
        <template v-slot:default="slotProps">
          <clayblock v-model="slotProps.item" @remove="removeItem(slotProps.item)" :readonly="readonly"/>
        </template>
      </lister>
    </v-flex>

    <template v-if="!readonly">
    <v-menu bottom origin="center center" transition="slide-y-transition">
      <template v-slot:activator="{on}">
        <v-btn class="my-2" v-on="on" fab color="primary" dark small>
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
    </template>
  </v-layout>
</template>

<script>
import Lister from "@/components/Lister";
import Clayblock from "./clayblocks/index";
import Sortable from 'sortablejs';

export default {
  components: { Lister, Clayblock },
  data() {
    return {
      menuOptions: [
        { title: "Subtítulo", icon: "title" },
        { title: "Parágrafo", icon: "text_fields" },
        { title: "Imagem", icon: "image" },
        { title: "Vídeo", icon: "movie" },
        { title: "Arquivo", icon: "attach_file"}
      ]
    };
  },
  mounted() {
    let lister = this.$refs.sortableLister.$el.getElementsByClassName('sortableContainer')[0];
    Sortable.create(lister, {
      draggable: '.sortable',
      handle: '.handle',
      onEnd: this.dragReorder
    })
  },
  props: {
    value: {
      type: Array
    },
    placeholderMessage: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    removeItem(item){
      const newList = this.value;
      const index = newList.indexOf(item);
      newList.splice(index, 1);
      this.updateValue(newList);
    },
    dragReorder ({oldIndex, newIndex}) {
      const newList = this.value;
      const movedItem = newList.splice(oldIndex, 1)[0];
      newList.splice(newIndex, 0, movedItem);
      this.updateValue(newList);
      return true;
    },
    itemKey (item) {
      if (!this.itemKeys.has(item)) this.itemKeys.set(item, ++this.currentItemKey)
      return this.itemKeys.get(item)
    },
    customSearch(){
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

      if (item.title === "Parágrafo"){
        this.addToValue({type: 'text/body', value: ''})
      }

      if (item.title === "Imagem"){
        this.addToValue({type: 'image/web', value: ''})
      }

      if (item.title === "Arquivo"){
        this.addToValue({type: 'file', value: '', props: {label: ''}})
      }

      if (item.title === "Vídeo"){
        this.addToValue({type: 'video', value: ''})
      }
    },
    onOnlyClick: function(item) {
        this.addToValue({type: this.$props.only, value: ''})
    },
    addToValue(item){
      const newValue = this.value;
      newValue.push(item);
      this.updateValue(newValue);
    }
  }
};
</script>
