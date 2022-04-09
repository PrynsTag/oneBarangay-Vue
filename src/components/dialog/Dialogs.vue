<template>
  <div v-if="dialogs.length">
    <Dialog
      v-for="(dialog, index) of dialogs"
      :dialog="dialog"
      :key="index"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Dialog from "./Dialog";

export default {
  name: "Dialogs",
  components: { Dialog },
  computed: {
    ...mapGetters("dialog", {
      dialogs: "getDialogs"
    })
  }
}
</script>

<style scoped>

</style>
