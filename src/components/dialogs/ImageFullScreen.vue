<template>
  <v-dialog v-model="imageDialog" fullscreen ref="dialog" @keydown="handleArrows">
    <v-card v-if="imageDialog" style="height: 100%" color="rgba(0,0,0, 0.9)">
      <v-btn fixed top left fab dark @click="imageDialog = false">
        <v-icon>close</v-icon>
      </v-btn>

      <v-layout align-center justify-center style="height: 100%">
        <img
          v-if="carouselIndex > 0"
          hidden
          aspect-ratio="1"
          :src="items[((carouselIndex-1)%items.length || 0)].url"
          contain
          style="height: 90%"
        />
        <img
          aspect-ratio="1"
          :src="items[carouselIndex].url"
          contain
          style="max-height: 90%; max-width: 90%"
        />
        <img
          v-if="carouselIndex + 1 < items.length"
          hidden
          aspect-ratio="1"
          :src="items[(carouselIndex+1)%items.length].url"
          contain
          style="height: 90%"
        />
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    show: Boolean,
    continuous: Boolean,
    currentIndex: Number,
    images: Array
  },
  computed: {
    imageDialog: {
      get () {
        return this.$props.show
      },
      set () {
        this.$emit('closed')
      }
    },
    continuousCarousel: {
      get () {
        return this.$props.continuous
      }
    },
    carouselIndex: {
      get () {
        if (this.$props.currentIndex) {
          this.$refs.dialog.$el.focus()
        }
        return this.$props.currentIndex
      },
      set (v) {
        this.$emit('changedIndex', v)
      }
    },
    items () {
      return this.$props.images || []
    }
  },
  methods: {
    handleArrows (event) {
      if (event.key === 'ArrowLeft') {
        this.handleLeft()
      } else if (event.key === 'ArrowRight') {
        this.handleRight()
      }
    },
    handleLeft () {
      if (this.carouselIndex > 0) {
        this.carouselIndex -= 1
      }
    },
    handleRight () {
      if (this.carouselIndex < this.items.length - 1) {
        this.carouselIndex += 1
      }
    }
  }
}
</script>
