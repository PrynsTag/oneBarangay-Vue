export const getVerticalBarChartData = (themes: ColorThemes, data: { label: string[], values: number[] }, chartLabel: string) => ({
  labels: data.label,
  datasets: [{
    label: chartLabel,
    backgroundColor: themes.primary,
    data: data.values,
  }],
});
