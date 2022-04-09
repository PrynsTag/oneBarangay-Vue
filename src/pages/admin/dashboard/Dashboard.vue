<template>
  <div class="dashboard">
    <dashboard-info-block/>
    <dashboard-charts />
    <div class="row row-equal">
      <div class="flex xs12 lg6">
        <dashboard-tabs/>
      </div>
      <div class="flex xs12 lg6">
        <AppointmentsTab/>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardCharts from "./DashboardCharts";
import DashboardInfoBlock from "./DashboardInfoBlock";
import DashboardTabs from "./DashboardTabs";
import AppointmentsTab from "./dashboard-tabs/AppointmentsTab";

export default {
  name: "dashboard",
  components: {
    DashboardCharts,
    DashboardInfoBlock,
    DashboardTabs,
    AppointmentsTab,
  },
};
</script>

<style lang="scss">
  .row-equal .flex {
    .va-card {
      height: 100%;
    }
  }

  .dashboard {
    .va-card {
      margin-bottom: 0 !important;
      &__title {
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
