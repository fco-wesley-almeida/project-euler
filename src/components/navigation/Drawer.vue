<template>
    <v-navigation-drawer
      app
      v-model="drawer"
      color="primary"
      dark
      :clipped="$vuetify.breakpoint.lgAndUp"
    >
      <v-list shaped dense>
        <v-list-item-group color="white" :multiple="false" v-model="selectedItem">
          <template v-for="(item, index) in breadcrumbs">
            <v-list-item
              :key="item.text"
              :inactive="index < breadcrumbs.length-1"
              :disabled="index == breadcrumbs.length-1"
              style="cursor: pointer"
              @click="didTapItem(item)"
            >
              <v-list-item-action v-if="index == 0">
                <v-icon>home</v-icon>
              </v-list-item-action>
              <v-list-item-action v-else :style="`margin-left: ${8*index}px`">
                <v-icon>chevron_right</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>
                    {{ item.title || item.label || item.text}}
                </v-list-item-title>

                <v-list-item-subtitle v-if="item.title && item.title !== item.text">
                    {{ item.label || item.text }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
import breadcrumb from '@/mixins/breadcrumb';

export default {
  mixins: [breadcrumb],
  computed: {
    drawer: {
      get() {
        return this.$props.showDrawer;
      },
      set(v) {
        this.$emit('drawerChanged', v);
      },
    },
    selectedItem: {
      get() {
        return this.breadcrumbs.length - 1;
      },
      set(v) {
        console.log(`Drawer item selected: ${v}`);
      },
    },
  },
  props: {
    showDrawer: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    didTapItem(item) {
      this.$router.push(item.to.path);
    },
  },
};
</script>
