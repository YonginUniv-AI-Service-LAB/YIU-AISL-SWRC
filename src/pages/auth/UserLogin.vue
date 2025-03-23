<template>
  <div class="login-container">
    <!-- 헤더 -->
    <MainHeader />

    <!-- 배경 이미지 -->
    <div class="background-container">
      <img
        src="@/assets/images/image5.svg"
        alt="Login Background"
        class="background-image"
      >
    </div>

    <!-- 로그인 박스 -->
    <div class="login-box">
      <h2 class="title">
        로그인
      </h2>
      <p class="subtitle">
        엘리트 선수 기록 관리 시스템은 로그인 후 이용 가능합니다.
      </p>

      <form class="login-form">
        <!-- 아이디 입력 필드 -->
        <div class="form-group">
          <label for="username">이메일</label>
          <input 
            id="username" 
            v-model="formData.username" 
            type="text" 
            placeholder="" 
          >
        </div>

        <!-- 비밀번호 입력 필드 -->
        <div class="form-group password-group">
          <label for="password">비밀번호</label>
          <div class="password-wrapper">
            <input
              id="password"
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder=""
              class="password-input"
            >
            <img
              src="@/assets/images/eye.svg"
              alt="Toggle Password Visibility"
              class="eye-icon"
              @click="togglePassword"
            >
          </div>
        </div>

        <!-- 로그인 유지 체크박스 -->
        <div class="checkbox-group">
          <input
            id="rememberMe"
            v-model="formData.rememberMe"
            type="checkbox"
          >
          <label for="rememberMe">로그인 유지</label>
        </div>

        <!-- 로그인 버튼 -->
        <button
          type="submit"
          class="login-btn"
        >
          로그인
        </button>
      </form>

      <!-- 또는 구분선 -->
      <div class="divider">
        <span>또는</span>
      </div>

      <!-- 회원가입 하러가기 버튼 -->
      <div class="register-link">
        <span @click="goToRegister">회원가입 하러가기</span>
      </div>

      <!-- 비밀번호 찾기(변경) 텍스트 -->
      <div class="reset-password-text">
        <span @click="goToResetPassword">비밀번호 찾기(변경)</span>
      </div>
    </div>
  </div>
  <MainFooter />
</template>

<script>
import MainHeader from "@/components/layout/MainHeader.vue";
import MainFooter from "@/components/layout/MainFooter.vue";

export default {
  components: {
    MainHeader,
    MainFooter,
  },
  data() {
    return {
      formData: {
        username: "",
        password: "",
        rememberMe: false,
      },
      showPassword: false, // 비밀번호 표시 여부
    };
  },
  methods: {
    goToRegister() {
      this.$router.push("/register");
    },
    goToResetPassword() {
      this.$router.push("/reset-password"); // 비밀번호 찾기(변경) 페이지로 이동
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style scoped>
/* 전체 컨테이너 */
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center; /* 세로 방향 중앙 정렬 */
  align-items: center; /* 가로 방향 중앙 정렬 */
  width: 100%;
  min-height: 100vh; /* 최소 높이를 100vh로 설정 */
  background: white;
  position: relative;
  overflow: hidden;
}

/* 배경 컨테이너 */
.background-container {
  width: 100%;
  height: 130vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: var(--BK, #262626); /* 기본 배경 */
}

/* 배경 이미지 */
.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(7px);
  opacity: 0.8; /* 기본 투명도 적용 */
}

/* 어두운 오버레이 추가 */
.background-container::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 반투명 검은색 */
}

/* 로그인 박스 */
.login-box {
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%); /* 수평 가운데 정렬 */
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);

  /* 고정 크기 대신 유동적인 크기 적용 */
  width: 60%; /* 기본적으로 화면의 60% 차지 */
  max-width: 1190px; /* 최대 너비 제한 */
  min-width: 320px; /* 최소 너비 설정 (모바일 대응) */
  height: auto;
  min-height: 400px; /* 최소 높이 유지 */
  max-height: 90vh; /* 화면 비율에 맞게 조정 */
}

/* 반응형 미디어 쿼리 (태블릿 & 모바일) */
@media (max-width: 1200px) {
  .login-box {
    width: 70%; /* 태블릿에서는 화면의 70% */
    max-width: 900px; /* 최대 너비 줄이기 */
  }
}

@media (max-width: 992px) {
  .login-box {
    width: 80%; /* 작은 화면에서는 80% */
    max-width: 700px; /* 너비 자동 조정 */
  }
}

@media (max-width: 768px) {
  .login-box {
    width: 90%;
    max-width: 500px; /* 모바일에서 더 작은 크기 유지 */
    padding: 1.5rem;
  }
}

.title {
  font-size: 2rem;
  font-weight: 600;
  color: #000000;
  margin-bottom: 0;
}

.subtitle {
  font-size: 1rem;
  font-weight: 500;
  color: #737373;
  margin-top: 0.3rem;
  /* margin-bottom: 1.5rem; */
}

/* 로그인 폼 */
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 400px;
  padding: 0.7rem;
}

/* 로그인 버튼 */
.login-btn {
  width: 100%;
  max-width: 400px;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  padding: 0.8rem;
  border-radius: 8px; /* 둥근 모서리 */
  border: 2px solid #ECECEC; /* 테두리 색상 */
  background: #ECECEC; /* 배경색 */
  font-size: 1rem;
  font-weight: 600;
  color: #737373; /* 글자 색상 */
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-align: center;
}

/* 호버 효과 */
.login-btn:hover {
  background: #005871; /* 마우스 호버 시 버튼 색상 변경 */
  color: #ECECEC; /* 글자 색상 변경 */
  border: 2px solid #005871; /* 테두리 색상 변경 */
}

/* 안내 문구 스타일 */
.subtitle {
  color: var(--Gr-02, #737373);
  font-family: KoPubWorldDotum;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  text-align: center; /* 중앙 정렬 */
  margin-bottom: 1.5rem; /* 입력 필드와 간격 조정 */
}

/* 입력 폼 그룹 */
.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 라벨을 왼쪽 정렬 */
  width: 100%;
  margin-bottom: 20px;
}

/* 라벨 스타일 */
.form-group label {
  font-size: 1rem;
  font-weight: 600;
  color: #3f3f3f;
  margin-bottom: 3px;
  text-align: left;
  width: 100%;
}

/* 입력 필드 */
.form-group input {
  width: 100%;
  padding: 12px 24px;
  border: 2px solid #737373;
  border-radius: 8px;
  font-size: 1rem;
  text-align: left;
  box-sizing: border-box;
}

/* 비밀번호 입력 필드와 아이콘을 감싸는 컨테이너 */
.password-wrapper {
  position: relative;
  width: 100%;
}

/* 비밀번호 입력 필드 */
.password-input {
  width: 100%;
  padding: 12px 24px;
  padding-right: 50px;
  border: 2px solid #737373;
  border-radius: 8px;
  font-size: 16px;
  text-align: left;
}

/* 눈 아이콘 */
.eye-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  cursor: pointer;
  /* opacity: 0.6; */
  color: #737373;
  transition: opacity 0.2s ease-in-out;
}


/* 체크박스 그룹 */
.checkbox-group {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  font-size: 1rem;
  font-weight: 500;
  color: #737373;
  margin-top: -0.3rem;
}

/* "또는" 구분선 */
.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  margin: 20px 0;
  font-size: 0.8rem;
  font-weight: 500;
  color: #262626;
  text-align: center;
  margin-top: -10px;
}

/* 구분선 좌우 라인 */
.divider::before,
.divider::after {
  content: "";
  flex-grow: 1;
  height: 1px;
  background: #262626;
}

/* 구분선 가운데 텍스트 */
.divider span {
  padding: 0 10px;
  background: #fff;
}

/* 회원가입 하러가기 버튼 */
.register-link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 380px;
  padding: 12px;
  border-radius: 8px;
  border: 2px solid var(--main01, #005871);
  background: #FFF;
  color: var(--main01, #005871);
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  line-height: 150%; /* 30px */
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  margin-top: 0.7rem;
}

/* 회원가입 하러가기 버튼 호버 효과 */
.register-link:hover {
  background: #005871;
  color: #ECECEC;
}

/* 비밀번호 찾기(변경) 텍스트 */
.reset-password-text {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 380px;
  margin-top: 1.2rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: #737373; /* 회색 텍스트 */
  cursor: pointer;
  transition: color 0.2s ease-in-out;
}
</style>