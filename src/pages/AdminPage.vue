<!-- Admin_main.vue -->
<template>
    <div class="admin-main">
      <!-- 헤더 섹션 -->
      <AdminHeader />
  
      <!-- 배열 섹션 (승인 대기자 및 가입자) -->
      <AdminArray
        :pending-users="pendingUsers"
        :approved-users="approvedUsers"
        @approve="approveUser"
        @reject="rejectUser"
        @remove="removeUser"
      />
    </div>
   
  </template>
  
  <script>
  // 자식 컴포넌트 import
  import AdminHeader from '../components/details/admin/AdminHeader.vue';
  import AdminArray from '../components/details/admin/AdminArray.vue';

  
  export default {
    name: 'AdminMain',
    components: {
      AdminHeader,
      AdminArray,
 
    },
    data() {
      return {
        pendingUsers: [
          { name: '임동민', sport: '코딩 코치', email: 'YIUACKR@yiu.ac.kr' },
          { name: '변지영', sport: '코딩 코치', email: 'YIUACKR@yiu.ac.kr' },
        ],
        approvedUsers: [
          { name: '양병권', sport: '축구 코치', email: 'YIUACKR@yiu.ac.kr' },
          { name: '원우민', sport: '축구 코치', email: 'YIUACKR@yiu.ac.kr' },
        ],
      };
    },
    methods: {
      approveUser(index) {
        const user = this.pendingUsers[index];
        this.pendingUsers.splice(index, 1);
        this.approvedUsers.push(user);
      },
      rejectUser(index) {
        this.pendingUsers.splice(index, 1);
      },
      removeUser(index) {
        this.approvedUsers.splice(index, 1);
      },
    },
  };
  </script>
  
  <style scoped>
  /* AdminMain 컴포넌트에 대한 전역 스타일 */
  .admin-main {
    padding: 20px;
  }
  </style>