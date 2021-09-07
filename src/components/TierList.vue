<template>
  <div class="d-flex flex-column mx-auto mw-75" draggable="false">
    <Tier
      v-for="(tier, index) in tiers"
      :index="index"
      :key="index"
      draggable="false"
    />
    <div class="row add-tier-row">
      <button class="btn btn-lg col-1 btn-light" @click="addNewTier">
        <i class="fa fa-plus" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { mapMutations, mapState } from "vuex"
import Tier from "./Tier.vue"

export default {
  components: {
    Tier
  },
  computed: {
    ...mapState(['tiers'])
  },
  methods: {
    ...mapMutations(['addTier']),
    addNewTier() {
      this.addTier({label: 'New',color: '#ffffff',items: []})
    }
  }
}

</script>

<style>
.mw-75 {
  max-width: 75%;
}

.add-tier-row {
  padding: 0px 30px;
}
</style>