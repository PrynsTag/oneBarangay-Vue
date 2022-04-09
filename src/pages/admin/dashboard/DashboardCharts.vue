<template>
  <div class="row row-equal">
    <div class="flex xs12 xl6">
      <va-card v-if="lineChartData">
        <va-card-title>
          <h1>User Signin Vs. User Signup</h1>
          <div class="mr-0 text-right">
            <va-button
              size="small"
              color="danger"
              @click="deleteSection"
            >
              {{ $t('dashboard.charts.showInMoreDetail') }}
            </va-button>
          </div>
        </va-card-title>

        <va-card-content v-if="lineChartData.datasets[0].data && lineChartData.datasets[1].data">
          <va-chart class="chart" ref="lineChart" :data="lineChartData" type="line"/>
        </va-card-content>

        <va-card-content class="d-flex justify--center" v-else>
          <div class="lg6 xs12 py-4">
            <va-progress-circle indeterminate/>
          </div>
        </va-card-content>
      </va-card>
    </div>

    <div class="flex xs12 md6 xl3">
      <va-card class="d-flex">
        <va-card-title>
          <h1>Number of Person per Age Group</h1>
          <div class="mr-0 text-right">
            <va-button
              icon="print"
              flat
              class="mr-0"
              @click="printChart"
            />
          </div>
        </va-card-title>

        <va-card-content v-if="donutChartData.datasets[0].data">
          <va-chart class="chart chart--donut" :data="donutChartData" type="donut"/>
        </va-card-content>

        <va-card-content class="d-flex justify--center" v-else>
          <div class="lg6 xs12 py-4">
            <va-progress-circle indeterminate/>
          </div>
        </va-card-content>
      </va-card>
    </div>

    <div class="flex xs12 md6 xl3">
      <va-card class="d-flex">
        <va-card-title>
          <h1>Number of Person per Citizenship</h1>
          <div class="mr-0 text-right">
            <va-button
              icon="print"
              flat
              class="mr-0"
              @click="printChart"
            />
          </div>
        </va-card-title>

        <va-card-content v-if="pieChartData.datasets[0].data">
          <va-chart :data="pieChartData" type="pie"/>
        </va-card-content>

        <va-card-content class="d-flex justify--center" v-else>
          <div class="lg6 xs12 py-4">
            <va-progress-circle indeterminate/>
          </div>
        </va-card-content>
      </va-card>
    </div>
  </div>

  <div class="row row-equal">
    <div class="flex md6 xs12">
      <va-card>
        <va-card-title>
          <h1>Number of Person per Civil Status</h1>
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
          <va-chart :data="verticalBarChartData" type="vertical-bar"/>
        </va-card-content>

        <va-card-content class="d-flex justify--center" v-else>
          <div class="lg6 xs12 py-4">
            <va-progress-circle indeterminate/>
          </div>
        </va-card-content>
      </va-card>
    </div>

    <div class="flex md6 xs12">
      <va-card>
        <va-card-title>
          <h1>Number of Person per Social Class</h1>
          <div class="mr-0 text-right">
            <va-button
              icon="print"
              flat
              class="mr-0"
              @click="printChart"
            />
          </div>
        </va-card-title>

        <va-card-content v-if="horizontalBarChartData.datasets[0].data">
          <va-chart :data="horizontalBarChartData" type="horizontal-bar"/>
        </va-card-content>

        <va-card-content class="d-flex justify--center" v-else>
          <div class="lg6 xs12 py-4">
            <va-progress-circle indeterminate/>
          </div>
        </va-card-content>
      </va-card>
    </div>
  </div>
</template>

<script>
import { useGlobalConfig } from "vuestic-ui";
import { getDonutChartData } from "@/data/charts/DonutChartData";
import { getLineChartData } from "@/data/charts/LineChartData";
import { getPieChartData } from "@/data/charts/PieChartData";
import { getVerticalBarChartData } from "@/data/charts/VerticalBarChartData";
import { getHorizontalBarChartData } from "@/data/charts/HorizontalBarChartData";
import VaChart from "@/components/va-charts/VaChart.vue";
import { VaCard, VaCardTitle, VaCardContent, VaButton, VaProgressCircle } from "vuestic-ui";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "dashboard-charts",
  components: { VaChart, VaCard, VaCardTitle, VaCardContent, VaButton, VaProgressCircle },
  data() {
    return {
      lineChartData: {
        labels: [""],
        datasets: [
          {
            label: "",
            data: [],
          },
          {
            label: "",
            data: [],
          },
        ]
      },
      donutChartData: {
        labels: [],
        datasets: [{
          label: "",
          data: [],
        }],
      },
      pieChartData: {
        labels: [],
        datasets: [{
          label: "",
          data: [],
        }],
      },
      verticalBarChartData: {
        labels: [],
        datasets: [{
          label: "",
          data: [],
        }],
      },
      horizontalBarChartData: {
        labels: [],
        datasets: [{
          label: "",
          data: [],
        }],
      },
      lineChartFirstMonthIndex: 0,
    };
  },
  mounted() {
    this.getAgeGroupData();
    this.getCitizenshipData();
    this.getSocialClassData();
    this.getCivilStatusData();
    this.getUserLoginMonthlyData()
    this.getUserSignUpMonthlyData()

    this.lineChartData = getLineChartData(this.theme, {});
    this.pieChartData = getPieChartData(this.theme, {});
    this.donutChartData = getDonutChartData(this.theme, {});
    this.verticalBarChartData = getVerticalBarChartData(this.theme, {}, "Civil Status");
    this.horizontalBarChartData = getHorizontalBarChartData(this.theme, {})
  },
  watch: {
    "$themes.primary": function () {
      this.lineChartData = getLineChartData(this.theme, {});
    },

    "$themes.info": function () {
      this.lineChartData = getLineChartData(this.theme, {});
    },

    "$themes.danger": function () {
      this.lineChartData = getLineChartData(this.theme, {});
    },

    ageGroupLabel: {
      handler(newValue) {this.donutChartData.labels = newValue;},
      immediate: true,
    },
    ageGroupValues: {
      handler(newValue) {this.donutChartData.datasets[0].data = newValue;},
      immediate: true,
    },

    citizenshipLabel: {
      handler(newValue) {this.pieChartData.labels = newValue;},
      immediate: true,
    },
    citizenshipValues: {
      handler(newValue) {this.pieChartData.datasets[0].data = newValue;},
      immediate: true,
    },

    civilStatusLabel: {
      handler(newValue) {this.verticalBarChartData.labels = newValue;},
      immediate: true,
    },
    civilStatusValues: {
      handler(newValue) {this.verticalBarChartData.datasets[0].data = newValue;},
      immediate: true,
    },

    socialClassLabel: {
      handler(newValue) {this.horizontalBarChartData.labels = newValue;},
      immediate: true,
    },
    socialClassValues: {
      handler(newValue) {this.horizontalBarChartData.datasets[0].data = newValue;},
      immediate: true,
    },

    loginLabels: {
      handler(newValue) {this.lineChartData.labels = newValue;},
      immediate: true,
    },
    loginValues: {
      handler(newValue) {this.lineChartData.datasets[0].data = newValue;},
      immediate: true,
    },

    signUpLabels: {
      handler(newValue) {this.lineChartData.labels = newValue;},
      immediate: true,
    },
    signUpValues: {
      handler(newValue) {this.lineChartData.datasets[1].data = newValue;},
      immediate: true,
    },
  },
  methods: {
    deleteSection() {
      this.lineChartFirstMonthIndex += 1;
      this.lineChartData = getLineChartData(this.theme, {
        label_0: this.loginLabels,
        data_0: this.loginValues,
        label_1: this.signupLabels,
        data_1: this.signupValues,
      }, this.lineChartFirstMonthIndex);
      this.$refs.lineChart.refresh();
    },
    printChart() {
      const win = window.open("", "Print", "height=600,width=800");
      win.document.write(`<br><img src='${this.donutChartDataURL}'/>`);
      // TODO: find better solution how to remove timeout
      setTimeout(() => {
        win.document.close();
        win.focus();
        win.print();
        win.close();
      }, 200);
    },
    ...mapActions("dashboard", [
      "getAgeGroupData",
      "getCitizenshipData",
      "getCivilStatusData",
      "getSocialClassData",
      "getUserLoginMonthlyData",
      "getUserSignUpMonthlyData",
    ]),
  },
  computed: {
    theme() {
      return useGlobalConfig().getGlobalConfig().colors;
    },
    donutChartDataURL() {
      return document.querySelector(".chart--donut canvas").toDataURL("image/png");
    },
    ...mapGetters("dashboard", {
      ageGroupLabel: "getAgeGroupLabel",
      ageGroupValues: "getAgeGroupValues",

      citizenshipLabel: "getCitizenshipLabel",
      citizenshipValues: "getCitizenshipValues",

      civilStatusLabel: "getCivilStatusLabel",
      civilStatusValues: "getCivilStatusValues",

      socialClassLabel: "getSocialClassLabel",
      socialClassValues: "getSocialClassValues",

      loginLabels: "getUserLoginMonthlyLabels",
      loginValues: "getUserLoginMonthlyValues",

      signUpLabels: "getUserSignUpMonthlyLabels",
      signUpValues: "getUserSignUpMonthlyValues",
    }),
  },
};
</script>

<style scoped>
  .chart {
    height: 400px;
  }
  .text-right {
    text-align: right;
  }
</style>
