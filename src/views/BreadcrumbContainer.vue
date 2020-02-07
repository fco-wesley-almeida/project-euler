<template>
  <v-layout column justify-start align-start style="width: 100%; height: 100%">
    <v-flex style="width: 100%; height: 100%">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </v-flex>
  </v-layout>
</template>
