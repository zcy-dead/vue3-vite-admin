<script setup lang="ts">
import type { ECharts } from "echarts"
import * as echarts from "echarts"
import { onBeforeUnmount, onMounted, ref, watch } from "vue"

// #region  Card数据
function generateCardData() {
  const now = new Date()
  const currentMonth = now.getMonth() + 1

  // 用户总数 = 基础值(10000-14999) + 随机波动
  const baseUserCount = 10000 + Math.floor(Math.random() * 5000)
  // 今日访问 = 基础值(5000-13000) + 昼夜波动（正弦函数模拟）
  const todayVisits = Math.floor(
    5000 + Math.random() * 8000 + Math.sin((now.getHours() / 24) * Math.PI) * 2000
  )
  // 月度销售额 = 基础值(150万-250万) + 月份系数（1-12月递增）
  const monthlySales = Math.floor(1500000 + Math.random() * 1000000 + (currentMonth / 12) * 500000)
  // 待处理订单 = 固定范围(150-349)
  const pendingOrders = Math.floor(150 + Math.random() * 200)

  return [
    {
      title: "用户总数",
      value: baseUserCount,
      percentage: Number.parseFloat((3.2 + Math.random() * 4).toFixed(2)),
      elicon: "User",
      bgColor: "#7c86ff",
      precision: 0,
      description: `${currentMonth}月新增 ${Math.floor(100 + Math.random() * 200)} 人`
    },
    {
      title: "今日访问",
      value: todayVisits,
      percentage: Number.parseFloat((-2 + Math.random() * 20).toFixed(2)),
      elicon: "View",
      bgColor: "#51a2ff",
      precision: 0,
      description: "较昨日变化"
    },
    {
      title: `${currentMonth}月销售额`,
      value: monthlySales,
      percentage: Number.parseFloat((5 + Math.random() * 10).toFixed(2)),
      elicon: "DataLine",
      bgColor: "#00d492",
      precision: 2,
      description: "本月累计收入"
    },
    {
      title: "待处理订单",
      value: pendingOrders,
      percentage: Number.parseFloat((-8 + Math.random() * 6).toFixed(2)),
      elicon: "ShoppingCartFull",
      bgColor: "#ff8904",
      precision: 0,
      description: "需要及时处理"
    }
  ]
}

const cardData = generateCardData()
// #endregion

// #region  Echarts数据
const chartRef = ref<HTMLElement>()
let chartInstance: ECharts | null = null

const xData = ref([
  { date: "07月15日", visits: 510, orders: 2140 },
  { date: "07月16日", visits: 917, orders: 3693 },
  { date: "07月17日", visits: 2455, orders: 2962 },
  { date: "07月18日", visits: 2610, orders: 3810 },
  { date: "07月19日", visits: 2719, orders: 3519 },
  { date: "07月20日", visits: 3033, orders: 3484 },
  { date: "07月21日", visits: 3044, orders: 3915 },
  { date: "07月22日", visits: 3085, orders: 3823 },
  { date: "07月23日", visits: 2708, orders: 3455 },
  { date: "07月24日", visits: 2809, orders: 4310 },
  { date: "07月25日", visits: 2117, orders: 4019 },
  { date: "07月26日", visits: 2000, orders: 3433 },
  { date: "07月27日", visits: 1455, orders: 3544 },
  { date: "07月28日", visits: 1210, orders: 3885 },
  { date: "07月29日", visits: 719, orders: 4208 },
  { date: "07月30日", visits: 733, orders: 3372 },
  { date: "07月31日", visits: 944, orders: 3484 },
  { date: "08月01日", visits: 2285, orders: 3915 },
  { date: "08月02日", visits: 2208, orders: 3748 },
  { date: "08月03日", visits: 3372, orders: 3675 },
  { date: "08月04日", visits: 3936, orders: 4009 },
  { date: "08月05日", visits: 3693, orders: 4433 },
  { date: "08月06日", visits: 2962, orders: 3544 },
  { date: "08月07日", visits: 2810, orders: 3285 },
  { date: "08月08日", visits: 3519, orders: 4208 },
  { date: "08月09日", visits: 2455, orders: 3372 },
  { date: "08月10日", visits: 2610, orders: 3484 },
  { date: "08月11日", visits: 2719, orders: 3915 },
  { date: "08月12日", visits: 2484, orders: 3823 },
  { date: "08月13日", visits: 2078, orders: 4265 },
  { date: "08月14日", visits: 4298, orders: 4298 }
])

function renderChart() {
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        textStyle: {
          color: "#fff"
        }

      }
    },
    grid: {
      borderWidth: 0,
      top: "15%",
      bottom: "25%",
      left: "5%",
      right: "5%",
      textStyle: {
        color: "#fff"
      }
    },
    legend: {
      x: "46%",
      top: "11%",
      textStyle: {
        color: "#90979c"
      },
      data: ["访问量", "订单量"]
    },

    calculable: true,
    xAxis: [{
      type: "category",
      axisLine: {
        lineStyle: {
          color: "rgba(204,187,225,0.5)"
        }
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      data: xData.value.map(item => item.date)
    }],

    yAxis: [{
      type: "value",
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: "rgba(204,187,225,0.5)"
        }
      }

    }],
    dataZoom: [{
      show: true,
      height: 30,
      xAxisIndex: [0],
      bottom: 30,

      start: 10,
      end: 80,
      handleIcon: "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
      handleSize: "110%",
      handleStyle: {
        color: "#5B3AAE"
      },
      textStyle: {
        color: "rgba(204,187,225,0.5)"
      },
      fillerColor: "rgba(67,55,160,0.4)",
      borderColor: "rgba(204,187,225,0.5)"

    }, {
      type: "inside",
      show: true,
      height: 15,
      start: 1,
      end: 35
    }],
    series: [{
      name: "访问量",
      type: "line",
      symbolSize: 10,
      symbol: "circle",
      itemStyle: {
        color: "#6f7de3"
      },
      markPoint: {
        label: {
          color: "#fff"
        },
        data: [{
          type: "max",
          name: "最大值"

        }, {
          type: "min",
          name: "最小值"
        }]
      },
      data: xData.value.map(item => item.visits)
    }, {
      name: "订单量",
      type: "line",
      symbolSize: 10,
      symbol: "circle",
      itemStyle: {
        color: "#c257F6"
      },
      markPoint: {
        label: {
          color: "#fff"
        },
        data: [{
          type: "max",
          name: "最大值"

        }, {
          type: "min",
          name: "最小值"
        }]
      },
      data: xData.value.map(item => item.orders)
    }]
  }
  chartInstance?.setOption(option)
}

function handleResize() {
  chartInstance?.resize()
}

onMounted(() => {
  chartInstance = echarts.init(chartRef.value)
  renderChart()
  window.addEventListener("resize", handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize)
  chartInstance?.dispose()
  chartInstance = null
})

watch(() => xData, () => {
  renderChart()
})
// #endregion
</script>

<template>
  <div class="app-container">
    <div class="card-container">
      <div v-for="(card, index) in cardData" :key="index" class="card">
        <div class="card-content">
          <div class="content-left">
            <div class="title">
              {{ card.title }}
            </div>
            <div class="value">
              {{ card.value.toFixed(card.precision) }}
            </div>
            <div class="detail">
              <div class="description">
                {{ card.description }}:
              </div>
              <div class="percentage" :class="card.percentage > 0 ? 'positive' : 'negative'">
                {{ card.percentage }}%
              </div>
            </div>
          </div>
          <div class="content-right">
            <div class="icon-bg" :style="{ backgroundColor: card.bgColor }">
              <el-icon>
                <component :is="card.elicon" />
              </el-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div ref="chartRef" class="chart-container" />
  </div>
</template>

<style scoped lang="scss">
.app-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: hidden;
  gap: 30px;
  margin-bottom: 20px;
  .card {
    padding: 30px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--bg-color-primary);

    @media (min-width: 1200px) {
      flex: 1 1 calc(25% - 30px);
    }

    @media (min-width: 768px) and (max-width: 1199px) {
      flex: 1 1 calc(50% - 30px);
    }

    @media (max-width: 767px) {
      flex: 1 1 100%;
    }

    .card-content {
      width: 100%;
      height: 100%;
      display: flex;

      .content-left {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .title {
          font-size: 20px;
          font-weight: bold;
          color: var(--text-color-primary);
        }
        .value {
          font-size: 20px;
          font-weight: bold;
          margin-top: 8px;
          color: var(--active-text-color, var(--text-color-primary));
        }
        .detail {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 8px;
          .description {
            font-size: 16px;
            color: #999;
          }
          .percentage {
            padding: 2px 8px;
            font-size: 18px;
            color: #666;
          }
          .positive {
            color: #339933;
          }
          .negative {
            color: #ff6666;
          }
        }
      }
      .content-right {
        display: flex;
        align-items: center;
        justify-content: center;
        .icon-bg {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 50%;
          .el-icon {
            font-size: 32px;
            color: var(--text-color-primary);
          }
        }
      }
    }
  }
}

.chart-container {
  width: 100%;
  height: 400px;
  background-color: var(--bg-color-primary);
}
</style>
