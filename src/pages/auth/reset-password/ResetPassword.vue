<template>
  <form @submit.prevent="onsubmit" class="login">
    <div class="row mb-2">
      <va-input
        class="mb-3"
        v-model="newPassword1"
        type="password"
        label="New Password"
        :error="!!passwordErrors.length"
        :error-messages="passwordErrors"
      />
    </div>
    <div class="row mb-2">
      <va-input
        class="mb-3"
        v-model="newPassword2"
        type="password"
        label="Confirm Password"
        :error="!!passwordErrors.length"
        :error-messages="passwordErrors"
      />
    </div>
    <div class="row justify--center">
      <va-button type="submit" class="my-0">{{ $t('auth.reset_password') }}</va-button>
    </div>
  </form>
</template>

<script>
import { VaInput, VaButton } from "vuestic-ui";
import { mapActions } from "vuex";

export default {
  name: "recover-password",
  components: {
    VaInput,
    VaButton,
  },
  data() {
    return {
      passwordErrors: [],
      newPassword1: "",
      newPassword2: "",
      uid: this.$route.params.uid,
      token: this.$route.params.token,
    };
  },
  methods: {
    onsubmit() {
      if (!this.newPassword1 || !this.newPassword2) {
        this.passwordErrors = ["Password is required"];
      } else if (this.newPassword1 !== this.newPassword2) {
        this.passwordErrors = ["Passwords do not match"];
      } else {
        this.passwordResetConfirm({ uid: this.uid, token: this.token, newPassword1: this.newPassword1, newPassword2: this.newPassword2 });
        this.$router.push({ name: "login" });
      }
    },
    ...mapActions("auth", ["passwordResetConfirm"]),
  },
};
</script>

<style lang="scss">
</style>
