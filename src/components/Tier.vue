<template>
  <div class="tier row position-relative" @mouseenter="hovered = true" @mouseleave="hovered = false">
    <div v-if="hovered" class="move-controls d-flex flex-column align-items-start justify-content-center">
      <i class="fa fa-angle-up fa-2x" aria-hidden="true" @click="moveUp"></i>
      <i class="fa fa-angle-down fa-2x" aria-hidden="true" @click="moveDown"></i>
    </div>
    <div class="col-1 align-middle d-flex align-items-center justify-content-center position-sticky" :style="{ backgroundColor: tier.color }" data-bs-toggle="modal" :data-bs-target="'#editModal' + index">
      <p class="h5 text-break text-center">{{ tier.label }}</p>
    </div>
    <div class="col-11 bg-dark d-flex flex-row flex-wrap justify-content-start align-items-center position-sticky" @dragover.prevent @drop="addItem">
      <img
        v-for="(item, index) in tier.items"
        :src="item"
        width="80"
        height="80"
        @dragstart="startDrag($event,index)"
      />
    </div>
    <!-- Edit Modal -->
    <div ref="modal" class="modal fade" :id="'editModal' + index" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Tier <input v-model="tier.label" :id="'name' + index" nofill autocomplete="false" class="mx-1 form-control-plaintext d-inline-block w-auto" type="text" placeholder="Untitled"/></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="row align-items-center" autocomplete="off">
              <label class="col-4" :for="'color' + index">Background Color</label>
              <input v-model="tier.color" :id="'color' + index" class="form-control form-control-color col-8" type="color"/>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="removeTier(index)">Remove</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">import { mapMutations, mapState } from "vuex"

export default {
  props: ['index'],
  data() {
    return {
      hovered: false
    }
  },
  computed: {
    ...mapState(['tiers']),
    tier() {
      return this.tiers[this.index]
    }
  },
  methods: {
    ...mapMutations(['removeItem','removeItemFromTier','addItemToTier','removeTier','insertTier']),
    removeItemFrom(index: number, tier: number) {
      if (tier >= 0) {
        this.removeItemFromTier({tier,item: index})
      } else {
        this.removeItem(index)
      }
    },
    addItem(e: DragEvent) {
      if (!e.dataTransfer.getData('index') || !e.dataTransfer.getData('tier') || !e.dataTransfer.getData('img')) return
      this.removeItemFrom(parseInt(e.dataTransfer.getData('index')), parseInt(e.dataTransfer.getData('tier')))
      let src = e.dataTransfer.getData('img')
      this.addItemToTier({index: this.index,src})
    },
    startDrag(e: DragEvent, index: any) {
      e.dataTransfer.setData('img', this.tier.items[index])
      e.dataTransfer.setData('index', index + '')
      e.dataTransfer.setData('tier', this.index + '')
    },
    repositionTier(index: number, dir: number) {
      let newIndex = index + dir
      if (newIndex < 0 || newIndex >= this.tiers.length) return
      let tier = this.tiers[index]
      this.removeTier(index)
      this.insertTier({index: newIndex,tier})
    },
    moveUp() {
      this.repositionTier(this.index,-1)
    },
    moveDown() {
      this.repositionTier(this.index,1)
    }
  }
}
</script>

<style>
.tier {
  min-height: 10vh;
  padding: 0px 30px;
}

.move-controls {
  position: absolute;
  top: 0;
  left: 0;
  height: 10vh;
  padding: 0;
}
</style>