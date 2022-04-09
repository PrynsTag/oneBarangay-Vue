<template>
  <div>
    <VaModal
      hide-default-actions
      v-model="showModal"
      :title="dialog.title"
      :color="dialog.type"
      :max-width="dialog.maxWidth"
      :max-height="dialog.maxHeight"
      :size="dialog.size"
    >
      <template #header class="mb-4">
      </template>
      <template #default>
        <div class="text-center">
          <va-icon class="mb-4" :name="dialog.icon" size="100px"></va-icon>
        </div>
        <div class="text-center" style="font-size: 1rem;">
          {{ dialog.message }}
        </div>
      </template>
    </VaModal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { VaModal, VaIcon } from "vuestic-ui";

export default {
  name: "Dialog",
  components: {
    VaModal,
    VaIcon
  },
  data() {
    return {
      showModal: this.dialog.showModal,
    };
  },
  props: {
    dialog: {
      required: true,
      type: Object
    }
  },
  created() {
    setTimeout(() => {
      this.removeDialog(this.dialog.message);
    }, this.dialog.duration);
  },
  methods: {
    ...mapActions("dialog", ["removeDialog"])
  },
}
</script>

<style scoped>
.va-modal-* {
  font-size: 20.5rem;
}
</style>
