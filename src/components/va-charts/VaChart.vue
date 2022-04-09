<template>
  <component
    ref="chart"
    class='va-chart'
    :is="chartComponent"
    :chartOptions="options"
    :chart-data="data"
  />
</template>

<script>
import DonutChart from "./chart-types/DonutChart";
import LineChart from "./chart-types/LineChart";
import PieChart from "./chart-types/PieChart";
import VerticalBarChart from "./chart-types/VerticalBarChart";
import HorizontalBarChart from "./chart-types/HorizontalBarChart";
import { chartTypesMap } from "./VaChartConfigs";

export default {
  name: "va-chart",
  props: {
    data: {},
    options: {},
    type: {
      validator(type) {
        return type in chartTypesMap;
      },
    },
  },
  components: {
    LineChart,
    DonutChart,
    PieChart,
    VerticalBarChart,
    HorizontalBarChart,
  },
  computed: {
    chartComponent() {
      return chartTypesMap[this.type];
    },
  },
  methods: {
    refresh() {
      this.$refs.chart.refresh();
    },
  },
};
</script>

<style lang='scss'>
.va-chart {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  > * {
    height: 100%;
    width: 100%;
  }

  canvas {
    width: 100%;
    height: auto;
    min-height: 420px;
  }
}
</style>
