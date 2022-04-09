let generatedData: {
  labels: string[];
  datasets: { label: string; backgroundColor: string[]; data: number[] }[];
};

export const getDonutChartData = (themes: ColorThemes, data: { label: string[], values: number[]}) => {
  if (generatedData) {
    generatedData.datasets[0].backgroundColor = [themes.danger, themes.info, themes.primary, themes.success, themes.warning];
  } else {
    generatedData = {
      labels: data.label,
      datasets: [{
        label: "Total Number of Person per Age Group",
        backgroundColor: [themes.danger, themes.info, themes.primary, themes.success, themes.warning],
        data: data.values,
      }],
    };
  }

  return generatedData;
};
