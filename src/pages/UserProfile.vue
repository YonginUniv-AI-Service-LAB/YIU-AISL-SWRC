<template>
    <div class="profile-container">
      <!-- 헤더 -->
      <MainHeader />
  
      <!-- 배경 이미지 -->
      <div class="background-container">
        <img src="@/assets/images/image5.svg" alt="Profile Background" class="background-image" />
      </div>
  
      <!-- 프로필 작성 박스 -->
      <div class="profile-box">
        <h2 class="title">어서오세요!</h2>
        <p class="subtitle">
          첫 설정 시 프로필을 작성해주세요. 프로필은 엘리트 선수 기록 관리 시스템에서 언제든 수정 가능해요.
        </p>
  
        <!-- 프로필 사진 선택 -->
        <div class="profile-picture">
          <div class="profile-circle">
            <img
              v-if="profileImage"
              :src="profileImage"
              alt="Profile Picture"
              class="profile-image"
            />
            <span v-else class="upload-text">사진 업로드</span>
            <input
              type="file"
              accept="image/*"
              class="file-input"
              @change="handleImageUpload"
            />
          </div>
        </div>
  
        <!-- 인적사항 -->
        <div class="section">
          <h3 class="section-title">인적사항</h3>
          <div class="input-group">
            <div class="form-group">
              <input
                type="text"
                v-model="formData.name"
                placeholder="이름"
              />
            </div>
            <div class="form-group">
              <input
                type="date"
                v-model="formData.birthdate"
              />
            </div>
            <div class="form-group">
              <select v-model="formData.gender">
                <option value="" disabled selected>성별</option>
                <option value="male">남성</option>
                <option value="female">여성</option>
              </select>
            </div>
          </div>
        </div>
  
        <!-- 신체 정보 -->
        <div class="section">
          <h3 class="section-title">신체 정보</h3>
          <div class="input-group">
            <div class="form-group">
              <input
                type="number"
                v-model="formData.height"
                placeholder="키 (cm)"
              />
            </div>
            <div class="form-group">
              <input
                type="number"
                v-model="formData.weight"
                placeholder="몸무게 (kg)"
              />
            </div>
            <div class="form-group">
              <select v-model="formData.sport">
                <option value="" disabled selected>종목</option>
                <option value="축구">축구</option>
                <option value="유도">유도</option>
                <option value="태권도">태권도</option>
              </select>
            </div>
          </div>
        </div>
  
        <!-- 버튼 그룹 -->
        <div class="button-group">
          <button type="button" class="back-btn" @click="goBack">뒤로가기</button>
          <button type="submit" class="save-btn" @click="saveProfile">프로필 저장</button>
        </div>
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
        profileImage: null, // 프로필 사진 URL
        formData: {
          name: "",
          birthdate: "",
          gender: "",
          height: "",
          weight: "",
          sport: "",
        },
      };
    },
    methods: {
      // 프로필 사진 업로드 처리
      handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
          this.profileImage = URL.createObjectURL(file);
        }
      },
      // 뒤로가기
      goBack() {
        this.$router.go(-1); // 이전 페이지로 이동
      },
      // 프로필 저장
      saveProfile() {
        console.log("프로필 저장:", this.formData);
        alert("프로필이 저장되었습니다.");
        // 저장 로직 추가 (예: API 호출)
      },
    },
  };
  </script>
  
  <style scoped>
  /* 전체 컨테이너 */
  .profile-container {
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
  
  /* 프로필 작성 박스 */
  .profile-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    width: 60%;
    max-width: 800px;
    min-width: 320px;
    height: auto;
    min-height: 400px;
  }
  
  /* 제목 스타일 */
  .title {
    font-size: 24px;
    font-weight: 700;
    color: #262626;
    margin-bottom: 10px;
  }
  
  /* 부제목 스타일 */
  .subtitle {
    font-size: 14px;
    color: #737373;
    margin-bottom: 20px;
  }
  
  /* 프로필 사진 컨테이너 */
  .profile-picture {
    margin-bottom: 20px;
  }
  
  /* 프로필 사진 원형 컨테이너 */
  .profile-circle {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    cursor: pointer;
  }
  
  /* 프로필 사진 */
  .profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  /* 사진 업로드 텍스트 */
  .upload-text {
    font-size: 14px;
    color: #737373;
  }
  
  /* 파일 입력 필드 (숨김) */
  .file-input {
    display: none;
  }
  
  /* 섹션 스타일 */
  .section {
    width: 100%;
    margin-bottom: 20px;
  }
  
  /* 섹션 제목 스타일 */
  .section-title {
    font-size: 18px;
    font-weight: 600;
    color: #262626;
    text-align: left;
    margin-bottom: 10px;
  }
  
  /* 입력 그룹 스타일 */
  .input-group {
    display: flex;
    gap: 10px; /* 입력 필드 사이 간격 */
  }
  
  /* 입력 필드 스타일 */
  .form-group {
    flex: 1;
  }
  
  .form-group input,
  .form-group select {
    width: 100%;
    padding: 10px;
    border: 2px solid #737373;
    border-radius: 8px;
    font-size: 14px;
    box-sizing: border-box;
  }
  
  /* 버튼 그룹 스타일 */
  .button-group {
    display: flex;
    justify-content: flex-end; /* 오른쪽 정렬 */
    gap: 10px; /* 버튼 사이 간격 */
    width: 100%;
    margin-top: 20px;
  }
  
  /* 뒤로가기 버튼 */
  .back-btn {
    padding: 10px 20px;
    border: 2px solid #737373;
    border-radius: 8px;
    background: white;
    color: #737373;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .back-btn:hover {
    background: #f0f0f0;
  }
  
  /* 프로필 저장 버튼 */
  .save-btn {
    padding: 10px 20px;
    border: 2px solid #005871;
    border-radius: 8px;
    background: #005871;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .save-btn:hover {
    background: #004a63;
  }
  </style>