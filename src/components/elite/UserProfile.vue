<template>
  <div class="user-profile">
    <UserInfo
      :name="profile.name"
      :gender="profile.gender === 'male' ? '남자' : '여자'"
      :sport="profile.sport"
      :height="profile.height"
      :weight="profile.weight"
    />

    <ProfileActions
      :show-edit-button="showEditButton"
      :show-add-record-button="showAddRecordButton"
      :page-title="pageTitle"
      :user-profile="profile"
      @save-records="forwardSaveRecords"
      @save-profile="handleProfileUpdate"
      @save-match-record="handleMatchRecord"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'; 
import UserInfo from './UserInfo.vue';
import ProfileActions from './ProfileActions.vue';

// ✅ props 정의
const props = defineProps({
  userName: String,
  gender: String,
  sport: String,
  height: Number,
  weight: Number,
  showEditButton: { type: Boolean, default: true },
  showAddRecordButton: { type: Boolean, default: true },
  pageTitle: { type: String, default: '' },
});

// emit
const emit = defineEmits(["save-records", "save-profile"]);

// ✅ profile 상태 정의 + 초기화
const profile = ref({
  name: props.userName,
  gender: props.gender,
  sport: props.sport,
  height: props.height,
  weight: props.weight,
});

// ✅ 경기기록 배열
const matchRecords = ref([]);

// ✅ props가 바뀔 때 profile도 업데이트
watch(() => props, (newProps) => {
  profile.value = {
    name: newProps.userName,
    gender: newProps.gender,
    sport: newProps.sport,
    height: newProps.height,
    weight: newProps.weight,
  };
}, { immediate: true, deep: true });

// ✅ 경기 기록 저장 이벤트 전달
const forwardSaveRecords = (records) => {
  emit("save-records", records); // ManagerDetailContent.vue로 전달
};

// ✅ 프로필 수정 시 상태 업데이트
const handleProfileUpdate = (updatedProfile) => {
  profile.value = {
    name: updatedProfile.name,
    gender: updatedProfile.gender,
    sport: updatedProfile.sport,
    height: updatedProfile.height,
    weight: updatedProfile.weight,
  };
};

// ✅ 경기기록 저장 핸들러
const handleMatchRecord = (newRecord) => {
  matchRecords.value.push(newRecord);
  emit("save-records", matchRecords.value); // 상위로 전달
};

</script>

<style scoped>
.user-profile {
  /* position: relative; */
  /* width: 15vw; */
  width: 100%;
  max-width: 180px;
  min-width: 160px;
  min-height: 33vh;
  background: #FFFFFF;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3.5vh 1vw;
}
</style>
