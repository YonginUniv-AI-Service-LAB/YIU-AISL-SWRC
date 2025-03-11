<template>
  <div class="page-container">
    <div class="content">
      
    </div>
    <footer class="footer">
      <div class="footer-container">
        <div class="location">
          <h3>Location</h3>
          <p>경기도 용인시 처인구 용인대학교로 134</p>
          <p>용인대학교 무도대학 6층</p>
        </div>
        <div class="contact">
          <h3>Contact</h3>
          <p>TEL. 031-8020-2653</p>
        </div>
        <div class="copyright">
          <p>© 2025. Yong In University. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>

<style scoped>

/* 페이지 전체 레이아웃 */
.page-container {
  display: flex;
  flex-direction: column; 
  width: 100%;
  min-height: 18vh; /* 화면 전체 높이 */
  
}

/* 콘텐츠 영역 */
.content {
  flex: 1; /* 나머지 공간을 콘텐츠가 차지 */
}

/* 푸터 스타일 */
.footer {
  background-color: #262626; /* 푸터 배경 어두운 회색 */
  color: #fff; /* 텍스트 흰색 */
  padding: 3vh ;
  margin:0;
}

.footer-container {
  display: flex;
  justify-content: space-between; /* 각 섹션 간격 균등 배분 */
  align-items: flex-start;
  flex-wrap: wrap; /* 화면 크기에 따라 줄바꿈 */
  width: 100%;
  max-width: 1000px; /* 중앙 정렬을 위한 최대 너비 */
  margin: 0 auto; /* 가운데 정렬 */
  left: 0;
  right: 0;
}

.footer-container div {
  flex: 1; /* 각 섹션이 동일한 크기를 차지 */
  
}

.location,
.contact {
  position: relative;
  transform: translate(-50%, -10%); 
}

.location h3,
.contact h3 {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
}

.location p,
.contact p {
  margin: 5px 0;
  font-size: 13px;
}

.location::after {
  content: '';
  position: absolute;
  top: 17%;
  right: 0; /* 구분선이 오른쪽 끝에 위치하도록 설정 */
  width: 0.5px;
  height: 75%;
  background-color: #fff; /* 세로 구분선 색상 */
  margin-right: 15%; /* 구분선을 왼쪽으로 이동시키기 위해 margin-right 사용 */
}

.copyright {
  flex-basis: 100%; /* 한 줄 전체를 차지 */
  text-align: right;
  margin-top: 25px;
  font-size: 12px;
  padding-top: 10px;
  transform: translate(30%, -8%);
}
</style>
