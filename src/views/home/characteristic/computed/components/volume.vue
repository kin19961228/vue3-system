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

      <div class="desc">
        Vue 的计算属性会自动追踪响应式依赖。它会检测到 volume 依赖于
        long、width、height三个字段,所以当这三个字段发生改变时,任何依赖于 volume
        的绑定都会同时更新。
        我们将同样的函数定义为一个方法而不是计算属性，两种方式在结果上确实是完全相同的，然而，不同之处在于计算属性值会基于其响应式依赖被缓存。一个计算属性仅会在其响应式依赖更新时才重新计算。这意味着只要
        long、width、height三个字段 不改变，无论多少次访问 volume
        都会立即返回先前的计算结果，而不用重复执行 getter 函数。
      </div>
    </div>
    <div class="flex-cloumn flex1">
      <div>代码展示:</div>
      <md-preview class="" v-model="volumeMd" />
    </div>
  </div>
</template>
<script setup lang="ts" name="volume">
import { ref, computed } from "vue";
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
