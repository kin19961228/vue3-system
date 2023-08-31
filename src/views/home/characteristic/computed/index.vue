<template>
  <div class="flex-cloumn flex1 container-height">
    <kin-title title="计算属性"></kin-title>
    <div class="container-computed flex-cloumn flex1">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>体积的计算</span>
          </div>
        </template>

        <volume></volume>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts" name="computed">
import volume from "./components/volume.vue";
</script>

<style scoped lang="scss">
.container-computed {
}
</style>
