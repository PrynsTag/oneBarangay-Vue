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
        :rules="[validateTitleField]"
        :success="validateTitleField === true"
      />

      <va-input
        class="announcement-card__input"
        label="Categories"
        v-model="tags"
        :rules="[validateCategoriesField]"
        :success="validateCategoriesField === true"
      />

      <va-input
        class="announcement-card__input"
        label="Content"
        type="textarea"
        v-model="content"
        autosize
        :rules="[validateContentField]"
        :success="validateContentField === true"
      />

      <p class="text-center mb-2" style="color: #2b669a; font-weight: bold">Upload your Thumbnail.</p>
      <va-file-upload
        class="announcement-card__input"
        type="gallery"
        file-types="image/*"
        v-model="thumbnail"
        dropzone
      />

      <div class="announcement-card__submit">
        <va-button
          type="submit"
          class="mt-2"
          :disabled="!formReady"
        >
          Submit
        </va-button>
      </div>
    </va-form>
  </va-card>
</template>

<script>
import { VaCard, VaInput, VaFileUpload, VaForm, VaButton } from "vuestic-ui";
import { mapActions } from "vuex";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default {
  name: "CreateAnnouncement",
  components: { VaCard, VaInput, VaFileUpload, VaForm, VaButton },
  data() {
    return {
      title: "",
      tags: "",
      content: "",
      fieldErrorMessage: "",
      thumbnail: []
    };
  },
  methods: {
    onsubmit() {
      if (!this.formReady) { return; }

      const formData = new FormData();
      const tagList = this.tags.split(",");

      formData.append("title", this.title);
      formData.append("tags", JSON.stringify(tagList));
      formData.append("content", this.content);
      formData.append("thumbnail", this.thumbnail[0]);

      // this.$store.dispatch("announcement/createAnnouncement", formData);
      this.createAnnouncement(formData)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Your announcement has been created.",
          icon: "success",
          timer: 2500,
          showConfirmButton: false
        }).then(() => { this.$router.push({ name: "announcement-list" }); });
      })
      .catch(error => {
        Swal.fire({
          title: "Error!",
          html: `Something went wrong! <br> ${error.message}`,
          icon: "error",
          timer: 2500,
          showConfirmButton: false,
        });
      });
    },
    ...mapActions("announcement", ["createAnnouncement"]),
  },
  computed: {
    formReady() {
      return this.validateTitleField === true &&
        this.validateCategoriesField === true &&
        this.validateContentField === true;
    },
    validateTitleField() {
      return this.title.length > 0 ? true : "This field is required";
    },
    validateCategoriesField() {
      return this.tags.length > 0 ? true : "This field is required";
    },
    validateContentField() {
      return this.content.length > 0 ? true : "This field is required";
    }
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
