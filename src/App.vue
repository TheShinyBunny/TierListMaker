
<template>
  <h1 class="display-2 text-center">TierList Maker</h1>
  <TierList />
  <div class="mt-3 d-flex justify-content-center">
    <Item v-for="(item, index) in items" :image="item" :index="index" />
    <label for="file-upload" class="custom-file-upload m-2 d-flex justify-content-center align-items-center">
      <i class="fa fa-cloud-upload fa-2x"></i>
    </label>
    <input id="file-upload" ref="fileInput" multiple type="file" accept="image/*" @change="uploadItem"/>
  </div>
</template>

<script lang="ts">
import TierList from "./components/TierList.vue";
import Item from "./components/Item.vue";
import { mapMutations, mapState } from "vuex";

export default {
  components: {
    TierList,
    Item
  },
  computed: {
    ...mapState(['items'])
  },
  methods: {
    ...mapMutations(['addItem']),
    uploadItem() {
      let files: FileList = this.$refs.fileInput.files
      for (let i = 0; i < files.length; i++) {
        this.addItem(URL.createObjectURL(files[i]))
      }
    }
  }
}

</script>
<style>
#app {
  background-color: #eee;
  height: 100vh;
}

input[type="file"] {
  display: none;
}
.custom-file-upload {
  width: 80px;
  height: 80px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
}
</style>
