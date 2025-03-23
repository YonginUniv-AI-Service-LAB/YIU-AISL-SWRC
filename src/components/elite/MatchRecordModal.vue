<template>
    <teleport to="body">
        <div
            v-if="show"
            class="modal-overlay"
        >
            <div class="modal-container">
                <!-- 상단 제목 + 버튼 -->
                <div class="modal-header">
                    <h2>경기 기록 추가</h2>
                    <div class="modal-actions">
                        <button class="btn-cancel" @click="closeModal">닫기</button>
                        <button class="btn-save">저장 및 추가</button>
                    </div>
                </div>

                <hr class="divider" />

                <!-- 세부 입력 폼 -->
                <div class="modal-body">
                    <h3 class="section-title">세부기록</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>날짜</label>
                            <input type="text" placeholder="날짜를 입력해주세요." />
                        </div>
                        <div class="form-group">
                            <label>대회이름</label>
                            <input type="text" placeholder="대회이름을 입력해주세요." />
                        </div>
                        <div class="form-group">
                            <label>상대</label>
                            <input type="text" placeholder="상대를 입력해주세요." />
                        </div>
                        <div class="form-group">
                            <label>추가사항</label>
                            <input type="text" placeholder="추가사항을 입력해주세요." />
                        </div>
                        <div class="form-group">
                            <label>승패</label>
                            <select>
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
import { defineComponent } from "vue";

export default defineComponent({
    name: "MatchRecordModal",
    props: {
        show: Boolean,
    },
    emits: ["update:show"],
    setup(props, { emit }) {
        const closeModal = () => {
        emit("update:show", false);
        };

        return {
        closeModal,
        };
    },
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
    width: 60%;
    max-width: 900px;
    border-radius: 8px;
    padding: 2rem;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h2 {
    font-size: 1.8rem;
    color: #3F3F3F;
    font-weight: bold;
}

.modal-actions {
    display: flex;
    gap: 0.8rem;
}

.btn-cancel {
    background: #ececec;
    color: #737373;
    font-weight: 700;
    padding: 1rem 2rem;
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
    gap: 1.2rem 2rem;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group label {
    font-size: 0.95rem;
    color: #737373;
    margin-bottom: 0.3rem;
    font-weight: 700;
}

input,
select {
    padding: 0.8rem;
    border: 1px solid #595959;
    border-radius: 1px;
    background: #f8f8f8;
    font-size: 0.95rem;
    }
</style>
