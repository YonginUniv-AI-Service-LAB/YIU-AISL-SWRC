<template>
  <div class="user-profile">
    <UserInfo
      :user-name="userName"
      :gender="gender"
      :sport="sport"
      :height="height"
      :weight="weight"
    />

    <ProfileActions
      :show-edit-button="showEditButton"
      :show-add-record-button="showAddRecordButton"
    />
  </div>
</template>

<script setup>
import UserInfo from './UserInfo.vue';
import ProfileActions from './ProfileActions.vue';

defineProps({
  userName: String,
  gender: String,
  sport: String,
  height: Number,
  weight: Number,
  showEditButton: { type: Boolean, default: true },
  showAddRecordButton: { type: Boolean, default: true }
});
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
</style>
