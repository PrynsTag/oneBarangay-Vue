<template>
  <va-card>
    <va-card-title>
      <h4>Summary</h4>
    </va-card-title>
    <va-card-content>
      <va-tabs grow v-model="activeTabName">
        <template #tabs>
          <va-tab name="UserSignUpTab">
            User Signups
          </va-tab>
          <va-tab name="UserLoginTab">
            User Logins
          </va-tab>
        </template>
      </va-tabs>
      <va-separator/>
      <component :is="activeTabName"/>
    </va-card-content>
  </va-card>
</template>

<script>
import UserSignUpTab from "./dashboard-tabs/UserSignUpTab";
import UserLoginTab from "./dashboard-tabs/UserLoginTab";
import AppointmentsTab from "./dashboard-tabs/AppointmentsTab";
import { VaCard, VaCardTitle, VaCardContent, VaTabs, VaTab, VaSeparator } from "vuestic-ui";

export default {
  name: "DashboardTabs",
  components: {
    UserSignUpTab,
    UserLoginTab,
    AppointmentsTab,
    VaCard,
    VaCardTitle,
    VaCardContent,
    VaTabs,
    VaTab,
    VaSeparator
  },
  data() {
    return {
      activeTabName: "UserLoginTab",
      tabs: [
        "UserSignUpTab",
        "UserLoginTab",
      ],
    };
  },
};
</script>

<style lang="scss">
.va-tabs__tabs {
  height: 100%;
}
</style>
