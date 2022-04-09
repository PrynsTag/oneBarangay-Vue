<template>
  <div class="row">
    <va-input
      class="flex mb-2 sm12 md6 lg3"
      placeholder="Filter..."
      v-model="filter"
    />
    <va-button
      class="ml-auto md3 add-btn"
      @click="this.addRbi()"
    >
      Add RBI
    </va-button>
  </div>

  <va-data-table
    :items="items"
    :columns="columns"
    :per-page="perPage"
    :current-page="currentPage"
    :filter="filter"
    clickable
    striped
    hoverable
    :loading="!(!!items.length)"
    @filtered="filtered = $event.items"
  >

    <template #cell(actions)="{ rowIndex }">
      <va-button flat icon="edit" @click="editItemById(rowIndex)"/>
      <va-button flat icon="delete" @click="deleteItemById(rowIndex)" />
      <va-button flat icon="eye" @click="viewItemById(rowIndex)"/>
    </template>

  </va-data-table>

  <div class="table--pagination">
    <va-pagination
      v-model="currentPage"
      input
      :pages="pages"
      v-if="!!items.length"
    />
  </div>
</template>

<script>
import { VaDataTable, VaPagination, VaInput, VaButton } from "vuestic-ui";
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default {
  name: "RBI",
  components: {
    VaDataTable,
    VaPagination,
    VaInput,
    VaButton,
  },
  data() {
    const items = [];
    const columns = [
      {
        key: "house_id",
        sortable: true
      },
      {
        key: "created_at",
        sortable: true
      },
      {
        key: "updated_at",
        sortable: true
      },
      {
        key: "date_accomplished",
        sortable: true
      },
      {
        key: "address",
        sortable: true
      },
      {
        key: "family_name",
        sortable: false
      },
      {
        key: "street",
        sortable: true,
      },
      {
        key: "actions",
        width: 80,
      },
    ]

    return {
      items,
      columns,

      showModal: false,
      rowNumber: null,
      viewMode: false,
      editedItemId: null,
      editedItem: null,

      filter: "",
      filtered: null,

      perPage: 10,
      currentPage: 1,
    }
  },
  mounted() {
    this.fetchHouseList();
  },
  computed: {
    pages() {
      return (this.perPage && this.perPage !== 0)
        ? Math.ceil(this.houseCount / this.perPage)
        : this.filtered.length
    },
    ...mapGetters("rbi", {
      houseList: "getHouseList",
      houseCount: "getHouseCount",
    }),
  },
  methods: {
    addRbi() {
      this.$router.push({ name: "rbi-create" });
    },
    deleteItemById(id) {
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

        const rbiId = this.items[id].house_id;
        this.deleteHouseRecord(rbiId)
        .then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "RBI has been deleted successfully!",
            icon: "success",
            timer: 2500,
            showConfirmButton: false
          });
          this.items = [
            ...this.items.slice(0, id),
            ...this.items.slice(id + 1),
          ];
        })
        .catch(error => {
          Swal.fire({
            title: "Error!",
            text: `Something went wrong! <br> ${error.message}`,
            icon: "error",
            timer: 2500,
            showConfirmButton: false
          });
        });
      });
    },
    editItemById(id) {
      const rbiId = this.items[id].house_id;
      this.$router.push({ name: "rbi-edit", params: { id: rbiId } });
    },
    viewItemById(id) {
      const rbiId = this.items[id].house_id;
      this.$router.push({ name: "rbi-view", params: { id: rbiId } });
    },
    ...mapActions("rbi", ["fetchHouseList", "deleteHouseRecord"]),
  },
  watch: {
    houseList: {
      handler(newValue) {
        if (newValue) {
          this.items = newValue;
        }
      },
      immediate: true
    },
  }
}
</script>

<style lang="scss" scoped>
.table--pagination {
  margin-top: 1rem;
  text-align: center;
  text-align: -moz-center;
  text-align: -webkit-center;
}

.add-btn {
  margin: 20px;
}
</style>
