<!--
 * @Author: yang.liu yang.liu@rccchina.com.cn
 * @Date: 2026-05-15 17:28:32
 * @LastEditors: yang.liu yang.liu@rccchina.com.cn
 * @LastEditTime: 2026-05-15 17:28:32
 * @FilePath: /zjsj-frontend/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <el-container class="layout">
    <el-header class="header">CSCEC4</el-header>
    <el-main class="main-fill">
      <RouterView />
    </el-main>
  </el-container>
</template>

<style scoped>
.layout {
  min-height: 100vh;
}
.header {
  display: flex;
  align-items: center;
  font-weight: 600;
  border-bottom: 1px solid var(--el-border-color);
}
.main-fill {
  padding: 0;
  background-color: #f0f2f5;
}
</style>
