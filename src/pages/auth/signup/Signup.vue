<template>
  <form @submit.prevent="onSubmit()">
    <va-input
      class="mb-3"
      v-model="email"
      type="email"
      :label="$t('auth.email')"
      :rules="[validateEmail]"
      :messages="validateEmail === true ? this.successEmailMessage : ''"
      :success="validateEmail === true"
    />

    <va-input
      class="mb-3"
      v-model="username"
      type="text"
      label="username"
      :rules="[validateUsernameLength, validateUsernameCharacters]"
      :messages="validateUsername === true ? this.successUsernameMessage : ''"
      :success="validateUsername === true"
    />

    <va-input
      class="mb-3"
      v-model="password1"
      type="password"
      :label="$t('auth.password')"
      :rules="[validatePasswordLength]"
      :messages="validatePassword === true ? this.successPasswordMessage : ''"
      :success="validatePassword === true"
    />

    <va-input
      class="mb-3"
      v-model="password2"
      type="password"
      label="Confirm Password"
      :rules="[validatePasswordEquality, validatePasswordLength]"
      :messages="validatePassword === true ? this.successPasswordMessage : ''"
      :success="validatePassword === true"
    />

    <div class="auth-layout__options d-flex align--center justify--space-between">
      <va-checkbox
        v-model="agreedToTerms"
        class="mb-0"
        :rules="[validateAgreedToTerms]"
        :error="!this.agreedToTerms"
        :error-messages="this.errorAgreedToTermsMessage"
      >
        <template #label>
          <span class="ml-1">
            {{ $t('auth.agree') }}
            <span class="link">{{ $t('auth.termsOfUse') }}</span>
          </span>
        </template>
      </va-checkbox>
      <router-link class="ml-1 link" :to="{name: 'recover-password'}">
        {{$t('auth.recover_password')}}
      </router-link>
    </div>

    <div class="d-flex justify--center mt-3">
      <va-button
        @click="onSubmit"
        class="my-0"
        :disabled="!formReady"
        :hidden="!formReady"
      >
        {{ $t('auth.sign_up') }}
      </va-button>
    </div>
  </form>
</template>

<script>
import { VaInput, VaCheckbox, VaButton } from "vuestic-ui";
import { mapActions } from "vuex";

export default {
  name: "signup",
  components: { VaInput, VaCheckbox, VaButton },
  data() {
    return {
      email: "",
      password1: "",
      password2: "",
      username: "",
      agreedToTerms: false,

      successEmailMessage: "The entered email address is valid.",
      successPasswordMessage: "The entered password is valid.",
      successUsernameMessage: "The entered username is valid.",
      errorAgreedToTermsMessage: "You must agree to the terms of use.",
    };
  },
  methods: {
    onSubmit() {
      this.agreedToTermsErrors = this.agreedToTerms ? [] : ["You must agree to the terms of use to continue"];

      if (!this.formReady) { return; }

      this.signUp({
        email: this.email,
        password1: this.password1,
        password2: this.password2,
        username: this.username,
      });
      // this.$router.push({ name: "login" });
    },
    ...mapActions("auth", ["signUp"]),
  },
  computed: {
    formReady() {
      return this.validateEmail === true &&
        this.validateUsername === true &&
        this.validatePassword === true &&
        this.agreedToTerms === true;
    },
    validateEmail() {
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      return emailRegex.test(this.email) ? true : "Enter a valid email address.";
    },
    validatePassword() {
      const passwordLengthCheck = this.validatePasswordLength === true;
      const validatePasswordEquality = this.validatePasswordEquality === true;

      return passwordLengthCheck && validatePasswordEquality;
    },
    validatePasswordLength() {
      return this.password1.length >= 8 ? true : "Please enter a password with 8 characters long.";
    },
    validatePasswordEquality() {
      return this.password1 === this.password2 ? true : "Passwords do not match.";
    },
    validateUsername() {
      const usernameCharacterCheck = this.validateUsernameCharacters === true;
      const usernameLengthCheck = this.validateUsernameLength === true;

      return usernameCharacterCheck && usernameLengthCheck;
    },
    validateUsernameCharacters() {
      const usernameRegex = /^[a-zA-Z0-9_]+$/
      return usernameRegex.test(this.username) ? true : "Username can only contain letters, numbers and underscores.";
    },
    validateUsernameLength() {
      return this.username.length >= 5 && this.username.length <= 20 ? true : "Username must be between 3 and 20 characters long.";
    },
    validateAgreedToTerms() {
      return this.agreedToTerms ? true : this.errorAgreedToTermsMessage;
    },
  },
};
</script>

<style lang="scss">
</style>
