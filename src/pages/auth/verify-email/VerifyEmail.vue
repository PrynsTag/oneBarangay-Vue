<script>
import { mapActions } from "vuex";

export default {
  name: "VerifyEmail",
  created() {
    this.signUpConfirmEmail(this.$route.params.key);
    this.$router.push({ name: "login" });
  },
  methods: {
    ...mapActions("auth", ["signUpConfirmEmail"])
  }
}
</script>

<style scoped>

</style>
