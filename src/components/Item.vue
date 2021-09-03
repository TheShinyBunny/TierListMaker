<template>
  <img class="m-2" :src="image" ref="img" width="80" height="80" draggable="true" @dragstart="startDrag" />
</template>

<script lang="ts">
export default {
  props: {
    index: Number,
    image: String
  },
  methods: {
    startDrag(e: DragEvent) {
      e.dataTransfer.setDragImage(this.$refs.img, 0, 0)
      e.dataTransfer.setData('img', this.$refs.img.src)
      e.dataTransfer.setData('index', this.index)
    }
  }
}
</script>

<style>
</style>