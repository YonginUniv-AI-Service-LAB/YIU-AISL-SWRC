<template>
    <div class="chart-container">
        <!-- 지구력 -->
        <div class="chart-box">
            <h2>지구력 변화</h2>
            <Line :data="staminaData" :options="commonOptions" />
        </div>

        <!-- 근력 -->
        <div class="chart-box">
            <h2>근력 변화</h2>
            <Line :data="muscleData" :options="commonOptions" />
        </div>

        <!-- 점프력 -->
        <div class="chart-box">
            <h2>점프력 변화</h2>
            <Line :data="jumpData" :options="commonOptions" />
        </div>

        <!-- 순발력 -->
        <div class="chart-box">
            <h2>순발력 변화</h2>
            <Line :data="quicknessData" :options="commonOptions" />
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Line } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Filler
} from 'chart.js'

import ChartDataLabels from 'chartjs-plugin-datalabels'

// Chart.js 플러그인 등록
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    ChartDataLabels,
    Filler
)

export default defineComponent({
    name: 'PerformanceCharts',
    components: { Line },
    setup() {
        // 그라데이션 생성 함수
        const gradientBackground = (context) => {
            const chart = context.chart
            const { ctx, chartArea } = chart
            if (!chartArea) return null
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
            gradient.addColorStop(0, 'rgba(114,189,214,0.5)') // 상단 (7.4% 정도면 0.074로 조정)
            gradient.addColorStop(1, 'rgba(114,189,214,0)')   // 하단 투명
            return gradient
        }

        /**
         * chart.js 옵션
         * - datalabels 설정으로 마지막 데이터 포인트에만 라벨 표시
         */
        const commonOptions = {
            responsive: true,
            maintainAspectRatio: false,
            hover: {
                mode: 'nearest',
                intersect: true
            },
            layout: {
                padding: {
                    top: 20,
                    bottom: 35 // x축 레이블이 안 잘리도록 아래쪽 여백
                }
            },
            plugins: {
                tooltip: {
                    enabled: false
                },
                legend: { display: false },
                title: { display: false },
                datalabels: {
                    // 표시 여부: 마지막 데이터 포인트이거나, 호버(active) 상태일 때만 표시
                    display: (context) => {
                        const dataset = context.dataset
                        const index = context.dataIndex
                        const lastIndex = dataset.data.length - 1
                        return index === lastIndex || context.active
                    },
                    color: '#005871',
                    align: 'end',
                    anchor: 'end',
                    backgroundColor: '#FFFFFF',
                    borderColor: '#D9D9D9',
                    borderWidth: 1,
                    borderRadius: 4,
                    padding: {
                        top: 6,
                        right: 8,
                        bottom: 6,
                        left: 8
                    },
                    offset: 6,
                    font: {
                        size: 12
                    },
                    // 라벨 텍스트: 각 데이터셋 라벨에 따라 단위 부여
                    formatter: (value, context) => {
                        const dataset = context.dataset
                        switch (dataset.label) {
                        case '지구력':
                            return value + '분'
                        case '근력':
                            return value + 'kg'
                        case '점프력':
                            return value + 'cm'
                        case '순발력':
                            return value + 's'
                        default:
                            return value
                        }
                    }
                }
            },
            scales: {
                x: {
                    offset: true, //  x축 왼쪽, 오른쪽에 여백을 둠
                    grid: {
                        display: false,
                    },
                    
                },

                y: {
                    suggestedMin: 0,
                    suggestedMax: 90,
                    ticks: {
                        maxTicksLimit: 6, // y축 최대 표시 갯수
                    },
                    border: {
                        display: false
                    },
                }
            }
        }

        // 1) 지구력 데이터
        const staminaData = {
            labels: ['2024.07', '2024.08', '2024.09', '2024.10', '2024.11', '2024.12'],
            datasets: [
                {
                    label: '지구력',
                    data: [60, 65, 70, 80, 85, 90],
                    // 선 스타일
                    borderColor: '#005871',
                    borderWidth: 1,
                    tension: 0.3, 
                    // 영역 채우기
                    fill: true,
                    backgroundColor: gradientBackground,
                    // 포인트(동그라미)
                    pointRadius: 3,
                    pointBackgroundColor: '#ffffff', // 동그라미 내부 흰색
                    pointBorderColor: '#005871',     // 동그라미 테두리
                    pointBorderWidth: 2,
                    pointHitRadius: 10,
                }
            ]
        }

        // 2) 근력 데이터
        const muscleData = {
            labels: ['2024.07', '2024.08', '2024.09', '2024.10', '2024.11', '2024.12'],
            datasets: [
                {
                    label: '근력',
                    data: [35, 40, 45, 48, 50, 50],
                    // 선 스타일
                    borderColor: '#005871',
                    borderWidth: 1,
                    tension: 0.3,
                    // 영역 채우기
                    fill: true,
                    backgroundColor: gradientBackground,
                    // 포인트(동그라미)
                    pointRadius: 3,
                    pointBackgroundColor: '#ffffff', // 동그라미 내부 흰색
                    pointBorderColor: '#005871',     // 동그라미 테두리
                    pointBorderWidth: 2,
                    pointHitRadius: 10,
                }
            ]
        }

        // 3) 점프력 데이터
        const jumpData = {
            labels: ['2024.07', '2024.08', '2024.09', '2024.10', '2024.11', '2024.12'],
            datasets: [
                {
                    label: '점프력',
                    data: [30, 35, 38, 40, 43, 45],
                    // 선 스타일
                    borderColor: '#005871',
                    borderWidth: 1,
                    tension: 0.3,
                    // 영역 채우기
                    fill: true,
                    backgroundColor: gradientBackground,
                    // 포인트(동그라미)
                    pointRadius: 3,
                    pointBackgroundColor: '#ffffff', // 동그라미 내부 흰색
                    pointBorderColor: '#005871',     // 동그라미 테두리
                    pointBorderWidth: 2,
                    pointHitRadius: 10,
                }
            ]
        }

        // 4) 순발력 데이터
        const quicknessData = {
            labels: ['2024.07', '2024.08', '2024.09', '2024.10', '2024.11', '2024.12'],
            datasets: [
                {
                    label: '순발력',
                    data: [80, 78, 76, 75, 74, 75],
                    // 선 스타일
                    borderColor: '#005871',
                    borderWidth: 1,
                    tension: 0.3,
                    // 영역 채우기
                    fill: true,
                    backgroundColor: gradientBackground,
                    // 포인트(동그라미)
                    pointRadius: 3,
                    pointBackgroundColor: '#ffffff', // 동그라미 내부 흰색
                    pointBorderColor: '#005871',     // 동그라미 테두리
                    pointBorderWidth: 2,
                    pointHitRadius: 10,
                }
            ]
        }

        return {
            commonOptions,
            staminaData,
            muscleData,
            jumpData,
            quicknessData
        }
    }
})
</script>

<style scoped>
.chart-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px; 
    width: 100%;
    max-width: 1100px;
    height: 100%;
    margin: 0 auto;
}
.chart-box {
    position: relative;
    padding: 16px;
    border-radius: 4px;
    background-color: #FFFFFF;
    height: 315px;
    display: flex; /* 세로 정렬 */
    flex-direction: column;
    justify-content: flex-start;
}
.chart-box h2 {
    font-size: 16px;
    margin-top: 0px;
    margin-bottom: 15px;
    text-align: left;
}
.chart-box canvas {
    width: 100%;
    height: auto;
    flex: 1;
    z-index: 1;
}
</style>