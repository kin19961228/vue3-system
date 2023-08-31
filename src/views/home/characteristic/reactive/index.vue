<template>
  <div class="flex-cloumn flex1 container-height">
    <kin-title title="响应式数据"></kin-title>
    <div class="flex-cloumn flex1">
      <el-card class="box-card">
        <el-tabs v-model="activeName">
          <el-tab-pane label="响应式表格" name="reactive">
            <baseTable></baseTable
          ></el-tab-pane>
          <el-tab-pane label="代码展示" name="code"
            ><md-preview class="" v-model="baseTableMd"
          /></el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts" name="reactive">
import { ref } from "vue";
import baseTable from "./components/baseTable.vue";
import baseTableMd from "./components/baseTable.md?raw";
const activeName = ref("reactive");
</script>

<style scoped lang="scss">
</style>
