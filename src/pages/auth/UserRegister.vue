<template>
  <div class="register-container">
    <!-- 헤더 -->
    <MainHeader />

    <!-- 배경 이미지 -->
    <div class="background-container">
      <img src="@/assets/images/image5.svg" alt="Register Background" class="background-image" />
    </div>

    <!-- 회원가입 박스 -->
    <div class="register-box">
      <h2 class="title">회원가입</h2>

      <!-- 학생 / 관리자 선택 버튼 -->
      <div class="role-selection">
        <button
          :class="['role-btn', { active: userRole === 'student' }]"
          @click="selectRole('student')"
        >
          학생
        </button>
        <button
          :class="['role-btn', { active: userRole === 'admin' }]"
          @click="selectRole('admin')"
        >
          관리자
        </button>
      </div>

      <form @submit.prevent="handleRegister" class="register-form">

      <!-- 이메일 입력 + 인증번호 받기 버튼 -->
  <div class="form-group email-group">
    <label for="email">이메일</label>
    <div class="input-group">
      <input
        id="email"
        type="email"
        v-model="formData.email"
        placeholder="이메일을 입력해주세요."
        required
        class="email-input"
      />
      <button type="button" class="check-btn" @click="checkEmailAvailability">
        인증번호 받기
      </button>
    </div>
  </div>
        <!-- 비밀번호 입력 -->
        <div class="form-group">
          <label for="password">비밀번호</label>
          <input
            id="password"
            type="password"
            v-model="formData.password"
            placeholder="비밀번호를 입력해주세요."
            required
          />
        </div>

        <!-- 비밀번호 확인 (라벨 제거하고, placeholder로 표시) -->
        <div class="form-group">
          <input
            id="passwordConfirm"
            type="password"
            v-model="formData.passwordConfirm"
            placeholder="비밀번호 확인"
            required
          />
        </div>

        <!-- 이름 입력 -->
        <div class="form-group">
          <label for="name">이름</label>
          <input
            id="name"
            type="text"
            v-model="formData.name"
            placeholder="이름을 입력해주세요."
            required
          />
        </div>

        <!-- 전화번호 입력 -->
        <div class="form-group">
          <label for="phone">전화번호</label>
          <input
            id="phone"
            type="text"
            v-model="formData.phone"
            placeholder="전화번호를 입력해주세요."
            required
          />
        </div>

        <!-- 관리자 선택 시 종목 입력 필드 추가 -->
        <div class="form-group" v-if="userRole === 'admin'">
          <label for="sport">종목</label>
          <select
            id="sport"
            v-model="formData.sport"
            required
            class="sport-select"
          >
            <option value="" disabled selected>종목을 선택해주세요.</option>
            <option v-for="sport in sports" :key="sport" :value="sport">
              {{ sport }}
            </option>
          </select>
        </div>

        <!-- 개인정보 동의 체크박스 -->
        <div class="checkbox-group">
          <input type="checkbox" id="privacy" v-model="formData.agree" required />
          <label for="privacy">(필수) 개인정보 수집이용 동의</label>
        </div>

        <!-- 가입 버튼 -->
        <button type="submit" class="register-btn">가입하기</button>
      </form>

      <!-- 로그인 페이지 이동 -->
      <div class="login-link">
        <span @click="goToLogin">로그인 하러가기  →</span>
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
        email: "",
        password: "",
        passwordConfirm: "",
        name: "",
        phone: "",
        agree: false,
        sport: "", // 관리자용 종목 입력 필드
      },
      userRole: null, // 'student' 또는 'admin' 저장
      sports: ["축구", "유도", "태권도"], // 선택 가능한 종목 리스트
    };
  },
  methods: {
    handleRegister() {
      console.log("회원가입 시도:", this.formData);
    },
    goToLogin() {
      this.$router.push("/login");
    },
    selectRole(role) {
      this.userRole = role;
      if (role === "student") {
        this.formData.sport = ""; // 학생 선택 시 종목 필드 초기화
      }
    },
    checkEmailAvailability() {
      console.log("이메일 중복 확인 실행:", this.formData.email);
      alert("이메일 중복 확인 기능입니다.");
    },
  },
};
</script>



<style scoped>
/* 전체 컨테이너 */
.register-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background: white;
  position: relative;
}

/* 배경 컨테이너 */
.background-container {
  width: 100vw;
  height: 165vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: var(--BK, #262626);
}

/* 배경 이미지 */
.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(7px);
  opacity: 0.8;
}

/* 어두운 오버레이 추가 */
.background-container::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

/* 회원가입 박스 */
.register-box {
  position: absolute;
  top: 12%;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);

  width: 60%;
  max-width: 1190px;
  min-width: 320px;
  height: auto;
  min-height: 400px;
  max-height: none;
}

/* 이메일 입력 그룹 스타일 */
.email-group .input-group {
  display: flex;

  gap: 10px; /* 요소 사이 간격 */
  width: 100%;
  max-width: 400px;
}

/* 이메일 입력 필드 스타일 */
.email-input {
  flex: 1; /* 남은 공간을 모두 차지 */
  padding: 12px 24px;
  border: 2px solid #737373;
  border-radius: 8px;
  font-size: 1rem;
  text-align: left;
  box-sizing: border-box; /* padding과 border를 높이에 포함 */
  height: 48px; /* 높이 고정 */
  line-height: 24px; /* 텍스트 수직 중앙 정렬 */

}

/* 인증번호 받기 버튼 스타일 */
.check-btn {
  padding: 12px 24px; /* 버튼 크기 조정 */
  font-size: 14px;
  border: 2px solid #737373; /* 평소 색상: 회색 */
  border-radius: 6px;
  background: white;
  color: #737373; /* 평소 색상: 회색 */
  cursor: pointer;
  transition: all 0.3s ease; /* 색상 변경 애니메이션 */
  height: 48px; /* 높이 고정 */
  line-height: 24px; /* 텍스트 수직 중앙 정렬 */
  white-space: nowrap; /* 버튼 텍스트 줄바꿈 방지 */
  box-sizing: border-box; /* padding과 border를 높이에 포함 */
  display: flex;
  align-items: center; /* 텍스트를 버튼 내부에서 수직 중앙 정렬 */
  justify-content: center; /* 텍스트를 버튼 내부에서 수평 중앙 정렬 */
  
}

/* 버튼 호버 및 클릭 시 색상 변경 */
.check-btn:hover,
.check-btn:active {
  border-color: #005871; /* 파란색 */
  background: #005871; /* 파란색 */
  color: white; /* 흰색 */
}

.email-input,
.check-btn {
  height: 48px; /* 높이 동일하게 설정 */
  line-height: 24px; /* 텍스트 수직 중앙 정렬 */
  box-sizing: border-box; /* padding과 border를 높이에 포함 */
  padding: 12px 24px; /* 패딩 동일하게 설정 */
  box-sizing: border-box;
}

/* 입력 폼 */
.register-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 90vw;
  padding: 2rem;
}

/* 입력 필드 그룹 */
.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90%;
  max-width: 400px;
  margin-bottom: 20px;
}

/* 라벨 스타일 */
.form-group label {
  font-size: 1rem;
  font-weight: 600;
  color: #3f3f3f;
  margin-bottom: 8px;
  text-align: left;
  width: 100%;
}

/* 입력 필드 */
.form-group input,
.sport-select {
  width: 100%;
  padding: 12px 24px;
  border: 2px solid #737373;
  border-radius: 8px;
  font-size: 1rem;
  text-align: left;
  box-sizing: border-box;
  background-color: white;
  appearance: none;
  cursor: pointer;
}

/* 드롭다운 화살표 커스텀 */
.sport-select {
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23737373%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px;
}

/* 드롭다운 호버 및 포커스 스타일 */
.sport-select:hover,
.sport-select:focus {
  border-color: #005871;
  outline: none;
}

/* 학생 / 관리자 선택 버튼 */
.role-selection {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 400px;
  gap: 10px;
  margin-bottom: 20px;
}

/* 버튼 스타일 */
.role-btn {
  flex: 1;
  padding: 12px;
  font-size: 14px;
  border: 2px solid #737373;
  border-radius: 6px;
  background: white;
  color: #737373;
  cursor: pointer;
  text-align: center;
  transition: 0.3s;
}

/* 선택된 버튼 */
.role-btn.active {
  border-radius: 8px;
  border: 2px solid var(--BK, #262626);
  background: var(--BK, #262626);
  color: white;
}

/* 비밀번호 입력 필드 스타일 */
.form-group input[type="password"] {
  width: 100%;
  padding: 12px 24px;
  border: 2px solid #737373;
  border-radius: 8px;
  font-size: 1rem;
  text-align: left;
  box-sizing: border-box;
}

/* 비밀번호 확인 입력 필드 (라벨 없이 placeholder로 표시) */
#passwordConfirm {
  width: 100%;
  padding: 12px 24px;
  border: 2px solid #737373;
  border-radius: 8px;
  font-size: 1rem;
  text-align: left;
  box-sizing: border-box;
}

/* 비밀번호 입력 필드와 비밀번호 확인 필드 간격 조정 */
#passwordConfirm {
  margin-top: -10px; /* 두 필드를 더 가깝게 배치 */
}

/* 공통 입력 필드 스타일 (전화번호 & 이메일) */
.form-group input[type="text"],
.form-group input[type="email"] {
  width: 100%;
  padding: 12px 24px;
  border: 2px solid #737373;
  border-radius: 8px;
  font-size: 1rem;
  text-align: left;
  box-sizing: border-box;
}

/* 전화번호 & 이메일 필드 라벨 스타일 */
.form-group label {
  font-size: 1rem;
  font-weight: 600;
  color: #3f3f3f;
  margin-bottom: 8px;
  text-align: left;
  width: 100%;
}

/* 전화번호 & 이메일 필드 간격 조정 */
#phone {
  margin-bottom: 10px; /* 전화번호 필드 아래 여백 */
}

#email {
  margin-bottom: 15px; /* 이메일 필드 아래 여백 */
}

/* 개인정보 동의 체크박스 */
.checkbox-group {
  display: flex;
  align-items: center; /* 체크박스와 텍스트 정렬 */
  gap: 8px; /* 체크박스와 텍스트 사이 간격 */
  width: 100%; /* 입력 필드와 동일한 너비 유지 */
  max-width: 400px; /* 최대 너비 설정 */
  margin: 10px 0; /* 이메일 필드와 가입하기 버튼 사이 간격 조정 */
  color: var(--Gr-03, #3F3F3F);
  font-family: KoPubWorldDotum;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: auto;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
}

/* 체크박스 스타일 */
.checkbox-group input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #005871; /* 체크박스 색상 */
}

/* 체크박스 라벨 */
.checkbox-group label {
  cursor: pointer;
}

/* 이메일 필드 */
.form-group.email {
  margin-bottom: 10px; /* 이메일과 개인정보 동의 체크박스 사이 간격 */
}

/* 가입하기 버튼 */
.register-btn {
  margin-top: 30px; /* 개인정보 동의 체크박스와 가입하기 버튼 사이 간격 */
}

/* 가입 버튼 (로그인 버튼과 동일한 크기 적용) */
.register-btn {
  width: 100%;
  max-width: 400px;
  padding: 12px;
  background: #e6e6e6;
  border: 2px solid #e6e6e6;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 600;
  color: #737373;
  cursor: pointer;
  transition: 0.3s;
}

.register-btn:hover {
  background: #d4d4d4;
}

/* "또는" 구분선 (로그인과 동일하게 적용) */
.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  margin: 20px 0;
  font-size: 18px;
  font-weight: 500;
  color: #737373;
  font-family: KoPubWorldDotum;
  text-align: center;
}

/* 구분선 좌우 라인 */
.divider::before,
.divider::after {
  content: "";
  flex-grow: 1;
  height: 1px;
  background: #ccc;
}

/* 구분선 가운데 텍스트 */
.divider span {
  padding: 0 10px;
  background: #fff;
}


/* 로그인 링크 (회원가입 박스 오른쪽 상단 배치) */
.login-link {
  position: absolute;
  top: 20px; /* 회원가입 박스 상단에서 간격 */
  right: 20px; /* 회원가입 박스 오른쪽에서 간격 */
  font-size: 16px;
  font-weight: 600;
  color: var(--Gr-02, #737373); /* 새로운 색상 적용 */
  cursor: pointer;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}

/* 호버 효과 */
.login-link:hover {
  color: #505050; /* 조금 더 어두운 색상으로 변경 */
}


.login-link:hover {
  background: #f0f0f0;
}


/* 📌 반응형 적용 */
@media (max-width: 1200px) {
  .register-box {
    width: 60%;
    max-width: 450px;
  }
}

@media (max-width: 992px) {
  .register-box {
    width: 70%;
    max-width: 400px;
  }
}

@media (max-width: 768px) {
  .register-box {
    width: 80%;
    max-width: 350px;
    padding: 1.5rem;
  }

  .role-btn {
    padding: 8px 16px;
    font-size: 14px;
  }

  .check-btn {
    padding: 8px;
    font-size: 12px;
  }

  .register-btn {
    font-size: 18px;
    padding: 10px;
  }

  .login-link {
    font-size: 18px;
  }
}
</style>
