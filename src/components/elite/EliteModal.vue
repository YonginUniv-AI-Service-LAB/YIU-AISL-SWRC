<template>
  <!-- 모달창이 가장 앞에 오게 설정 -->
   <teleport to="body">
 <div v-if="show" class="overlay" @click.self="closeModal">
    <div class="modal">
     <span class="close" @click="closeModal">&times;</span>
    <div class="upper">
      <p>내 기록 추가</p>
      <button>저장 및 추가하기</button>
    </div>
    <EliteSelect/>  
    <hr class="line">
  <div class="add-record">
    <div class="date">
    <p>날짜 {{ message }}</p>
    <input v-model="message" placeholder="날짜를 입력해주세요" />
    </div>
    <div class="record">
    <p>기록 {{ message }}</p>
    <input v-model="message" placeholder="기록을 입력해주세요" />
    </div>
  </div>
  </div>
</div>
</teleport>
</template>

<script>
import { defineComponent } from "vue";
import EliteSelect from '@/components/layout/EliteSelect.vue';

export default defineComponent({

  components: { EliteSelect }, // ✅ 등록

  props: {
    show: Boolean, // 모달 표시 여부 (부모에서 전달)
  },
  emits: ["update:show"], // 부모에게 상태 변경 알림
  setup(props, { emit }) {
    const closeModal = () => {
      emit("update:show", false); // 부모 컴포넌트에 모달 닫기 알림
    };

    return { closeModal };
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
  background: white;
  height: 70%;
  width: 80%;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden; // 요소들이 밖으로 나가지 않게 설정정
 
}

.upper{
  display: flex;
  justify-content:space-around; 
  align-items: center; // 위 아래 간격 조절
  gap:55%; // 양옆 간격 조절
  padding-top: 2%;
}
.upper p{
  font-weight:bold ;
  font-size: 1.8rem;
  color:#3F3F3F;
}
.upper button{
  padding: 15px 30px 15px 30px;
    background-color:#005871 ;
    border-radius: 5px;
    color: aliceblue;
    border: none;
    cursor: pointer; //마우스를 올렸을 때 커서 모양을 손목 모양으로 변경
}
.close {
  position: absolute;
  top: 5px;
  right: 15px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
}
.line{
  position:relative;
  top: 18%;
  width: 90%;
}

.add-record {
  display: flex;
  position: absolute;
  bottom: 47%;
  left: 5%;
  
}

.add-record p {
  font-size: 15px;
  font-weight: bold;
  color: #333;
}

.add-record input {
  padding: 10px;
  font-size: 16px;
  border: 1.5px solid #ddd;
  transition: 0.3s;

  &:focus {
    border-color: #007bff; // 포커스 시 강조
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
  }
}



</style>
