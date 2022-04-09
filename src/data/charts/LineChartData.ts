import { useColors } from "vuestic-ui";

function colorToRgba(color: string, a: any) {
  const { shiftHSLAColor } = useColors();

  // TODO: replace with set hsla color
  // https://github.com/epicmaxco/vuestic-ui/issues/841
  const transparentColor = shiftHSLAColor(color, { a: -1 });
  return shiftHSLAColor(transparentColor, { a });
}

const generateValue = () => Math.floor(Math.random() * 100);

const generateYLabels = () => {
  const flip = !!Math.floor(Math.random() * 2);
  return flip ? ["User SignIn", "User SignUp"] : ["User SignUp", "User SignIn"];
};

const generateArray = (length: number) => Array.from(Array(length), generateValue);

const getSize = () => {
  const minSize = 4;
  return Math.max(minSize, new Date().getMonth());
};

let generatedData: any;
let firstMonthIndex = 0;

export const getLineChartData = (themes: ColorThemes, data: {label_0: string[], values_0: number[], label_1: string[], values_1: number[]}, firstMonth: any) => {
  const size = getSize();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const yLabels = generateYLabels();

  if (generatedData) {
    generatedData.datasets[0].backgroundColor = colorToRgba(themes.primary, 0.6);
    generatedData.datasets[1].backgroundColor = colorToRgba(themes.info, 0.6);
    if (firstMonth && firstMonthIndex !== firstMonth) {
      generatedData.labels.shift();
      generatedData.datasets.forEach((dataset: any) => {
        dataset.data.shift();
      });
      firstMonthIndex = firstMonth;
    }
  } else {
    generatedData = {
      labels: data.label_0,
      datasets: [
        {
          label: yLabels[0],
          backgroundColor: colorToRgba(themes.primary, 0.6),
          borderColor: "transparent",
          data: data.values_0,
        },
        {
          label: yLabels[1],
          backgroundColor: colorToRgba(themes.info, 0.6),
          borderColor: "transparent",
          data: data.values_1,
        },
      ],
    };
  }

  return generatedData;
};
