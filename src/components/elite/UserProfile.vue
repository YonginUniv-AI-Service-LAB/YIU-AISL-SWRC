<template>
    <div class="user-profile">
        <img src="@/assets/images/profile.png" alt="프로필 이미지" class="profile-image" />
        
        <div class="user-information">
            <h2 class="user-name">{{ props.userName }}</h2>
            <h2 class="user-gender">({{ props.gender }})</h2>
        </div>
        
        <div class="user-details">
            <span class="category">종목</span> <span class="details-divider">|</span> <span class="sport">{{ props.sport }}</span>
        </div>

        <div class="user-physical">
            <div class="physical-group">
                <span class="label">키</span>
                <strong class="value">{{ props.height }}</strong>
            </div>
            <span class="physical-divider"></span>
            <div class="physical-group">
                <span class="label">몸무게</span>
                <strong class="value">{{ props.weight }}</strong>
            </div>
        </div>

        <div class="profile-buttons">
        <!-- 버튼 클릭 시 openAddRecordModal 함수 호출 -->
        <button class="btn-edit-profile">프로필 수정</button>
        <button class="btn-add-record" @click="openAddRecordModal">기록 추가
            <img src="@/assets/images/plus.png" alt="plus" />
        </button>
        <!-- 모달 컴포넌트, showAddRecordModal 값에 따라 렌더링 -->
        <EliteModal v-model:show="showAddRecordModal" />
        </div>
    </div>


</template>

<script setup>
import { ref, defineProps } from 'vue';
import EliteModal from './EliteModal.vue'; // 파일 경로에 맞게 수정
const props = defineProps({
    userName: String,
    gender: String,
    sport: String,
    height: Number,
    weight: Number
});

// 내 기록 추가 모달의 표시 여부를 관리하는 상태
const showAddRecordModal = ref(false);

// 내 기록 추가 버튼 클릭 시 모달 열기
const openAddRecordModal = () => {
    showAddRecordModal.value = true;
};
</script>

<style scoped>
.user-profile {
    position: relative;
    width: 15vw;
    min-height: 33vh;
    background: #FFFFFF;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3.5vh 1vw;
    white-space: nowrap;
}

.profile-image {
    width: 7vw;
    height: 7vw;
    border-radius: 50%;
    object-fit: cover;
}

.user-information {
    display: flex;
    justify-content: center;
    align-items: center;
}

.user-name {
    font-weight: 700;
    font-size: 1.2rem;
    color: #3F3F3F;
    
}

.user-gender {
    font-weight: 500;
    font-size: 1.2rem;
    color: #3F3F3F;
}

.user-details {
    background: #F4F4F4;
    border-radius: 8px;
    padding: 1vh 1.2vw;
    font-size: 0.9rem;
}

.category, .details-divider, .sport {
    color: #005871;
}
.category, .sport {
    font-weight: 700;
}

.user-physical {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    gap: 12px; /* 키와 몸무게 사이 간격 */
}

.physical-group {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.label {
    font-size: 13px;
    font-weight: 700;
    color: #737373;
}

.value {
    font-size: 30px;
    font-weight: 300;
    color: #3F3F3F;
}
.physical-divider {
  display: inline-block;        /* 또는 block */
  width: 1px;                   /* 선 두께 */
  height: 50px;                 /* 선 높이 (원하는 값으로) */
  background-color: #ECECEC;    /* 선 색상 */
  margin: 0 6px;                /* 양 옆 여백 */
}

/* 버튼 컨테이너 */
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
    /* font-size: 0.9rem; */
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
    cursor: pointer;
    margin-top: 0rem;
}

/* 내 기록 추가 버튼 */
.btn-add-record {
    background-color: #005871;
    color: white;
    font-size: 1rem;
    padding: 1rem;
    margin-top: 0.1rem;
}

/* 버튼 내 이미지 */
img {
    width: 0.9rem;
    margin-left: 0.5rem;
}

</style>
