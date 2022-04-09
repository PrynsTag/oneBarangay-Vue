<template>
  <form @submit.prevent="onsubmit">
    <va-input
      class="mb-3"
      id="email"
      v-model="email"
      type="email"
      :label="$t('auth.email')"
      :rules="[validateEmail]"
      :messages="validateEmail === true ? this.successEmailMessage : ''"
      :success="validateEmail === true"
    />
    <!--  TODO: Implement this later.  -->
    <!--    <div v-if="!!errorEmailMessage" class="mb-3" style="color: var(&#45;&#45;va-danger); font-size: 13px">-->
    <!--      <ul>-->
    <!--        <li v-for="(error, index) in errorEmailMessage" :key="index">-->
    <!--          <div v-if="error[index] !== 'Enter a valid email address.'">{{ error[index] }}</div>-->
    <!--        </li>-->
    <!--      </ul>-->
    <!--    </div>-->

    <va-input
      class="mb-3"
      id="username"
      v-model="username"
      type="text"
      label="username"
      :rules="[validateUsernameLength, validateUsernameCharacters]"
      :messages="validateUsername === true ? this.successUsernameMessage : ''"
      :success="validateUsername === true"
    />

    <va-input
      class="mb-3"
      id="password"
      v-model="password"
      type="password"
      :label="$t('auth.password')"
      :rules="[validatePassword]"
      :messages="validatePassword === true ? this.successPasswordMessage : null"
      :success="validatePassword === true"
    />

    <va-alert color="danger" class="mb-4 text-center" v-if="errorNonFieldMessage.length">
      <ul v-for="(message, index) in errorNonFieldMessage" :key="index">
        <li>{{ message }}</li>
      </ul>
      <ul>
        <li>Check if your email, username and password is correct.</li>
      </ul>
    </va-alert>

    <div class="auth-layout__options d-flex align--center justify--space-between">
      <va-checkbox v-model="keepLoggedIn" class="mb-0" :label="$t('auth.keep_logged_in')"/>
      <router-link class="ml-1 link" :to="{name: 'recover-password'}">{{ $t('auth.recover_password') }}</router-link>
    </div>

    <div class="d-flex justify--center mt-3">
      <va-button
        @click="onsubmit"
        id="login-button"
        class="my-0"
        :disabled="!formReady"
        :hidden="!formReady"
      >
        {{ $t('auth.login') }}
      </va-button>
    </div>
  </form>
  <Toasts/>
  <Dialogs/>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { VaInput, VaCheckbox, VaButton, VaAlert } from "vuestic-ui";
import Toasts from "@/components/toast/Toasts";
import Dialogs from "@/components/dialog/Dialogs";
import Swal from "sweetalert2";

export default {
  name: "login",
  components: {
    Dialogs,
    Toasts,
    VaInput,
    VaCheckbox,
    VaButton,
    VaAlert
  },
  data() {
    return {
      email: "",
      password: "",
      username: "",
      keepLoggedIn: false,

      successEmailMessage: "The entered email address is valid.",
      successPasswordMessage: "The entered password is valid.",
      successUsernameMessage: "The entered username is valid.",

      errorEmailMessage: [],
      errorPasswordMessage: [],
      errorUsernameMessage: [],
      errorNonFieldMessage: []
    };
  },
  computed: {
    formReady() {
      return this.validateEmail === true &&
        this.validatePassword === true &&
        this.validateUsername === true;
    },
    validateEmail() {
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      return emailRegex.test(this.email) ? true : "Enter a valid email address.";
    },
    validatePassword() {
      return this.password.length >= 8 ? true : "Please enter a password with 8 characters long.";
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
      return this.username.length >= 4 && this.username.length <= 20 ? true : "Username must be between 4 and 20 characters long.";
    },
    ...mapGetters("auth", {
      usernameError: "getUsernameError",
      passwordError: "getPasswordError",
      emailError: "getEmailError",
      nonFieldError: "getNonFieldErrors",
    }),
  },
  methods: {
    onsubmit() {
      if (!this.formReady) {
        return;
      }

      const credentials = {
        email: this.email,
        password: this.password,
        username: this.username,
      };

      this.login(credentials)
        .then((token) => {
          this.setUser({ token: token, ...credentials });
          Swal.fire({
            title: "Welcome to oneBarangay!",
            text: "You have successfully logged in.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            this.changeUserName(this.username);
            this.$router.push({ name: "dashboard" });
          });
        })
        .catch(() => {
          Swal.fire({
            title: "Login failed",
            text: "Check if your email, username and password is correct.",
            icon: "error",
            confirmButtonText: "OK"
          });
        });

      // TODO: Implement this later.
      // if (!this.usernameError && !this.passwordError && !this.emailError && !this.nonFieldError) { return; }
    },
    ...mapActions("auth", ["login", "setUser"]),
    ...mapMutations("user", ["changeUserName"]),
    ...mapActions("toast", ["addToast"]),
  },
  // TODO: Implement this later.
  // watch: {
  //   usernameError: {
  //     handler(newValue) {
  //       if (newValue) { this.errorUsernameMessage.push(newValue); }
  //     },
  //   },
  //   passwordError: {
  //     handler(newValue) {
  //       if (newValue) {
  //         newValue.map(message => this.errorPasswordMessage.push(message) );
  //       }
  //     },
  //   },
  //   emailError: {
  //     handler(newValue) {
  //       if (newValue) {
  //         newValue.map(message => this.errorEmailMessage.push(message) );
  //       }
  //     },
  //   },
  //   nonFieldError: {
  //     handler(newValue) {
  //       const message = newValue.map(message => message.detail).join(" ");
  //       console.log(message);
  //       if (newValue) { this.errorNonFieldMessage = newValue; }
  //     },
  //   },
  // }
};
</script>
