<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-layout wrap pa-3>
      <v-toolbar style="border-radius: 20px">
      <v-text-field
        v-model="searchString"
        hide-details
        prepend-icon="search"
        single-line
        :placeholder="searchPlaceholder || 'Buscar'"
      ></v-text-field>
    </v-toolbar>
      </v-layout>
    </v-flex>
    <template v-if="!showPlaceholder">
      <transition-group name="list-complete" tag="div" class="layout align-start wrap">
        <v-flex v-for="item in shownItems" :key="item.id" :class="cardBreakpoints || 'xs12'">
          <slot v-bind:item="item"></slot>
        </v-flex>
      </transition-group>
    </template>
    <template v-else-if="searching">
      <v-layout wrap column align-center justify-center fill-height>
        <v-spacer />
        <v-flex xs1>
          <v-icon large class="text-xs-center mt-2">search</v-icon>
        </v-flex>
        <v-flex xs6>
          <h4
            class="text-xs-center mt-2 font-weight-regular"
            style="color: #aaaaaa"
          >Nenhum item encontrado...</h4>
        </v-flex>
      </v-layout>
    </template>
    <template v-else>
      <v-layout wrap column align-center justify-center fill-height>
        <v-spacer />
        <v-flex xs1>
          <v-icon large class="text-xs-center mt-2">close</v-icon>
        </v-flex>
        <v-flex xs6>
          <h4
            class="text-xs-center mt-2 font-weight-regular"
            style="color: #aaaaaa"
          >Nenhum item cadastrado, adicione novos com o botão +</h4>
        </v-flex>
      </v-layout>
    </template>
  </v-layout>
</template>

<script>
export default {
  name: "Lister",
  props: {
    items: Array,
    cardBreakpoints: String,
    emptyListMessage: String,
    emptySearchMessage: String,
    searchPlaceholder: String,
    customSearch: Function
  },
  computed: {
    receivedItems() {
      return this.$props.items;
    },
    receivedSearching() {
      return this.$props.searching;
    },
    showPlaceholder() {
      return this.shownItems.length === 0;
    },
    searching() {
      return this.searchString !== '';
    },
    shownItems() {
      return this.originalItems.filter((item) => {
        if (this.customSearch){
          console.log(this.customSearch);
          return this.customSearch(item, this.searchString);
        }
        return item.name.toLowerCase().includes(this.searchString.toLowerCase());
      });
    },
  },
  data: () => ({
    originalItems: [],
    searchString: '',
  }),
  methods: {
    sort(a, b) {
      return ("" + a.name).localeCompare(b.name);
    }
  },
  watch: {
    items: {
      immediate: true,
      handler(newItems) {
        const vm = this;
        let toBeAdded = newItems.filter(item => !vm.originalItems.includes(item));
        let toBeRemoved = this.originalItems.filter(
          item => !newItems.includes(item)
        );
        for (let item of toBeAdded) {
          this.originalItems.push(item);
        }
        for (let item of toBeRemoved) {
          let index = this.originalItems.indexOf(item);
          this.originalItems.splice(index, 1);
        }
        vm.originalItems.sort(vm.sort);
      }
    }
  }
};
</script>

<style>
.list-complete-enter,
.list-complete-leave-active {
  opacity: 0;
}
.list-complete-move {
  transition: transform 0.5s;
}
.list-complete-item {
  transition: all 0.5s;
}
.list-complete-enter-active,
.list-complete-leave-active {
  transition-property: all;
  transition-duration: 0.5s;
}
.list-complete-leave-active {
  position: absolute;
}
</style>
