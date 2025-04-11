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
import axios from 'axios';
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
      pendingUsers: [],
      approvedUsers: [],
      token: localStorage.getItem('token') || '',
    };
  },
  methods: {
    approveUser(index) {
      const user = this.pendingUsers[index];
      axios.post(`/api/admin/approve/${user.id}`, null, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }).then(() => {
        this.pendingUsers.splice(index, 1);
        this.approvedUsers.push(user);
      }).catch(err => {
        console.error('승인 실패:', err);
      });
    },
    rejectUser(index) {
      const user = this.pendingUsers[index];
      axios.post(`/api/admin/reject/${user.id}`, null, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }).then(() => {
        this.pendingUsers.splice(index, 1);
      }).catch(err => {
        console.error('거절 실패:', err);
      });
    },
    removeUser(index) {
      const user = this.approvedUsers[index];
      axios.delete(`/api/admin/delete/${user.id}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }).then(() => {
        this.approvedUsers.splice(index, 1);
      }).catch(err => {
        console.error('삭제 실패:', err);
      });
    },
  },
  mounted() {
    // 대기 중 관리자 불러오기
    axios.get('/api/admin/pending', {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    }).then(res => {
      this.pendingUsers = res.data;
    }).catch(err => {
      console.error('대기 목록 불러오기 실패:', err);
    });

    // 승인된 관리자 불러오기
    axios.get('/api/admin/approved', {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    }).then(res => {
      this.approvedUsers = res.data;
    }).catch(err => {
      console.error('승인 목록 불러오기 실패:', err);
    });
  },
};
</script>

<style scoped>
.admin-main {
  padding: 20px;
}
</style>