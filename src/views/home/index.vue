<template>
  <v-header />
  <v-sidebar />
  <div class="content-box" :class="{ 'content-collapse': sidebar.collapse }">
    <v-tags></v-tags>
    <div class="content">
      <el-scrollbar>
        <router-view v-slot="{ Component }">
          <transition name="move" mode="out-in">
            <keep-alive :include="tags.nameList">
              <div class="container">
                <component :is="Component"></component>
              </div>
            </keep-alive>
          </transition>
        </router-view>
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useSidebarStore } from "@/store/sidebar";
import { useTagsStore } from "@/store/tags";
import vHeader from "@/components/header.vue";
import vSidebar from "@/components/sidebar.vue";
import vTags from "@/components/tags.vue";

const sidebar = useSidebarStore();
const tags = useTagsStore();
</script>
