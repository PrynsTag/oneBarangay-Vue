export const defaultConfig = {
  legend: {
    position: "bottom",
    labels: {
      fontColor: "#34495e",
      fontFamily: "sans-serif",
      fontSize: 14,
      padding: 20,
      usePointStyle: true,
    },
  },
  tooltips: {
    bodyFontSize: 14,
    bodyFontFamily: "sans-serif",
  },
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
};

export const chartTypesMap = {
  pie: "pie-chart",
  donut: "donut-chart",
  line: "line-chart",
  "vertical-bar": "vertical-bar-chart",
  "horizontal-bar": "horizontal-bar-chart",
};
