<!--
 * @Author: berg yu
 * @Date: 2022-04-15 18:53:56
 * @LastEditors: berg yu
 * @LastEditTime: 2023-08-29 15:00:12
 * @Description: 请填写简介
-->
<template>
  <ElConfigProvider :locale="locale">
    <router-view />
  </ElConfigProvider>
</template>

<script setup>
import { useStore } from "vuex";
import { APP_CONFIG } from "~/app-config";
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'


const store = useStore();
store.commit("setAppConfig", APP_CONFIG);
const locale = zhCn
</script>

<style>
@import "./assets/css/reset.css";
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";
</style>
