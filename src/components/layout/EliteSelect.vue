<template>
  <div class="select-box">
   <div class="selct-box-position">
    <div class="select-box1">
      <div>분야{{ selected }}</div>

      <select v-model="selected">
      <option disabled value="">몸무게</option>
        <option>가</option>
        <option>나</option>
        <option>다</option>
      </select>
    </div>

    <div class="select-box2">
      <div>단위{{ selected }}</div>

      <select v-model="selected">
      <option disabled value="">kg</option>
        <option>가</option>
        <option>나</option>
        <option>다</option>
      </select>
    </div>
   </div>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>


.select-box div{
  padding-bottom: 8%;
}
.select-box{
  position: absolute;
  top: 22%;
  left: 5%
}

.select-box select {
  width: 180px;  // 너비 조절
  padding: 8px;  // 내부 여백 추가
  border-radius: 5px;  // 둥근 모서리
  border: 2px solid #737373;  // 테두리 색상
  // background-color: #f9f9f9;  // 배경색
  font-size: 16px;  // 글자 크기
  cursor: pointer; // 마우스 오버 시 포인터 변경
  appearance: none; // 기본 브라우저 스타일 제거
  outline: none; // 클릭 시 테두리 제거
}

/* select 요소 화살표 커스텀 (배경 이미지 사용 가능) */
.select-box select {
  background-image: url("@/assets/images/Polygon 3.png"); /* 셀렉트 화살표 아이콘 */
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
}

/* 옵션 스타일 */
.select-box option {
  background: white;
  font-size: 16px;
  padding: 10px;
}
.selct-box-position{
  display: flex;
  gap:15%
}


</style>
