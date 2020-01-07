<template>
  <v-layout column justify-start align-start wrap>
    <v-flex xs1 pl-0 pb-0 ml-0 mb-0 v-if="breadcrumbs.length > 1">
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
    </v-flex>
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
};
</script>

<style>
.disabled {
  color: #aaaaaa;
}
</style>
