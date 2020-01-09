<template>
  <v-layout column justify-start align-start>
    <!-- <v-flex v-if="showingBreadcrumb" style="position: fixed; width: 100%; z-index: 2" xs1>
         <v-card color="#fafafa" elevation="1">
      <v-breadcrumbs :items="breadcrumbs" color="accent" large>
        <template v-slot:divider>
          <v-icon>chevron_right</v-icon>
        </template>
        <template v-slot:item="props">
          <v-breadcrumbs-item
            exact
            :disabled="props.item.disabled"
            :to="props.item.disabled ? '' : props.item.to"
          >{{ props.item.text }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
          </v-card>
    </v-flex> -->
    <v-flex style="width: 100%">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </v-flex>
  </v-layout>
</template>

<script>
import breadcrumb from '@/mixins/breadcrumb';

export default {
  mixins: [breadcrumb],
  computed: {
    showingBreadcrumb() {
      return this.breadcrumbs.length > 1;
    },
    contentStyle() {
      if (this.showingBreadcrumb) {
        return 'width: 100%; margin-top: 64px;';
      }
      return 'width: 100%;';
    },
  },
};
</script>

<style>
.disabled {
  color: #000000;
}
</style>
