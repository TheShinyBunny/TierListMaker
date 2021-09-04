<template>
  <div class="tier row">
    <div class="col-1 align-middle d-flex align-items-center justify-content-center" :style="{ backgroundColor: color }" data-bs-toggle="modal" :data-bs-target="'#editModal' + index">
      <p class="h5 text-break text-center">{{ label }}</p>
    </div>
    <div class="col-11 bg-dark d-flex flex-row flex-wrap justify-content-start align-items-center" @dragover.prevent @drop="addItem">
      <img
        v-for="(item, index) in items"
        :src="item"
        width="80"
        height="80"
        @dragstart="startDrag($event, index)"
      />
    </div>
    <!-- Edit Modal -->
    <div class="modal fade" :id="'editModal' + index" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Tier <input v-model="label" id="name" nofill autocomplete="false" class="mx-1 form-control-plaintext d-inline-block w-auto" type="text" placeholder="Untitled"/></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="row align-items-center" autocomplete="off">
              <label class="col-4" for="color">Background Color</label>
              <input v-model="color" id="color" class="form-control form-control-color col-8" type="color"/>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="removeTier">Remove</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    index: Number,
    label: String,
    color: String,
    items: Array as () => Array<string>
  },
  methods: {
    addItem(e: DragEvent) {
      this.$emit('removeItem', parseInt(e.dataTransfer.getData('index')), parseInt(e.dataTransfer.getData('tier')))
      let src = e.dataTransfer.getData('img')
      this.items.push(src)
    },
    startDrag(e: DragEvent, index: number) {
      e.dataTransfer.setDragImage((e.target as HTMLImageElement), 40, 40)
      e.dataTransfer.setData('img', (e.target as HTMLImageElement).src)
      e.dataTransfer.setData('index', index + '')
      e.dataTransfer.setData('tier', this.index + '')
    },
    removeTier() {
      this.$emit('remove')
    }
  },
  emits: ['remove-item','remove']
}
</script>

<style>
.tier {
  min-height: 10vh;
  border: 1px solid darkgray;
}
</style>