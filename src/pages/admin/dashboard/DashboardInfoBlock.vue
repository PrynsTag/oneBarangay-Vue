<template>
  <div class="row text-center">
    <div
      class="flex xs12 sm3"
      :class="{'sm4': idx===4}"
      v-for="(info, idx) in infoTiles"
      :key="idx"
    >
      <va-card class="mb-4" :color="info.color">
        <va-card-content>
          <p class="display-2 mb-0" style="color: white;">{{ info.value }}</p>
          <p style="color: white;">{{ info.text }}</p>
        </va-card-content>
      </va-card>
    </div>

    <div class="flex xs12 sm4">
      <va-card color="primary">
        <va-card-content>
          <p class="display-2 mb-1" :style="{color: theme.background}">{{ averageFamilyValue }}</p>
          <p class="no-wrap" :style="{color: theme.background}">{{ averageFamilyLabel }}</p>
        </va-card-content>
      </va-card>
    </div>
    <div class="flex xs12 sm4">
      <va-card color="primary">
        <va-card-content>
          <p class="display-2 mb-1" :style="{color: theme.background}">{{ averageSalaryValue }}</p>
          <p class="no-wrap" :style="{color: theme.background}">{{ averageSalaryLabel }}</p>
        </va-card-content>
      </va-card>
    </div>
  </div>
</template>

<script>
import { useGlobalConfig } from "vuestic-ui";
import { mapActions, mapGetters } from "vuex";
import { VaCard, VaCardContent } from "vuestic-ui";

export default {
  name: "DashboardInfoBlock",
  components: {
    VaCard,
    VaCardContent,
  },
  data() {
    return {
      infoTiles: [],
      announcementLabel: null,
      announcementValue: null,
      appointmentLabel: null,
      appointmentValue: null,
      averageFamilyLabel: null,
      averageFamilyValue: null,
      averageSalaryLabel: null,
      averageSalaryValue: null,
    };
  },
  mounted() {
    this.getTotalData()
    this.getAverageData()
    this.getAppointmentData()
  },
  methods: {
    showModal() {
      this.modal = true;
    },
    showPrevImage() {
      this.currentImageIndex = !this.currentImageIndex ? this.images.length - 1 : this.currentImageIndex - 1;
    },
    showNextImage() {
      this.currentImageIndex = this.currentImageIndex === this.images.length - 1 ? 0 : this.currentImageIndex + 1;
    },
    ...mapActions("dashboard", ["getTotalData", "getAverageData", "getAppointmentData"]),
  },
  watch: {
    totals: {
      handler(newValue) {
        for (let data of newValue.entries()) {
          this.infoTiles.push({
            text: data[1].label,
            value: data[1].value,
            color: "primary",
            icon: ""
          })
        }
      },
      deep: true
    },
    averages: {
      handler(newValue) {
        for (let data  of newValue.entries()) {
          if (data[1].label === "Average Salary") {
            this.averageSalaryLabel = data[1].label;
            this.averageSalaryValue = data[1].value;
          } else {
            this.averageFamilyLabel = "Average Family Size";
            this.averageFamilyValue = data[1].value;
          }
        }
      },
      deep: true
    },
  },
  computed: {
    theme() {
      return useGlobalConfig().getGlobalConfig().colors || {};
    },
    ...mapGetters("dashboard", {
      totals: "getTotalData",
      averages:  "getAverageData"
    })
  },
};
</script>

<style lang="scss" scoped>
  .row-separated {
    .flex + .flex {
      border-left: 1px solid var(--va-background);
    }

    // @include media-breakpoint-down(xs) {
    //   p:not(.display-2) {
    //     font-size: 0.875rem;
    //   }
    // }
  }

  .rich-theme-card-text {
    line-height: 24px;
  }

  .dashboard {
    .va-card__header--over {
      // @include media-breakpoint-up(md) {
      //   padding-top: 0 !important;
      // }
    }

    .va-card__image {
      // @include media-breakpoint-up(md) {
      //   padding-bottom: 0 !important;
      // }
    }
    // .image-card {
    //   position: relative;
    //   .va-button {
    //     position: absolute;
    //   }
    // }
  }
</style>
