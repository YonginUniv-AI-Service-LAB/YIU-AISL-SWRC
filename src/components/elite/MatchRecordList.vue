<template>
  <div class="match-records">
    <table class="match-table">
      <thead>
        <tr>
          <th>날짜</th>
          <th>대회명</th>
          <th>상대</th>
          <th>승패</th>
          <th>경기 기록</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <template v-for="(group, index) in groupedRecordsArray" :key="index">
          <tr class="year-header">
            <td colspan="6">
              {{ group.year }}
            </td>
          </tr>
          <tr 
            v-for="(record, idx) in group.records" 
            :key="idx" 
            class="record-row"
            @mouseenter="hoveredRow = `${group.year}-${idx}`"
            @mouseleave="hoveredRow = null"
          >
            <td class="date-cell">
              {{ record.date }}
            </td>
            <td class="tournament-cell">
              {{ record.tournament }}
            </td>
            <td class="opponent-cell">
              {{ record.opponent }}
            </td>
            <td :class="['result-cell', getResultClass(record.result)]">
              {{ record.result }}
            </td>
            <td class="notes-cell">
              {{ record.notes || '-' }}
            </td>
            <td class="action-cell">
              <img 
                v-if="hoveredRow === `${group.year}-${idx}`" 
                src="@/assets/images/edit.png" 
                alt="수정" 
                class="icon-button"
                @click="editRecord(record)" 
              >
              <img 
                v-if="hoveredRow === `${group.year}-${idx}`" 
                src="@/assets/images/delete.png" 
                alt="삭제" 
                class="icon-button"
                @click="deleteRecord(record)" 
              >
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    
    <MatchRecordModal
      v-if="showModal"
      v-model:show="showModal"
      :record="selectedRecord"
      @save="addRecord" 
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import MatchRecordModal from './MatchRecordModal.vue';

const hoveredRow = ref(null);
const showModal = ref(false);
const selectedRecord = ref(null);
const matchRecords = ref([
    { id: 1, date: '2024.05.02', tournament: 'U리그', opponent: '경희대학교', result: '승', year: '2024', notes: '3-0 승리' },
    { id: 2, date: '2024.04.15', tournament: '전국 대학축구 선수권 대회', opponent: '단국대학교', result: '무', year: '2024', notes: '8강전, 승부차기 패배 (3-4)' },
]);

// ✅ ID 생성 (신규 데이터에 대해 ID 부여)
const generateId = () => {
    return matchRecords.value.length > 0 ? Math.max(...matchRecords.value.map(r => r.id)) + 1 : 1;
};

// ✅ 저장 (새 데이터 추가 또는 기존 데이터 수정)
const addRecord = (newRecord) => {
    const year = newRecord.date.split(".")[0]; // 연도 추출

    if (newRecord.id) {
        // ✅ 기존 데이터 수정 (ID가 같은 데이터 찾아 교체)
        const index = matchRecords.value.findIndex(record => record.id === newRecord.id);
        if (index !== -1) {
            matchRecords.value[index] = { ...newRecord, year };
        }
    } else {
        // ✅ 새로운 데이터 추가
        matchRecords.value.push({ ...newRecord, id: generateId(), year });
    }

    matchRecords.value = sortByDateDesc(matchRecords.value); // ✅ 정렬 후 반영
};

// ✅ 날짜 내림차순 정렬
const sortByDateDesc = (records) => {
    return records.slice().sort((a, b) => {
        const dateA = new Date(a.date.replace(/\./g, '-'));
        const dateB = new Date(b.date.replace(/\./g, '-'));
        return dateB - dateA;
    });
};

const groupedRecordsArray = computed(() => {
    const sortedRecords = sortByDateDesc(matchRecords.value);
    const grouped = sortedRecords.reduce((acc, record) => {
        if (!acc[record.year]) acc[record.year] = [];
        acc[record.year].push(record);
        return acc;
    }, {});

    return Object.entries(grouped)
        .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
        .map(([year, records]) => ({ year, records }));
});

const editRecord = (record) => {
  selectedRecord.value = { ...record };
  showModal.value = true;
};

const deleteRecord = (recordToDelete) => {
    if (confirm('경기 기록을 삭제하시겠습니까?')) {
        matchRecords.value = matchRecords.value.filter(
        record => record.id !== recordToDelete.id
        );
    }
};

// ✅ 승무패 스타일 지정
const getResultClass = (result) => {
    return {
        'win': result === '승',
        'lose': result === '패',
        'draw': result === '무'
    };
};
</script>



<style scoped>
.match-table {
    width: 100%;
    overflow-x: hidden;
    white-space: nowrap;
    border-collapse: collapse;
    background: #FFFFFF;
}

.match-table th, .match-table td {
    padding: 0.8rem 1.4rem;
    text-align: left;
}

.match-table th {
    background: #3F3F3F;
    color: #ECECEC;
    font-weight: 700;
}

.year-header {
    background: #F4F4F4;
    color: #3F3F3F;
    font-weight: 700;
}

.match-table tr {
    border-bottom: 2px solid #ECECEC; /* 목록 사이 구분선 */
}

/* 마지막 행에는 구분선 제거 */
.match-table tr:last-child {
    border-bottom: none;
}


.match-table td.date-cell {
    color: #737373;
    font-weight: 500;
}

.match-table td.tournament-cell {
    color: #262626;
    font-weight: 700;
}

.match-table td.opponent-cell {
    color: #737373;
    font-weight: 500;
}

.match-table td.win {
    color: #458FFF;
    font-weight: bold;
}

.match-table td.lose {
    color: #FF4545;
    font-weight: bold;
}

.match-table td.draw {
    color: #737373;
    font-weight: bold;
}

.match-table td.notes-cell {
    color: #737373;
    font-weight: 500;
}

.match-table td.action-cell {
    width: 75px;
    padding: 0.5rem;
    text-align: right;
    vertical-align: middle;
}

.icon-button {
    width: 20px;
    height: 20px;
    margin-left: 8px;
    margin-right: 8px;
    cursor: pointer;
}

</style>
