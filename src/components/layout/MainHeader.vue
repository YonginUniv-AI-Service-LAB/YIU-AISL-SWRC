<template>
    <header>
        <div class="logo" @click="goToHome"> 
            <img src="@/assets/images/yiu.png" alt="Logo" />
        </div>
        <nav>
            <ul>
                <MainDropdown title="스포츠ㆍ웰니스연구센터 소개" :items="labIntroItems" @navigate="navigateToPage" />
                <MainDropdown title="스포츠ㆍ웰니스연구센터 연구실" :items="labEquipmentItems" @navigate="navigateToPage" />
                <MainDropdown title="국민체력100" :items="fitnessItems" @navigate="navigateToPage" />
                <MainDropdown title="엘리트 선수 관리 시스템" :items="eliteItems" @navigate="navigateToPage" />
            </ul>
        </nav>
    </header>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import MainDropdown from './MainDropdown.vue';

export default {
    components: { MainDropdown },
    setup(_, { emit }) {
        const router = useRouter();
        const isLoggedIn = ref(true);
        const selectedMainMenu = ref("스포츠ㆍ웰니스연구센터 소개"); // 기본값 설정

        const goToHome = () => {
            router.push('/');
            selectedMainMenu.value = "스포츠ㆍ웰니스연구센터 소개"; // 홈 클릭 시 기본값으로 변경
            emit('update:selectedMainMenu', selectedMainMenu.value);
        };

        // 드롭다운 항목 클릭 시 페이지 이동
        const navigateToPage = (title, path) => {
            if (path) {
                router.push(path); // 페이지 이동
                selectedMainMenu.value = title; // 선택된 메뉴 업데이트
                emit("update:selectedMainMenu", selectedMainMenu.value); // 부모 컴포넌트로 전달
            }
        };

        return {
            goToHome, // 메인 페이지 이동 함수
            navigateToPage,

            labIntroItems: [
                { title: '인사말', path: '/' },
                { title: '주요 사업', path: '/' },
                { title: '기관 연혁', path: '/detail/history' },
                { title: '조직도 위원회', path: '/detail/organization' },
                { title: '위치 및 연락처', path: '/detail/location' },
            ],
            labEquipmentItems: [
                { title: '운동생리학 & 생화학', path: '/detail/exercisephysiology' },
                { title: '운동 역학', path: '/detail/kinetics' },
                { title: '세미나실 & 스터디룸', path: '/detail/seminar' },
            ],
            eliteItems: [
                { title: '체력 측정분석', path: '/elite-player' },
                { title: '경기 기록', path: '/elite-manager' },
            ],
            isLoggedIn,  // 로그인 상태
        };
    },
}
</script>

<style lang="scss" scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(0, 0, 0, 0); /* 80% 불투명, 20% 투명 */
    padding: 0.8rem 11rem;
    width: 100%;
    height: 6%; /* 높이 6% */
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;

    .logo img{
        height: 30px; /* 로고 높이 */
        width: auto; /* 너비 자동 조정 */
        cursor: pointer;
    }

    nav {
        ul {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            padding-right: 20rem; /* 왼쪽으로 이동 */
        }

        li {
            color: #ffffff; /* 기본 색상 흰색 */

            &:hover {
                color: #72BDD6; /* 마우스를 올렸을 때 색상 변경 */
            }
        }
    }
}
</style>