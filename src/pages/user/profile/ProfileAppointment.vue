<template>
  <va-card>
    <va-card-title>Appointments</va-card-title>
    <va-data-table
      :items="items"
      :columns="columns"
      :per-page="perPage"
      :current-page="currentPage"
      :filter="filter"
      clickable
      striped
      hoverable
    >

      <template #cell(government_id)="{ source: government_id }">
        <va-image :src="government_id">
          <template #error>
            Image not found!
          </template>
        </va-image>
      </template>
      <template #cell(document)="{ source: document }">
        <va-chip>{{ document }}</va-chip>
      </template>

      <template #cell(status)="{ source: status }">
        <va-chip
          :color="status === 'Pending' ? 'warning' : 'secondary'"
        >
          {{ status }}
        </va-chip>
      </template>

      <template #cell(purpose)="{ source: purpose }">
        {{ purpose.substring(0, 50) }}...
      </template>

      <template #cell(actions)="{ rowIndex }">
        <va-button flat icon="edit" @click="editItemById(rowIndex)"/>
        <va-button flat icon="delete" @click="deleteItemById(rowIndex)"/>
        <va-button flat icon="eye" @click="this.viewItemById(rowIndex)"/>
      </template>
    </va-data-table>
  </va-card>

  <va-modal
    :model-value="!!editedItem"
    message="Edit Appointment"
    @ok="this.editItem()"
    @cancel="resetEditedItem()"
    size="large"
    disabled
  >
    <slot>
      <EditAppointmentForm :form-data="this.editedItem" :item-id="this.editedItemId" :is-view="viewMode"/>
    </slot>
  </va-modal>
</template>

<script>
import { VaDataTable, VaCard, VaCardTitle, VaModal, VaImage, VaChip, VaButton } from "vuestic-ui";
import { mapActions, mapGetters, mapMutations } from "vuex";
import EditAppointmentForm from "./modal/EditAppointmentForm";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default {
  name: "ProfileAppointment",
  components: {
    VaDataTable,
    VaCard,
    VaCardTitle,
    VaImage,
    VaChip,
    VaButton,
    VaModal,
    EditAppointmentForm
  },
  data() {
    const items = []
    const columns = [
      {
        key: "id",
        sortable: true
      },
      {
        key: "recipient_name",
        sortable: true
      },
      {
        key: "email",
        sortable: true
      },
      {
        key: "document",
        sortable: true
      },
      {
        key: "status",
        sortable: true
      },
      {
        key: "purpose",
        sortable: false
      },
      {
        key: "created_at",
        sortable: true,
      },
      {
        key: "government_id",
        sortable: false,
      },
      {
        key: "start_appointment",
        sortable: true,
      },
      {
        key: "end_appointment",
        sortable: true,
      },
      {
        key: "actions",
        width: 80
      },
    ]
    return {
      columns,
      items,
      editedItemId: null,
      editedItem: null,
      viewMode: false,
    }
  },
  mounted() {
    this.getAppointment()
    .then((res) => {
      this.setAppointment(res)
    })
    .catch(error => {
      console.log(error)
    })
  },
  methods: {
    ...mapActions("user", ["getAppointment"]),
    ...mapActions("appointment", {
        updateStatus: "updateAppointmentStatus",
      }),
    ...mapMutations("user", ["setAppointment"]),

    editItemById(id) {
      this.editedItemId = id
      this.editedItem = { ...this.items[id] }
    },
    viewItemById(id) {
      this.viewMode = true
      this.editItemById(id)
    },
    resetEditedItem() {
      this.viewMode = false
      this.editedItem = null
      this.editedItemId = null
    },
    deleteItemById(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (!result.isConfirmed) { return; }

        const appointment = this.items[id];
        this.deleteAppointment(appointment.id).then(() => {
          Swal.fire({
            title: "Success",
            text: `${appointment.recipient_name}'s Appointment #${appointment.id} has been deleted.`,
            icon: "success",
            timer: 2500,
            showConfirmButton: false,
          })
          this.items = [
            ...this.items.slice(0, id),
            ...this.items.slice(id + 1),
          ]
        }).catch((error) => {
          Swal.fire({
            title: "Error",
            html: `Appointment has not been deleted.<br>${error.message}`,
            icon: "error",
            confirmButtonText: "I Understand.",
          })
        })
      })
    },
    editItem() {
      const id = this.items[this.editedItemId].id
      const status = this.editedItem.status.value
      this.editedItem.status = this.editedItem.status.text

      this.updateStatus({
        id: id,
        status: status,
      }).then(() => {
        Swal.fire({
          title: "Success!",
          text: "Status has been updated.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        })

        this.items = [
          ...this.items.slice(0, this.editedItemId),
          { ...this.editedItem },
          ...this.items.slice(this.editedItemId + 1),
        ]
        this.resetEditedItem()
      }).catch((error) => {
        Swal.fire({
          title: "Error!",
          html: `Status has not been updated. <br>${error.message}`,
          icon: "error",
          confirmButtonText: "I Understand.",
        })
      })
    },
  },
  computed: {
    ...mapGetters("user", ["appointmentList"]),
  },
  watch: {
    appointmentList: {
      handler(newValue) {
        if (newValue) { this.items = newValue; }
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.table--pagination {
  margin-top: 1rem;
  text-align: center;
  text-align: -moz-center;
  text-align: -webkit-center;
}
</style>
