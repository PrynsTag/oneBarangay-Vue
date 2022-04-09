<template>
  <div>
    <VaAlert
      closeable
      v-model="isCloseableAlertVisible"
      :title="this.toast.title"
      :description="this.toast.message"
      :color="this.toast.type"
    >
      <template #icon>
        <va-icon :name="this.toast.icon" :size="this.toast.iconSize"/>
      </template>
    </VaAlert>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { VaAlert, VaIcon } from "vuestic-ui";

export default {
  name: "Toast",
  data() {
    return {
      isCloseableAlertVisible: true
    };
  },
  components: { VaAlert, VaIcon },
  props: {
    toast: {
      required: true,
      type: Object
    }
  },
  mounted() {
    setTimeout(() => {
      this.removeToast(this.toast.message);
    }, this.toast.duration);
  },
  methods: {
    ...mapActions("toast", ["removeToast"])
  },
}
</script>

<style scoped>

</style>
