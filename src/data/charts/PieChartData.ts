export const getPieChartData = (themes: ColorThemes, data: {label: string[], values: number[]}) => ({
  labels: data.label,
  datasets: [{
    label: "Number of People per Citizenship",
    backgroundColor: [themes.primary, themes.warning, themes.danger, themes.success, themes.info, themes.secondary],
    data: data.values,
  }],
})
