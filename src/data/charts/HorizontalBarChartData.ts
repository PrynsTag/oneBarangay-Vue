export const getHorizontalBarChartData = (themes: ColorThemes, data: {label: string[], values: number[]}) => ({
  labels: data.label,
  datasets: [
    {
      label: "Social Class",
      backgroundColor: themes.primary,
      borderColor: "transparent",
      data: data.values,
    },
  ],
})
