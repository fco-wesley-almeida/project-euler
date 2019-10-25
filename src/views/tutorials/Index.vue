<template>
    <v-container
      fluid
      fill-height>
      <v-layout
        align-center
        justify-space-around>
        <v-flex
          xs12
          sm8
          md4>

              <p>Aqui vai ter uma lista de tutorias</p>
              <p>{{$store.state.app.user}}</p>
              <v-btn
                color="accent"
                @click.native="$router.replace('/login')"
              >
                  Logout
                  <v-icon>logout</v-icon>
              </v-btn>

        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>

export default {
  name: 'Tutorials',
  data() {
    return {};
  },

};
</script>
