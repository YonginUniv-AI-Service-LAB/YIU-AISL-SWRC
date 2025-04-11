<template>
  <div class="admin-array">
    <!-- 승인 대기자 섹션을 감싸는 박스 -->
    <div class="pending-users-box bg-white p-6 rounded shadow mb-6 border border-gray-300">
      <h2 class="text-lg font-semibold mb-2">승인 대기자</h2>
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b">
            <th class="p-4 text-left">이름</th>
            <th class="p-4 text-left">종목</th>
            <th class="p-4 text-left">이메일</th>
            <th class="p-4">확인</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in pendingUsers" :key="index" class="border-b">
            <td class="p-4 font-semibold">{{ user.name }}</td>
            <td class="p-4 text-blue-600 cursor-pointer">{{ user.sportType }}</td>
            <td class="p-4">{{ user.email }}</td>
            <td class="p-3 flex justify-end gap-2"> <!-- 버튼을 오른쪽으로 정렬 -->
              <button class="px-4 py-1 bg-gray-500 text-white rounded" @click="rejectUser(index)">거절</button>
              <button class="px-4 py-1" style="background-color: #005871; color: white; border-radius: 4px;" @click="approveUser(index)">수락</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 가입자 섹션을 감싸는 박스 -->
    <div class="approved-users-box bg-white p-6 rounded shadow mb-6 border border-gray-300">
      <h2 class="text-lg font-semibold mb-2">가입자</h2>
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b">
            <th class="p-3 text-left">이름</th>
            <th class="p-3 text-left">종목</th>
            <th class="p-3 text-left">이메일</th>
            <th class="p-3">확인</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in approvedUsers" :key="index" class="border-b">
            <td class="p-4 font-semibold">{{ user.name }}</td>
            <td class="p-4 text-blue-600 cursor-pointer">{{ user.sport }}</td>
            <td class="p-4">{{ user.email }}</td>
            <td class="p-3 flex justify-end gap-2"> <!-- 버튼을 오른쪽으로 정렬 -->
              <button class="px-4 py-1 bg-gray-800 text-white rounded" @click="removeUser(index)">삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminArray',
  props: {
    pendingUsers: Array,
    approvedUsers: Array,
  },
  methods: {
    approveUser(index) {
      this.$emit('approve', index); // 부모에게 이벤트 전달
    },
    rejectUser(index) {
      this.$emit('reject', index); // 부모에게 이벤트 전달
    },
    removeUser(index) {
      this.$emit('remove', index); // 부모에게 이벤트 전달
    },
  },
};
</script>

<style scoped>
/* 각 섹션을 감싸는 박스에 대한 스타일 */
.pending-users-box, .approved-users-box {
  width: 100%; /* 박스가 전체 너비를 차지하도록 설정 */
  box-sizing: border-box; /* 패딩과 보더를 포함한 너비 계산 */
  border-radius: 8px; /* 박스의 둥근 모서리 */
  padding: 1.5rem;   /* 내부 여백 */
  border: 2px solid #e5e7eb;  /* 박스 구분선 추가 */
}

.pending-users-box {
  background-color: #ffffff;
}

.approved-users-box {
  background-color: #ffffff;
}

/* 버튼들을 오른쪽 끝에 정렬 */
td:last-child {
  display: flex;
  justify-content: flex-end; /* 버튼을 오른쪽 정렬 */
  gap: 0.5rem; /* 버튼 간 간격 */
}

</style>