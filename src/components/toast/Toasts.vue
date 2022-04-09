<template>
  <div class="toasts-wrapper" v-if="toasts.length">
    <Toast
      v-for="(toast, index) of toasts"
      :toast="toast"
      :key="index">
    </Toast>
  </div>
</template>

<script>
import Toast from "@/components/toast/Toast.vue"
import { mapGetters } from "vuex";

export default {
  name: "Toasts",
  components: { Toast },
  computed: {
    ...mapGetters("toast", {
      toasts: "getToasts"
    })
  }
}
</script>

<style scoped>
.toasts-wrapper {
  width: 400px;
  min-height: 100px;
  display: flex;
  font-size: 1.10rem;
  flex-direction: column;
  align-items: center;
  position: fixed;
  right: 1rem;
  bottom: 0.5rem;
}
</style>
