<template>
  <form @submit.prevent="onsubmit" class="login">
    <va-input
      class="mb-3"
      v-model="email"
      type="email"
      :label="$t('auth.email')"
      :rules="[validateEmail]"
      :messages="validateEmail === true ? this.successEmailMessage : ''"
      :success="validateEmail === true"
    />
    <div class="row justify--center">
      <va-button
        type="submit"
        class="my-0"
        :disabled="!formReady"
        :hidden="!formReady"
      >
        {{ $t('auth.recover_password') }}
      </va-button>
    </div>
  </form>
</template>

<script>
import { VaInput, VaButton } from "vuestic-ui";
import { mapActions } from "vuex";

export default {
  name: "recover-password",
  components: { VaInput, VaButton },
  data() {
    return {
      email: "",
      successEmailMessage: "The entered email address is valid.",
    };
  },
  methods: {
    onsubmit() {
      if (!this.email) {
        this.emailErrors = ["Email is required"];
      } else {
        this.recoverPassword(this.email);
        this.$router.push({ name: "login" });
      }
    },
    ...mapActions("auth", ["recoverPassword"]),
  },
  computed: {
    formReady() {
      return this.validateEmail === true;
    },
    validateEmail() {
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      return emailRegex.test(this.email) ? true : "Enter a valid email address.";
    },
  }
};
</script>

<style lang="scss">
</style>
