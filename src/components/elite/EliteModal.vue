<template>
  <teleport to="body">
    <div v-if="show" class="overlay">
      <div class="modal">
        <div class="upper">
          <p>내 기록 추가</p>
          <div class="buttons">
            <button class="delete" @click="closeModal">닫기</button>
            <button class="delete-record">기록 삭제</button>
            <button class="add">저장 및 추가</button>
          </div>
        </div>
        <hr class="line">
        <p class="option1">기본 사항</p>
        <EliteSelect />
        <hr class="line2">
        <p class="option2">내 기록</p>
        <p class="description">순서는 자동으로 <br>정렬됩니다.</p>
        <!-- 첫 번째 기본 기록 (고정) -->
<div class="record-group">
  <div class="my-record">
    <div class="record-item">
      <label>날짜</label>
      <input v-model="myRecords[0].date" placeholder="날짜를 입력해주세요" type="text" />
    </div>
    <div class="record-item">
      <label>기록</label>
      <input v-model="myRecords[0].record" placeholder="기록을 입력해주세요" type="text" />
    </div>
    <div class="record-item-wide">
      <label>특이사항 (선택사항)</label>
      <input v-model="myRecords[0].notes" placeholder="특이사항이 있다면 입력해주세요" type="text" />
    </div>
    <!-- X 버튼 -->
    <div class="x" @click="removeRecord(index + 1)">
      <img src="@/assets/images/close.png" alt="삭제" class="x-button" />
    </div>
  </div>
</div>

<!-- 추가된 기록 (라벨 없이) -->
<div v-for="(record, index) in myRecords.slice(1)" :key="index + 1" class="record-group">
  <div class="my-record">
    <div class="record-item">
      <input v-model="record.date" placeholder="날짜를 입력해주세요" type="text" />
    </div>
    <div class="record-item">
      <input v-model="record.record" placeholder="기록을 입력해주세요" type="text" />
    </div>
    <div class="record-item-wide">
      <input v-model="record.notes" placeholder="특이사항이 있다면 입력해주세요" type="text" />
    </div>
    <!-- X 버튼 -->
    <div class="x1" @click="removeRecord(index + 1)">
      <img src="@/assets/images/close.png" alt="삭제" class="x-button" />
    </div>
  </div>
</div>
<hr class="line3">
<div class="add-record" @click="addRecord">기록 추가 +</div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { defineComponent, ref } from "vue";
import EliteSelect from '@/components/layout/EliteSelect.vue';

export default defineComponent({
  components: { EliteSelect },
  props: {
    show: Boolean,
  },
  emits: ["update:show"],
  setup(props, { emit }) {
    const myRecords = ref([{ date: "", record: "", notes: "" }]);
    
    const addRecord = () => {
      myRecords.value.push({ date: "", record: "", notes: "" });
    };
    const removeRecord = (index) => {
      myRecords.value.splice(index, 1);
};
    const closeModal = () => {
      emit("update:show", false);
    };
    
    return { myRecords, addRecord, removeRecord, closeModal };
  },
});
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal {
  overflow-y: auto; /* 세로 스크롤 활성화 */
  background: white;
  height: 65%;    //height: 580px; 
  width: 80%;     //width: 1440px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  position: relative;
 overflow-x: hidden;
 padding-bottom: 20px;
}

.upper{
  display: flex;
  justify-content:space-around; 
  align-items: center; // 위 아래 간격 조절
  gap:52%; // 양옆 간격 조절
  margin-left: 3%;
  margin-right: 3%;
 
}
.upper p{
  font-weight:bold ;
  font-size: 2rem;
  color:#3F3F3F;
  
}
.buttons{
  display: flex;
  gap:10px
}

.upper button{
  font-weight: bold;
  border-radius: 8px;
  border: none;
  cursor: pointer; //마우스를 올렸을 때 커서 모양을 손목 모양으로 변경
}
.delete-record{
  background-color:#262626 ;
  color: #ECECEC;
  padding-left: 10px;
  padding: 15px 30px 15px 30px;
}
.delete{
  background-color:#ECECEC;
  color: #737373;
  padding-left: 10px;
  padding: 15px 40px 15px 40px;
}
.add{
  background-color:#005871 ;
  color: #ECECEC;
  padding: 15px 23px 15px 23px;  
}

// .close {
//   position: absolute;
//   top: 5px;
//   right: 15px;
//   font-size: 24px;
//   font-weight: bold;
//   color: #333;
//   cursor: pointer;
// }

.line{
  position:relative;
  width: 93%;
 
}

.option1{
  position: relative;
  left: 3.5%;
  top:0.5%
}
.option2{
  position: relative;
  top:14%;
  left:3.5%;
}
.description{
  font-size: 13px;
  position: relative;
  top:12%;
  left:3.5%;
  color: #868686;
}
.line2{
  position:relative;
  top: 11%;
  width: 93%;
}

.record-group {
  display: flex;
  // flex-direction: column;
 padding-bottom: 1%;
}

.my-record {
  position: relative; /* 기존 absolute 제거 */
  display: flex;
  flex-wrap: wrap;
  width: 70%; /* 부모 요소 기준 크기 조정 */
  margin: 0 auto; /* 가운데 정렬 */
}
.my-record label {
  display: block; /* 레이블을 블록 요소로 설정 */
  margin-bottom: 5px; /* 레이블과 입력 필드 간의 간격 */
  color: #737373;
}


.my-record p {
  font-size: 15px;
  font-weight: bold;
  color: #333;
}

.my-record input {
  padding: 13px 20px 13px 20px;
  color: #595959;
  font-size: 14px;
  border: 1px solid #595959 ;
  transition: 0.3s;
  background-color: #F8F8F8;

}
.record-item-wide input{
 position: absolute;
  width: 62%;
}
.x{

  background-color: #595959;
  padding: 22px ;
  position: absolute;
  margin-left: 112.3%;
  margin-top: 3.1%;
  border: 1px #595959;
 
}
.x1{
  background-color: #595959;
  padding: 22px ;
  position: absolute;
  margin-left: 112.3%;

  border: 1px #595959;
}
.x-button{
  height: auto;
  width: auto;
  position: absolute;
   right:10% ;
  bottom: 10%;
  cursor: pointer;
  

}
.add-record{
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-top: 3.5%;
  color: #737373;
}

.line3{
  position:relative;
  width: 81.2%;
  top: 4%;
  left:5.7%;
}
</style>