<template>
    <div class="password-change-container">
      <!-- 헤더 -->
      <MainHeader />
  
      <!-- 배경 이미지 -->
      <div class="background-container">
        <img src="@/assets/images/image5.svg" alt="Password Change Background" class="background-image" />
      </div>
  
      <!-- 비밀번호 변경 박스 -->
      <div class="password-change-box">
        <!-- 로그인 하러가기 링크 -->
        <div class="login-link">
          <span @click="goToLogin">로그인 하러가기 -></span>
        </div>
  
        <h2 class="title">비밀번호 변경</h2>
  
        <!-- 폼 영역 -->
        <form class="password-change-form">
          <!-- 이메일 입력 필드와 인증번호 받기 버튼 -->
          <div class="form-group email-group">
            <label for="email" class="left-align">이메일</label>
            <div class="email-wrapper">
              <input
                type="email"
                id="email"
                v-model="formData.email"
                placeholder="이메일을 입력해주세요."
                class="email-input"
              />
              <button type="button" class="auth-btn" @click="sendVerificationCode">인증번호 받기</button>
            </div>
          </div>
  
          <!-- 인증번호 입력 필드 -->
          <div class="form-group">
            <input
              type="text"
              id="verificationCode"
              v-model="formData.verificationCode"
              placeholder="인증번호를 입력해주세요."
              class="password-input"
            />
          </div>
  
          <!-- 새 비밀번호 입력 필드 -->
          <div class="form-group password-group">
            <label for="newPassword" class="left-align">새 비밀번호 입력</label>
            <input
              type="password"
              id="newPassword"
              v-model="formData.newPassword"
              placeholder="비밀번호를 입력해주세요."
              class="password-input"
            />
          </div>
  
          <!-- 비밀번호 확인 입력 필드 -->
          <div class="form-group password-group">
            <input
              type="password"
              id="confirmPassword"
              v-model="formData.confirmPassword"
              placeholder="비밀번호 확인"
              class="password-input"
            />
          </div>
  
          <!-- 비밀번호 변경 버튼 -->
          <button type="submit" class="change-btn">비밀번호 변경</button>
        </form>
      </div>
  
      <!-- 푸터 -->
      <MainFooter />
    </div>
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
          verificationCode: "",
          newPassword: "",
          confirmPassword: "",
        },
      };
    },
    methods: {
      sendVerificationCode() {
        // 인증번호 전송 로직
        alert("인증번호가 전송되었습니다.");
      },
      goToLogin() {
        this.$router.push("/login"); // 로그인 페이지로 이동
      },
    },
  };
  </script>
  
  <style scoped>
  /* 전체 컨테이너 */
  .password-change-container {
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
    height: 100vh;
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
  
  /* 비밀번호 변경 박스 */
  .password-change-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
    max-height: 90vh;
  }
  
  /* 로그인 하러가기 링크 */
  .login-link {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 14px;
    font-weight: 600;
    color: #737373; /* 회색으로 변경 */
    cursor: pointer;
    transition: color 0.3s ease-in-out;
  }
  
  .login-link:hover {
    color: #005871; /* 호버 시 색상 변경 */
  }
  
  /* 폼 영역 */
  .password-change-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 400px;
  }
  
  /* 폼 그룹 */
  .form-group {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 10px; /* 필드 간격 줄이기 */
  }
  
  /* 왼쪽 정렬 라벨 */
  .left-align {
    text-align: left;
    width: 100%;
    font-size: 1rem;
    font-weight: 600;
    color: #3f3f3f;
    margin-bottom: 8px;
  }
  
  /* 이메일 그룹 */
  .email-group {
    margin-bottom: 20px;
  }
  
  /* 이메일 입력 필드와 버튼을 감싸는 컨테이너 */
  .email-wrapper {
    display: flex;
    align-items: center;
    gap: 10px; /* 입력 필드와 버튼 사이 간격 */
  }
  
  /* 이메일 입력 필드 */
  .email-input {
    flex: 2; /* 더 많은 공간 차지 */
    padding: 12px 24px;
    border: 2px solid #737373;
    border-radius: 8px;
    font-size: 1rem;
    text-align: left;
    box-sizing: border-box;
  }
  
  /* 인증번호 받기 버튼 */
  .auth-btn {
    flex: 1; /* 더 적은 공간 차지 */
    padding: 12px;
    background: #e6e6e6; /* 평소 색상 */
    color: #737373; /* 평소 글자 색상 */
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
  }
  
  .auth-btn:hover {
    background: #005871; /* 눌렀을 때 색상 */
    color: white; /* 눌렀을 때 글자 색상 */
  }
  
  /* 비밀번호 입력 필드 */
  .password-input {
    width: 100%;
    padding: 12px 24px;
    border: 2px solid #737373;
    border-radius: 8px;
    font-size: 1rem;
    text-align: left;
    box-sizing: border-box;
    margin-bottom: 5px; /* 필드 간격 최소화 */
  }
  
  /* 비밀번호 변경 버튼 */
  .change-btn {
    width: 100%;
    max-width: 400px;
    padding: 12px;
    background: #e6e6e6; /* 평소 색상 */
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    color: #737373; /* 평소 글자 색상 */
    cursor: pointer;
    transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
    margin-top: 20px;
  }
  
  .change-btn:hover {
    background: #005871; /* 눌렀을 때 색상 */
    color: white; /* 눌렀을 때 글자 색상 */
  }
  </style>