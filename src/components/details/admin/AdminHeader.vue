<!-- Admin_header.vue -->
<template>
  <header class="bg-gray-800 text-white p-12">
    <h1 class="text-6xl font-bold pl-12 my-8">스포츠 웰니스 관리자</h1>
  </header>
</template>

<script>
export default {
  name: 'AdminHeader',
};
</script>

<style scoped>
/* 헤더에 특화된 스타일 */
header {
  background-color: #2d3748; /* 다크 그레이 */
  color: white;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: start;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>