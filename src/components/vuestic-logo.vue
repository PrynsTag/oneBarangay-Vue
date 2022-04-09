<template>
  <img :src="oneBarangayLogo" width="350" height="70" />
</template>
<script>
import { useColors } from "vuestic-ui";
import oneBarangayLogo from "../../src/assets/images/logo/apple-icon.png";

export default {
  name: "VaIconVuestic",
  data() {
    return { oneBarangayLogo };
  },
  props: {
    height: { type: [Number, String], default: 16 },
    color: { type: [String], default: "primary" },
  },
  computed: {
    colorsComputed() {
      const { getColor, shiftHSLAColor } = useColors();
      const color = getColor(this.color, "primary");

      return { start: color, end: shiftHSLAColor(color, { l: -20 }) };
    },
  },
};
</script>
