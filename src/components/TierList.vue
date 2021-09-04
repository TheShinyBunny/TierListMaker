<template>
  <div class="container d-flex flex-column">
    <Tier
      v-for="(tier, index) in tiers"
      :color="tier.color"
      :index="index"
      :label="tier.label"
      :items="tier.items"
      @remove-item="removeItem"
      @remove="removeTier(index)"
    />
  </div>
</template>

<script lang="ts">
import Tier from "./Tier.vue"

export default {
  components: {
    Tier
  },
  data() {
    return {
      tiers: [
        {
          label: 'S',
          color: '#ff2222',
          items: []
        },
        {
          label: 'A',
          color: '#88ee00',
          items: []
        },
        {
          label: 'B',
          color: '#eeee00',
          items: []
        },
        {
          label: 'C',
          color: '#ee7700',
          items: []
        },
        {
          label: 'D',
          color: '#654321',
          items: []
        },
        {
          label: 'F',
          color: '#777777',
          items: []
        }
      ]
    }
  },
  methods: {
    removeItem(index: number, tier: number) {
      if (tier >= 0) {
        this.tiers[tier].items.splice(index, 1)
      } else {
        this.$emit('removeAvailable', index)
      }
    },
    removeTier(index: number) {
      this.tiers.splice(index,1)
    }
  },
  emits: ['remove-available']
}

</script>

<style>
</style>