<template>
  <va-card>
    <va-card-title>Change Profile Photo</va-card-title>
    <va-card-content>
      <p id="note">
        <strong>Note:</strong>
        <small>Size of image should be less than 5MB</small>
      </p>
      <va-file-upload
        v-model="profile_photo"
        file-types="image/*"
        type="list"
        :disabled="!!profile_photo[0]"
        @input="value => uploadImage(value.target.files[0])"
        dropzone
      />
    </va-card-content>
  </va-card>
</template>

<script>
import { VaCard, VaCardTitle, VaCardContent, VaFileUpload } from "vuestic-ui";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "ProfilePhoto",
  components: {
    VaCard,
    VaCardTitle,
    VaCardContent,
    VaFileUpload
  },
  data() {
    return {
      profile_photo: []
    };
  },
  methods: {
    uploadImage(image) {
      this.changeProfileImage({ image: image, username: this.getUserName })
        .then((res) => {
          this.setProfileImage(res.profile_image)
          this.profile_photo = [];
        })
        .catch(err => {
        console.log(err);
      });
    },
    ...mapActions("user", ["changeProfileImage"]),
    ...mapMutations("user", ["setProfileImage"])
  },
  computed: {
    ...mapGetters("user", ["getUserName"]),
    ...mapGetters("user", {
      profileImage: "getProfileImage"
    })
  },
}
</script>

<style lang="scss" scoped>
#note {
  color: var(--va-primary);
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.8rem;
}
</style>
