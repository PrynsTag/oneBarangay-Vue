<template>
  <va-card-title>
    <h1>Number of User Login by "Past Week"</h1>
    <div class="mr-0 text-right">
      <va-button
        icon="print"
        flat
        class="mr-0"
        @click="printChart"
      />
    </div>
  </va-card-title>

  <va-card-content v-if="verticalBarChartData.datasets[0].data">
    <va-chart class="chart--monthly-login" :data="verticalBarChartData" type="vertical-bar"/>
  </va-card-content>

  <va-card-content class="d-flex justify--center" v-else>
    <div class="lg6 xs12 py-4">
      <va-progress-circle indeterminate/>
    </div>
  </va-card-content>
</template>

<script>
import { useGlobalConfig } from "vuestic-ui";
import { VaCardTitle, VaButton, VaCardContent, VaProgressCircle } from "vuestic-ui"
import VaChart from "@/components/va-charts/VaChart.vue";
import { mapActions, mapGetters } from "vuex";
import { getVerticalBarChartData } from "@/data/charts/VerticalBarChartData";

export default {
  name: "UserLoginTab",
  components: {
    VaCardTitle,
    VaButton,
    VaCardContent,
    VaProgressCircle,
    VaChart
  },
  mounted() {
    this.getUserLoginData();

    this.verticalBarChartData = getVerticalBarChartData(this.theme, {}, "User Login");
  },
  data() {
    return {
      verticalBarChartData: {
        labels: [],
        datasets: [{
          label: "",
          data: [],
        }],
      },
    }
  },
  computed: {
    theme() {
      return useGlobalConfig()
        .getGlobalConfig().colors;
    },
    userLoginChartDataURL() {
      return document.querySelector(".chart--monthly-login canvas").toDataURL("image/png");
    },
    ...mapGetters("dashboard", {
      loginLabels: "getUserLoginLabel",
      loginValues: "getUserLoginValues",
    }),
  },
  watch: {
    loginLabels: {
      handler(newValue) {
        this.verticalBarChartData.labels = newValue;
      },
      immediate: true,
    },
    loginValues: {
      handler(newValue) {
        this.verticalBarChartData.datasets[0].data = newValue;
      },
      immediate: true,
    },
  },
  methods: {
    printChart() {
      const win = window.open("", "Print", "height=600,width=800");
      win.document.write(`<br><img src='${this.userLoginChartDataURL}' alt="User Login Chart"/>`);
      // TODO: find better solution how to remove timeout
      setTimeout(() => {
        win.document.close();
        win.focus();
        win.print();
        win.close();
      }, 200);
    },
    ...mapActions("dashboard", ["getUserLoginData"]),
  },
}
</script>

<style scoped>

</style>
