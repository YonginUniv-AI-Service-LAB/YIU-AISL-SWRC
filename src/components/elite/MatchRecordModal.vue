<template>
    <teleport to="body">
        <div v-if="show" class="modal-overlay">
            <div class="modal-container">
                <!-- 상단 제목 + 버튼 -->
                <div class="modal-header">
                    <h2>경기 기록 추가</h2>
                    <div class="modal-actions">
                        <button class="btn-cancel" @click="closeModal">닫기</button>
                        <button class="btn-save" @click="saveRecord">저장하기</button>
                    </div>
                </div>
                <hr class="divider" />
                
                <!-- 세부 입력 폼 -->
                <div class="modal-body">
                    <h3 class="section-title">세부기록</h3>
                    <div class="form-grid">
                        <div class="form-group1">
                            <label>날짜</label>
                            <input 
                                type="text" 
                                placeholder="날짜를 입력해주세요." 
                                v-model="form.date" 
                                @input="formatDate" 
                            />
                        </div>
                        <div class="form-group2">
                            <label>대회이름</label>
                            <input type="text" placeholder="대회이름을 입력해주세요." v-model="form.tournament" />
                        </div>
                        <div class="form-group3">
                            <label>상대</label>
                            <input type="text" placeholder="상대를 입력해주세요." v-model="form.opponent" />
                        </div>
                        <div class="form-group4">
                            <label>추가사항</label>
                            <input type="text" placeholder="추가사항을 입력해주세요." v-model="form.notes" />
                        </div>
                        <div class="form-group5">
                            <label>승패</label>
                            <select v-model="form.result">
                                <option disabled value="">선택</option>
                                <option>승</option>
                                <option>무</option>
                                <option>패</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script>
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
    name: "MatchRecordModal",
    props: { 
        show: Boolean,
        record: Object, 
    },
    emits: ["update:show", "save"], // ✅ 부모로 "save" 이벤트 emit 추가
    setup(props, { emit }) {
        const form = ref({
            date: "",
            tournament: "",
            opponent: "",
            result: "",
            notes: ""
        });

        watch(
            () => props.record,
            (newRecord) => {
                if (newRecord) {
                    form.value = { ...newRecord };
                }
            },
            { immediate: true }
        );

        const closeModal = () => emit("update:show", false);

        const formatDate = () => {
            let formattedDate = form.value.date.replace(/[^\d]/g, '');
            if (formattedDate.length > 4 && formattedDate.length <= 6) {
                formattedDate = formattedDate.slice(0, 4) + '.' + formattedDate.slice(4, 6);
            } else if (formattedDate.length > 6) {
                formattedDate = formattedDate.slice(0, 4) + '.' + formattedDate.slice(4, 6) + '.' + formattedDate.slice(6, 8);
            }
            form.value.date = formattedDate;
        };

        const saveRecord = () => {
            emit("save", { ...form.value }); // ✅ 부모로 저장된 데이터 전달
            closeModal();
        };

        return { form, closeModal, formatDate, saveRecord };
    }
});
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
}

.modal-container {
    background: white;
    width: 65%;
    max-width: 1200px;
    border-radius: 8px;
    padding: 1.8rem;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h2 {
    font-size: 2.3rem;
    color: #3F3F3F;
    font-weight: bold;
}

.modal-actions {
    display: flex;
    gap: 0.8rem;
    font-size: 2rem;
}

.btn-cancel, .btn-save {
    font-size: 1rem;
}

.btn-cancel {
    background: #ececec;
    color: #737373;
    font-weight: 700;
    padding: 1rem 3.2rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

.btn-save {
    background: #005871;
    color: #ececec;
    font-weight: 700;
    padding: 1rem 2rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

.divider {
    margin: 0.8rem 0;
    border: none;
    border-top: 1px solid #D0D0D0;
}

.section-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #3F3F3F;
    margin-bottom: 1rem;
}

.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1.5rem 1rem;
    width: 80%;
    margin-left: 20%;
    position: relative;
    top: -40px;
}

.form-group1, .form-group2, .form-group3, .form-group4, .form-group5 {
    display: flex;
    flex-direction: column;
    transform: translateX(-10%);
}

.form-group1 label, .form-group2 label, .form-group3 label, .form-group4 label, .form-group5 label {
    font-size: 0.95rem;
    color: #737373;
    margin-bottom: 0.3rem;
    font-weight: 700;
}

.form-group2, .form-group4 {
    width: 180%;
    transform: translateX(-25%);
}

input, select {
    width: 55%;
    max-width: 380px;
    padding: 1rem;
    border: 1px solid #595959;
    background: #f8f8f8;
    font-size: 0.95rem;
}

select {
    background-image: url("@/assets/images/Polygon 3.png");
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 12px;
    border-radius: 8px;
    width: 62%;
    cursor: pointer;
    appearance: none;
    border: 2px solid #737373;
}
</style>
