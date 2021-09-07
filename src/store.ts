
import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
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
    ],
    items: []
  },
  mutations: {
    addTier(state, tier) {
      state.tiers.push(tier)
    },
    addItem(state, item) {
      state.items.push(item)
    },
    removeItem(state, index) {
      state.items.splice(index,1)
    },
    removeItemFromTier(state, data) {
      state.tiers[data.tier].items.splice(data.item,1)
    },
    addItemToTier(state, data) {
      state.tiers[data.index].items.push(data.src)
    },
    removeTier(state, index) {
      state.tiers.splice(index, 1)
    },
    insertTier(state, data) {
      state.tiers.splice(data.index,0,data.tier)
    }
  }
})