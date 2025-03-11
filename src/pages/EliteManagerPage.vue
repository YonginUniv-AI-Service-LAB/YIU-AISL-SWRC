<template>
    <div class="elite-manager-page">
        <MainHeader />
        <div class="content-wrapper">
            <EliteManagerBanner />
            <TabNavigation v-model:activeTab="activeTab" />

            <!-- ✅ 선택한 기록이 없으면 EliteManagerContent, 있으면 ManagerDetailContent -->
            <component 
                :is="selectedRecordId ? ManagerDetailContent : EliteManagerContent" 
                :activeTab="activeTab" 
                :recordId="selectedRecordId"
                @go-back="selectedRecordId = null"
                @select-record="handleRecordClick"
            />
        </div>
        <MainFooter />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import MainHeader from '../components/layout/MainHeader.vue';
import EliteManagerBanner from '../components/elite/EliteManagerBanner.vue';
import TabNavigation from '../components/elite/TabNavigation.vue';
import EliteManagerContent from '../components/elite/EliteManagerContent.vue';
import ManagerDetailContent from '../components/elite/ManagerDetailContent.vue';
import MainFooter from '../components/layout/MainFooter.vue';

// ✅ Composition API 방식으로 activeTab 상태 관리
const activeTab = ref(0);
// 선택된 기록 ID (없으면 null)
const selectedRecordId = ref(null);

// PlayerRecordList (또는 EliteManagerContent 내부에서 발생한) select-record 이벤트를 처리
const handleRecordClick = (recordId) => {
    selectedRecordId.value = recordId;
};

</script>

<style lang="scss" scoped>

/* 전체 페이지 레이아웃 */
.elite-manager-page {
    display: flex;
    flex-direction: column; /* 세로 정렬 */
    min-height: 100%;
}

/* 콘텐츠 영역 */
.content-wrapper {
    flex: 1; /* 남은 공간을 모두 차지하도록 설정 */
    display: flex;
    flex-direction: column;
}

/* 푸터 */
.MainFooter {
    width: 100%;
}

</style>