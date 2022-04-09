<template>
  <va-card class="announcement-card">
    <va-form
      tag="form"
      class="announcement-card__form"
      @submit.prevent="onsubmit()"
    >
      <va-input
        class="announcement-card__input"
        label="Title"
        v-model="title"
        disabled
      />
      <va-input
        class="announcement-card__input"
        label="Categories"
        v-model="tags"
      />
      <va-input
        class="announcement-card__input"
        label="Content"
        type="textarea"
        v-model="content"
        autosize
      />
      <va-file-upload
        class="announcement-card__input"
        type="gallery"
        file-types="image/*"
        v-model="thumbnail"
        dropzone
      />

      <div class="announcement-card__submit">
        <va-button type="submit" class="mt-2">
          Submit
        </va-button>
      </div>
    </va-form>
  </va-card>
</template>

<script>
import { VaCard, VaInput, VaFileUpload, VaForm, VaButton } from "vuestic-ui";
import { mapActions, mapGetters, mapMutations } from "vuex";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default {
  name: "EditAnnouncement",
  components: {
    VaCard,
    VaInput,
    VaFileUpload,
    VaForm,
    VaButton
  },
  data() {
    return {
      announcementSlug: this.$route.params.slug,
      title: null,
      tags: null,
      content: null,
      thumbnail: [],
    };
  },
  mounted() {
    this.fetAnnouncementItem(this.announcementSlug);

  },
  computed: {
    ...mapGetters("announcement", {
      announcement: "getAnnouncementItem"
    })
  },
  methods: {
    onsubmit() {
      const tagList = this.tags ? this.tags.split(",") : [];
      let announcementData = { slug: this.announcementSlug };
      console.log(this.thumbnail[0]);

      if (tagList.length > 0) { announcementData["tags"] = tagList; }
      if (this.thumbnail.length > 0) { announcementData["thumbnail"] = this.thumbnail[0]; }
      announcementData["content"] = this.content;

      this.editAnnouncement(announcementData)
      .then(() => {
        Swal.fire({
          title: "Success",
          text: "Announcement has been updated",
          icon: "success",
          timer: 2500,
          showConfirmButton: false
        }).then(() => {
          this.$router.push({ name: "announcement-list" });
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          html: `Announcement has not been updated! <br> ${error.message}`,
          icon: "error",
          timer: 2500,
          showConfirmButton: false
        });
      });
    },
    ...mapActions("announcement", ["editAnnouncement", "fetAnnouncementItem"]),
    ...mapMutations("announcement", ["setAnnouncementItem"])
  },
  watch: {
    announcement: {
      handler(newValue) {
        if (newValue) {
          this.title = newValue.title;
          this.tags = newValue.tags.join(",");
          this.content = newValue.content;
        }
      },
      immediate: true
    },
  },
}
</script>

<style lang="scss" scoped>
.announcement-card {
  margin: 0 auto;
  max-width: 800px;

  &__input {
    margin: 0 auto;
    padding: 1rem 0;
    max-width: 400px;
  }

  &__submit {
    text-align: right;
    margin: 0 auto;
    padding: 1rem 0;
    max-width: 400px;
  }

  &__editor {
    margin: 0 auto;
    padding: 1rem 0;
    max-width: 400px;
  }
}
</style>
