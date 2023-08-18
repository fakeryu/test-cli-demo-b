<!--
 * @Author: berg yu
 * @Date: 2022-04-15 18:53:56
 * @LastEditors: berg yu
 * @LastEditTime: 2023-08-15 10:20:00
 * @Description: 请填写简介
-->
<template>
  <router-view />
</template>

<script setup>
import { useStore } from "vuex";
import { APP_CONFIG } from "~/app-config";
const store = useStore();
store.commit("setAppConfig", APP_CONFIG);
</script>

<style>
@import "./assets/css/reset.css";
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";
</style>
