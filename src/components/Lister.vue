<template>
  <v-layout wrap align-center>
    <v-flex xs12 v-show="!hideSearchbar">
      <v-layout wrap py-3 px-2>
        <v-toolbar class="rounded" style="border-radius: 5px">
          <v-text-field
            v-model="internalSearchString"
            hide-details
            prepend-icon="search"
            single-line
            :placeholder="searchPlaceholder || 'Buscar'"
          ></v-text-field>
        </v-toolbar>
      </v-layout>
    </v-flex>
    <transition-group
      v-show="!showPlaceholder"
      name="list-complete"
      tag="div"
      :class="listClass"
    >
      <v-flex class="sortable" v-for="(item, index) in shownItems" :key="item.id || index" :class="cardBreakpoints || 'xs12'">
        <slot v-bind:item="item" v-bind:index="index"></slot>
      </v-flex>
    </transition-group>
    <template v-if="searching">
      <v-layout wrap column align-center justify-center fill-height v-show="showPlaceholder">
        <v-spacer />
        <v-flex xs1>
          <v-icon large class="text-xs-center mt-2">search</v-icon>
        </v-flex>
        <v-flex xs6>
          <h4
            class="text-xs-center mt-2"
            style="color: #888888"
          >{{emptySearchMessage || 'Nenhum item encontrado...'}}</h4>
        </v-flex>
      </v-layout>
    </template>
    <template v-else>
      <v-layout wrap column align-center justify-center fill-height v-show="showPlaceholder">
        <v-spacer />
        <v-flex xs1 v-if="emptyListIcon">
          <v-icon large class="text-xs-center mt-2">{{emptyListIcon || 'close'}}</v-icon>
        </v-flex>
        <v-flex xs6>
          <h4
            class="text-xs-center mt-2 "
            style="color: #888888; text-align: center"
          >{{emptyListMessage || 'Nenhum item cadastrado, adicione novos com o botão +'}}</h4>
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
    emptyListIcon: String,
    emptyListMessage: String,
    emptySearchMessage: String,
    searchPlaceholder: String,
    customSearchFunction: Function,
    customSortFunction: Function,
    searchText: String,
    hideSearchbar: { type: Boolean, default: false },
    reorderable: { type: Boolean, default: false },
    autosort: { type: Boolean, default: true },
    centersSingleItem: { type: Boolean, default: false}
  },
  computed: {
    receivedItems() {
      return this.$props.items;
    },
    receivedSearchString() {
      return this.$props.searchText;
    },
    searchString() {
      if (this.$props.hideSearchbar) {
        return this.receivedSearchString;
      }
      return this.internalSearchString;
    },
    showPlaceholder() {
      return this.shownItems.length === 0;
    },
    searching() {
      if (this.$props.hideSearchbar) {
        return this.receivedSearchString !== "";
      }
      return this.searchString !== "";
    },
    shownItems() {
      return this.originalItems.filter(item => {
        if (this.customSearchFunction) {
          return this.customSearchFunction(item, this.searchString);
        }
        return item.name
          .toLowerCase()
          .includes(this.searchString.toLowerCase());
      });
    },
    listClass() {
      if (this.shownItems.length <= 1 && this.centersSingleItem) {
        return 'layout align-start justify-center wrap sortableContainer'
      }
      return 'layout align-start justify-start wrap sortableContainer'
    }
  },
  data: () => ({
    originalItems: [],
    internalSearchString: ""
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
        let toBeAdded = newItems.filter(
          item => !vm.originalItems.includes(item)
        );
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
        if (vm.customSortFunction){
          vm.originalItems.sort(vm.customSortFunction);
        }
        else if (vm.autosort){
          vm.originalItems.sort(vm.sort);
        }
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
