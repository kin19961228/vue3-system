```vue
<template>
  <div class="flex flex1 h100">
    <div class="left">
      <div class="flex-between" style="margin-bottom: 16px">
        <span> 体积:{{ volume }} </span>

        <el-text type="info" style="font-size: 16px"
          >通过滑动滑块长宽高,即可动态计算出体积.</el-text
        >
      </div>
      <div class="slider-demo-block">
        <span class="demonstration">长</span>
        <el-slider v-model="long" />
      </div>

      <div class="slider-demo-block">
        <span class="demonstration">宽</span>
        <el-slider v-model="width" />
      </div>

      <div class="slider-demo-block">
        <span class="demonstration">高</span>
        <el-slider v-model="height" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="volume">
import { ref, computed } from "vue";
// @ts-ignore
import volumeMd from "./volume.md?raw";
const long = ref(10);
const width = ref(10);
const height = ref(10);
const volume = computed(() => {
  return long.value * width.value * height.value;
});
console.log(volumeMd);
</script>

<style scoped lang="scss">
.slider-demo-block {
  display: flex;
  align-items: center;
}
.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}
.slider-demo-block .demonstration {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  line-height: 44px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}
.slider-demo-block .demonstration + .el-slider {
  flex: 0 0 70%;
}
.md-editor-previewOnly {
  flex: 1;
}

.left {
  margin-right: 16px;
  width: 500px;
}
.desc {
  color: var(--el-color-info);
  line-height: 36px;
}
</style>
```
