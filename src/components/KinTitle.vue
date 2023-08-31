<template>
  <h2>{{ title }}</h2>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string;
  }>(),
  {
    title: "默认标题",
  }
);
</script>

<style scoped lang="scss">
h2 {
  font-weight: bold;
  padding: 8px 16px;
}
</style>
