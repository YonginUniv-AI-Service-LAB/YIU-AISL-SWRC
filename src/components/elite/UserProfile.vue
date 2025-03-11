<template>
    <div class="user-profile">
        <img src="@/assets/images/profile.png" alt="프로필 이미지" class="profile-image" />
        
        <h2 class="user-name">{{ props.userName }}</h2> <!-- props를 직접 사용 -->
        
        <div class="user-details">
            <span class="category">종목</span> <span class="divider">|</span> <span class="sport">{{ props.sport }}</span>
        </div>

        <p class="user-info">키: {{ props.height }}cm</p>
        <p class="user-info">몸무게: {{ props.weight }}kg</p>

        <div class="profile-buttons">
        <!-- 버튼 클릭 시 openAddRecordModal 함수 호출 -->
        <button class="btn-edit-profile">프로필 수정</button>
        <button class="btn-add-record" @click="openAddRecordModal">경기 기록 추가 +</button>
        <!-- 모달 컴포넌트, showAddRecordModal 값에 따라 렌더링 -->
        <EliteModal v-model:show="showAddRecordModal" />
        </div>
    </div>


</template>

<script setup>
import { ref,defineProps } from 'vue';
import EliteModal from './EliteModal.vue'; // 파일 경로에 맞게 수정
const props = defineProps({
    userName: String,
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
    height: 50vh;
    background: #FFFFFF;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1vw;
}

.profile-image {
    width: 7vw;
    height: auto;
    aspect-ratio: 1 / 1; /* 정사각형 유지 */
    border-radius: 50%;
    object-fit: cover;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.08));
}

.user-name {
    font-weight: 600;
    font-size: 1.2rem;
    color: #3F3F3F;
    text-align: center;
    margin-top: 1vw;
}

.user-details {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.3vw;
    margin-bottom: 0.5vw;
    font-size: 1rem;
    font-weight: 600;
}

.category, .divider, .sport {
    color: #005871;
}

.divider {
    margin: 0 0.5vw;
}

.user-info {
    font-size: 1rem;
    font-weight: 600;
    color: #3F3F3F;
    text-align: center;
    margin-bottom: 0.2vw;
    line-height: 1;
    
}

.user-info:last-child {
    margin-bottom: 1.2vw; /* 마지막 요소인 경우만 아래 여백 추가 */
}

/* 버튼 컨테이너 */
.profile-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    margin-top: 2rem;
    width: 100%;
}

/* 버튼 공통 스타일 */
button {
    width: 121%;
    font-size: 0.9rem;
    font-weight: 700;
    text-align: center;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-left: -1.1rem;
}

/* 프로필 수정 버튼 */
.btn-edit-profile {
    background-color: #C9C9C9;
    color: #6B6B6B;
    padding: 0.7rem;
}

/* 내 기록 추가 버튼 */
.btn-add-record {
    background-color: #005871;
    color: white;
    padding: 1rem;
}

</style>
