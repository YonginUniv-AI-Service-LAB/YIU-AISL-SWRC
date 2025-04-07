<template>
  <div class="elite-content">
    <div class="content-wrapper">
      <UserProfile 
        :user-name="userProfile.userName"
        :gender="userProfile.gender"
        :sport="userProfile.sport"
        :height="userProfile.height"
        :weight="userProfile.weight"
        :show-edit-button="true"
        :show-add-record-button="true"
        :page-title="pageTitle"
        @save-records="updatePerformanceData"
        @save-profile="updateUserProfile"
      />

      <div class="main-section">
        <div class="main-title">
          <h2>{{ pageTitle }}</h2>
        </div>

        <div class="main-content">
          <div class="content-area">
            <!-- 🔹 activeTab이 0이면 PerformanceCharts 보여주기 -->
            <template v-if="activeTab === 0">
              <PerformanceCharts v-if="hasPerformanceData" :external-records="performanceData" />
              <p v-else>
                현재 입력된 기록이 없습니다. 내 기록 추가를 통해 몸 상태를 기록해 보세요!
              </p>
            </template>
            <!-- 🔹 activeTab이 1이면 MatchRecordList 보여주기 -->
            <MatchRecordList v-if="activeTab === 1" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, ref, onMounted } from 'vue';
import axios from 'axios';

import UserProfile from './UserProfile.vue';
import PerformanceCharts from './PerformanceCharts.vue';
import MatchRecordList from './MatchRecordList.vue';

const props = defineProps({
  activeTab: Number, // 부모(App.vue)에서 내려받는 activeTab 값
  performanceData: Array, // 부모(App.vue)에서 내려받는 performanceData 값
});

const pageTitles = ['체력측정분석', '경기기록'];
const pageTitle = computed(() => pageTitles[props.activeTab]);

// 모달에서 입력한 데이터를 저장하는 상태
const performanceData = ref([]); // 데이터 리스트라고 가정

//  데이터 유무 판단
const hasPerformanceData = computed(() => performanceData.value.length > 0);

// ✅ 모달에서 저장 이벤트로 받은 데이터 처리
const updatePerformanceData = (data) => {
  performanceData.value = data;
};

// ✅ 사용자 프로필 데이터 상태
const userProfile = ref({
  userName: '',
  gender: '',
  sport: '',
  height: 0,
  weight: 0,
});

// 저장된 프로필로 갱신
const updateUserProfile = (updated) => {
  userProfile.value = {
    userName: updated.name,
    birthdate: updated.birthDate,
    gender: updated.gender === 'male' ? '남자' : '여자',
    sport: updated.event,
    height: updated.height,
    weight: updated.weight,
  };
};

onMounted(async () => {
  try {
    // const userId = localStorage.getItem('userId');
    // if (!userId) return;

    const res = await axios.get("http://localhost:8080/api/profiles/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    const profile = res.data;

    console.log('👀 프로필 불러옴:', profile);

    userProfile.value = {
      userName: profile.name,
      birthdate: profile.birthDate,
      gender: profile.gender,
      sport: profile.event,
      height: profile.height,
      weight: profile.weight,
    };
  } catch (err) {
    console.error('❌ 프로필 데이터 불러오기 실패:', err);
  }
});
</script>

<style scoped>
.elite-content {
    /* position: absolute; */
    width: 100%;
    height: 160vh;
    min-height: 100vh;
    top: 40vh;
    left: 0;
    background: #F4F4F4;
    overflow: hidden; /* 내용이 넘칠 경우 스크롤바 표시 */

}

/* 프로필과 메인 컨텐츠를 감싸는 레이아웃 */
.content-wrapper {
    display: flex;
    gap: 2vw;
    width: 81%;
    /* max-width: 1300px; */
    margin-left: 10vw;
}

.user-profile {
    flex: 0 0 10vw; /* 고정된 너비 */
    margin-top: 47vh; /* 화면 높이의 18%만큼 아래로 이동 */
    max-height: 280px;
}

/* 세로 정렬: 타이틀과 컨텐츠 */
.main-section {
    flex: 1;
    display: flex;
    flex-direction: column; /* 타이틀과 컨텐츠를 세로 정렬 */
    gap: 1rem; /* 세로 간격 */
    margin-top: 34vh;
}

/* 타이틀 스타일 */
.main-title {
    margin-top: 10vh;
    border-bottom: 1px solid #3f3f3f; /* 구분선 추가 */
}

/* h2에 유동적인 밑줄 적용 */
.main-title h2 {
    display: inline-block; /* 글자 길이에 맞게 width 조정 */
    position: relative; /* ::after 가상 요소 위치 기준 */
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: #3f3f3f;
}
/* 글자 길이에 맞는 굵은 밑줄 */
.main-title h2::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -11px;
    width: 100%; /* 글자 길이에 맞게 */
    height: 4.3px; /* 굵은 밑줄 두께 */
    background-color: #3F3F3F; /* 굵은 밑줄 색상 */
}

/* 메인 컨텐츠 (오른쪽 배치) */
.main-content {
    height: 100%;
}

.main-content p {
    margin-top: 1.5vh;
    background: #D6D6D6;
    border-radius: 8px;
}

/* 콘텐츠 스타일 */
.content-area {
    font-size: 0.9rem;
}

.content-area p {
    font-weight: 600;
    color: #7e7e7e;
    padding: 1rem 1rem;
    border-radius: 8px;
}
</style>

