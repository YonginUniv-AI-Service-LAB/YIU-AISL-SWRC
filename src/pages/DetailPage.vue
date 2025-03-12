<template>
    <div class="detail-container">
        <MainHeader @update:selectedMainMenu="selectedMainMenu = $event" />
        <DetailBanner :selectedMainMenu="selectedMainMenu" />
        <BreadcrumbDropdown :selectedMainMenu="selectedMainMenu" />
        <component :is="currentComponent" />
        <MainFooter />
    </div>
</template>

<script>
import { ref, watch } from "vue";
import { useRoute } from "vue-router"; 
import MainHeader from '@/components/layout/MainHeader.vue';
import DetailBanner from '@/components/details/DetailBanner.vue';
import BreadcrumbDropdown from '@/components/details/BreadcrumbDropdown.vue';
import MainFooter from '@/components/layout/MainFooter.vue';
import OrganizationPage from '@/components/details/OrganizationPage.vue';
import ExercisePhysiologyPage from '@/components/details/ExercisePhysiologyPage.vue';
import SeminarPage from '@/components/details/SeminarPage.vue';
import KineticsPage from '@/components/details/KineticsPage.vue';
import LocationPage from '@/components/details/LocationPage.vue';
import HistoryPage from "@/components/details/HistoryPage.vue";
import BusinessPage from '@/components/details/BusinessPage.vue';
import HelloPage from '@/components/details/HelloPage.vue';

export default {
    name: 'DetailPage',
    components: {
        MainHeader,
        DetailBanner,
        BreadcrumbDropdown,
        OrganizationPage,
        ExercisePhysiologyPage,
        SeminarPage,
        KineticsPage,
        LocationPage,
        HistoryPage,
        BusinessPage,
        HelloPage,
        MainFooter,
    },
    setup() {
        const route = useRoute();
        const selectedMainMenu = ref("스포츠ㆍ웰니스연구센터 소개"); // 기본값

        // 🔹 `route.params.section`을 기반으로 메인 카테고리 설정
        const mainMenuMap = {
            "organization": "스포츠ㆍ웰니스연구센터 소개",
            "location": "스포츠ㆍ웰니스연구센터 소개",
            "history": "스포츠ㆍ웰니스연구센터 소개",
            "business": '스포츠ㆍ웰니스연구센터 소개',
            "hello": '스포츠ㆍ웰니스연구센터 소개',
            "exercisephysiology": "스포츠ㆍ웰니스연구센터 연구실",
            "kinetics": "스포츠ㆍ웰니스연구센터 연구실",
            "seminar": "스포츠ㆍ웰니스연구센터 연구실",
            
        };

        const pageMap = {
            "organization": OrganizationPage,
            "location": LocationPage,
            "exercisephysiology": ExercisePhysiologyPage,
            "kinetics": KineticsPage,
            "seminar": SeminarPage,
            "history": HistoryPage,
            "hello":HelloPage,
            "business":BusinessPage,
        };

        const currentComponent = ref(pageMap[route.params.section] || LocationPage);

        // URL 변경 시 선택된 메뉴 업데이트
        watch(
            () => route.params.section,
            (newSection) => {
                if (pageMap[newSection]) {
                    currentComponent.value = pageMap[newSection];
                    selectedMainMenu.value = mainMenuMap[newSection] || "스포츠ㆍ웰니스연구센터 소개"; // 🔹 상위 메뉴 설정
                } else {
                    currentComponent.value = LocationPage;
                    selectedMainMenu.value = "스포츠ㆍ웰니스연구센터 소개";
                }
            },
            { immediate: true }
        );

        return {
            currentComponent,
            selectedMainMenu,
        };
    },
};
</script>

<style lang="scss" scoped>

</style>