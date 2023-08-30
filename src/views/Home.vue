<!--
 * @Author: berg yu
 * @Date: 2022-04-15 18:53:56
 * @LastEditors: berg yu
 * @LastEditTime: 2023-08-21 11:24:39
 * @Description: 请填写简介
-->
<template>
  <div class="about">
    <v-header />
    <v-sidebar />
    <div class="content-box" :class="{ 'content-collapse': collapse }">
      <v-tags />
      <div class="content">
        <router-view v-slot="{ Component }">
          <transition name="move" mode="out-in">
            <div>
              <keep-alive :include="tagsList">
                <component
                  :is="Component"
                  v-if="route.meta.keepAlive"
                  :key="route.name"
                />
              </keep-alive>
            </div>
          </transition>
          <component
            :is="Component"
            v-if="!route.meta.keepAlive"
            :key="route.name"
          />
        </router-view>
        <!-- <el-backtop target=".content"></el-backtop> -->
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import vHeader from '../components/Header.vue'
import vTags from '../components/Tags.vue'
import vSidebar from '../components/Sidebar.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useStore()
const tagsList = computed(() => store.state.tagsList.map((item) => item.name))
// onMounted(() => {});

const collapse = computed(() => store.state.collapse)
</script>
