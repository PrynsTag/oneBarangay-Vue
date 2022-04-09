<template>
  <va-card stripe stripe-color="primary" class="mb-4">
    <va-card-title>Profile</va-card-title>
    <va-card-content>
      <va-image id="profile-image" ratio="4" contain :src="this.profile.image">
        <template #loader>
          <va-progress-circle indeterminate/>
        </template>
        <template #error>
          Image not found! :(
        </template>
      </va-image>
      <h5 id="profile-name" class="display-5">{{ this.profile.name }}</h5>
      <p id="profile-email">{{ this.profile.email }}</p>
      <p id="job-title"><va-chip>{{ this.user.title }}</va-chip></p>
      <p id="profile-last-login">Last Login: {{ this.user.last_login }}</p>
    </va-card-content>
  </va-card>
</template>

<script>
import { VaCard, VaCardTitle, VaChip, VaImage, VaProgressCircle, VaCardContent } from "vuestic-ui"
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "ProfileCard",
  components: {
    VaCard,
    VaCardTitle,
    VaChip,
    VaCardContent,
    VaImage,
    VaProgressCircle
  },
  data() {
    return {
      profile: {
        name: "",
        email: "",
        image: ""
      },
      user: {
        title: ""
      }
    };
  },
  mounted() {
    this.getUser()
    .then((res) => {
      this.setUser(res)
    })
    .catch(err => {
      console.log(err)
    })
  },
  methods: {
    ...mapActions("user", ["getUser"]),
    ...mapMutations("user", ["setUser"])
  },
  computed: {
    ...mapGetters("user", ["profileData", "userData"]),
  },
  watch: {
    userData: {
      handler(newValue) {
        if (newValue.username) {
          if (newValue.is_superuser) {
            this.user.title = "Admin";
          } else if (newValue.is_staff) {
            this.user.title = "Staff";
          } else {
            this.user.title = "User";
          }
          this.user.last_login = newValue.last_login;
        }
      },
      immediate: true,
    },
    profileData: {
      handler(newValue) {
        if (newValue.email) {
          this.profile.name = `${newValue.first_name} ${newValue.last_name}`;
          this.profile.email = newValue.email;
          this.profile.image = newValue.profile_image;
        }
      },
      immediate: true,
    }
  }
}
</script>

<style lang="scss" scoped>
#profile-image > div:nth-child(2) > img:nth-child(1) {
  border-radius: 50%;
}
#profile-name {
  text-align: center;
  margin-top: 10px;
}
#job-title,
#profile-email,
#profile-last-login {
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
}

#profile-last-login {
  font-size: 0.6em;
  color: #999;
  margin-top: 25px;
  margin-right: 10px;
  position: absolute;
  top: 0;
  right: 0;
}

.va-card {
  width: 100%;
  margin: 0 auto;
}
</style>
