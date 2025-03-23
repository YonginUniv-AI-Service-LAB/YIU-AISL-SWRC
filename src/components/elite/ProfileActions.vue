<template>
  <div class="profile-buttons">
    <button 
      v-if="showEditButton" 
      class="btn-edit-profile"
    >
      프로필 수정
    </button>

    <button 
      v-if="showAddRecordButton" 
      class="btn-add-record" 
      @click="openAddRecordModal"
    >
      기록 추가
      <img
        src="@/assets/images/plus.png"
        alt="plus"
      >
    </button>

    <EliteModal
      v-if="showAddRecordButton"
      v-model:show="showAddRecordModal"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import EliteModal from './EliteModal.vue';

defineProps({
    showEditButton: { type: Boolean, default: true },
    showAddRecordButton: { type: Boolean, default: true }
});

const showAddRecordModal = ref(false);

const openAddRecordModal = () => {
    showAddRecordModal.value = true;
};
</script>

<style scoped>
.profile-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
  width: 100%;
}

/* 버튼 공통 스타일 */
button {
  width: 122%;
  font-weight: 700;
  text-align: center;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  padding: 10px;
  margin: 0.5rem 0;
}

/* 프로필 수정 버튼 */
.btn-edit-profile {
  background-color: #C9C9C9;
  color: #6B6B6B;
  font-size: 0.9rem;
  padding: 0.7rem;
  margin-top: 0rem;
}

/* 기록 추가 버튼 */
.btn-add-record {
  background-color: #005871;
  color: white;
  font-size: 1rem;
  padding: 1rem;
  margin-top: 0.1rem;
}

/* 버튼 내 이미지 */
.btn-add-record img {
  width: 0.9rem;
  margin-left: 0.5rem;
}
</style>
