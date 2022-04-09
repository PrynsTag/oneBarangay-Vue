<template>
  <div class="row">
    <va-button
      class="ml-auto md3 add-appointment"
      @click="create()"
    >
      Create Announcement
    </va-button>
  </div>
  <div class="row">
    <div
      class="flex sm12 md6 lg3"
      v-for="announcement in strippedContent"
      :key="announcement.id"
    >
      <va-card>
        <va-image
          :src="announcement.thumbnail"
          style="height: 200px;"
        />
        <va-card-title>{{ announcement.title }}</va-card-title>
        <div class="px-3" v-if="announcement.tags.length">
          <va-chip class="mr-1" v-for="tag in announcement.tags" :key="tag">{{ tag }}</va-chip>
        </div>
        <va-card-content>{{ announcement.content.substring(0, 170) }}</va-card-content>
        <va-card-actions align="left">
          <va-button
            @click="edit(announcement.slug)"
            color="primary"
            size="small"
          >
            <va-icon name="edit"/>
            Edit
          </va-button>
          <va-button
            @click="removeAnnouncement(announcement.slug)"
            color="danger"
            size="small"
          >
            <va-icon name="delete"/>
            Delete
          </va-button>
        </va-card-actions>
      </va-card>
    </div>
  </div>
</template>

<script>
import { VaCard, VaCardTitle, VaCardContent, VaImage, VaCardActions, VaButton, VaIcon, VaChip } from "vuestic-ui";
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default {
  name: "Announcement",
  components: {
    VaCard,
    VaCardTitle,
    VaCardContent,
    VaImage,
    VaCardActions,
    VaButton,
    VaIcon,
    VaChip,
  },
  data() {
    return {
      items: []
    };
  },
  mounted() {
    this.fetchAnnouncementList();
  },
  computed: {
    ...mapGetters("announcement", {
      announcementList: "getAnnouncementList"
    }),
    strippedContent() {
      return this.items.map(item => {
        const div = document.createElement("div")
        div.innerHTML = item.content.substring(0, 170)
        const text = div.textContent || div.innerText || ""

        return {
          ...item,
          content: text
        };
      });
    }
  },
  methods: {
    ...mapActions("announcement", {
      fetchAnnouncementList: "fetchAnnouncementList",
      deleteAnnouncement: "deleteAnnouncement"
    }),
    create() {
      this.$router.push({ name: "announcement-create" });
    },
    removeAnnouncement(slug) {
      //TODO: Remove announcement from DOM
      const announcementId = this.items.findIndex(item => item.slug === slug);
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (!result.isConfirmed) { return; }

        this.deleteAnnouncement(slug)
        .then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Announcement has been deleted.",
            icon: "success",
            timer: 2500,
            showConfirmButton: false
          });
          this.items = [
            ...this.items.slice(0, announcementId),
            ...this.items.slice(announcementId + 1),
          ]
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            html: `Something went wrong! <br>${error.message}`,
            timer: 2500
          });
        });
      });
    },
    edit(announcementSlug) {
      this.$router.push({
        name: "announcement-edit",
        params: { slug: announcementSlug }
      });
    }
  },
  watch: {
    announcementList: {
      handler(newValue) {
        if (newValue) {
          this.items = newValue;
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
