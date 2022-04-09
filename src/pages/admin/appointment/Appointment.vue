<template>
  <div class="row">
    <va-input
      class="flex mb-2 md3"
      placeholder="Filter..."
      v-model="filter"
    />
    <va-button
      class="ml-auto md3 add-appointment"
      @click="showModal = !showModal"
    >
      Add Appointment
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
      {{ purpose.substring(0, 50) }}
    </template>

    <template #cell(actions)="{ rowIndex }">
      <va-button flat icon="edit" @click="openModalToEditItemById(rowIndex)"/>
      <va-button flat icon="delete" @click="deleteItemById(rowIndex)"/>
      <va-button flat icon="eye" @click="this.viewItem(rowIndex)"/>
      <va-button flat icon="file_present" @click="this.viewItem(rowIndex)"/>
    </template>
  </va-data-table>

  <!-- VIEW & EDIT APPOINTMENT -->
  <va-modal
    :model-value="!!editedItem"
    :message="viewMode ? 'View Appointment' : 'Edit Appointment'"
    @ok="viewMode ? resetEditedItem() : this.editItem()"
    @cancel="resetEditedItem()"
    size="large"
    disabled
    :no-dismiss="!viewMode"
  >
    <slot>
      <va-input
        class="my-4"
        label="Recipient Name"
        disabled
        v-model="editedItem.recipient_name"
      />
      <va-input
        class="mb-4"
        disabled
        v-model="editedItem.purpose"
        type="textarea"
        label="Purpose of Appointment*"
        autosize
      />
      <va-input
        disabled
        class="mb-4"
        label="Type of Document"
        v-model="editedItem.document"
      />
      <va-select
        class="mb-4"
        label="Select Status *"
        clearable
        :disabled="viewMode"
        :options="statusOptions"
        v-model="editedItem.status"
        :track-by="(option) => option.value"
        clearableIcon="cancel"
      />
      <va-input
        disabled
        class="mb-4"
        label="Scheduled Date"
        v-model="editedItem.start_appointment"
      />
      <va-image
        v-if="!!editedItem.government_id && viewMode"
        ratio="0.75"
        contain
        :src="editedItem.government_id"
        :disabled="viewMode"
      >
        <template #error>
          Government I.D. not found!
        </template>
      </va-image>
    </slot>
  </va-modal>

  <!-- ADD NEW APPOINTMENT -->
  <va-modal
    v-model="showModal"
    message="Add Appointment"
    ok-text="Add"
    @ok="addNewItem()"
    @cancel="resetCreatedItem()"
    height="520px"
    class="appointment-modal"
    no-dismiss
  >
    <slot>
      <va-input
        class="mb-4"
        label="Recipient Name *"
        v-model="createdItem.recipient_name"
        :rules="[validateNameLength]"
        :success="validateNameLength === true"
      />
      <va-input
        class="mb-4"
        v-model="createdItem.purpose"
        type="textarea"
        label="Purpose of Appointment*"
        autosize
        :rules="[validatePurposeLength]"
        :success="validatePurposeLength === true"
      />
      <va-select
        class="mb-4"
        label="Select Type of Document *"
        :options="documentOptions"
        v-model="documentValue"
        :track-by="(option) => option.value"
        clearable
        clearableIcon="cancel"
      />
      <!--   TODO: Add this to Add Appointment form   -->
      <!--      <va-select-->
      <!--        class="mb-4"-->
      <!--        label="Select Status *"-->
      <!--        clearable-->
      <!--        :options="statusOptions"-->
      <!--        v-model="statusValue"-->
      <!--        :track-by="(option) => option.value"-->
      <!--        clearableIcon="cancel"-->
      <!--      />-->

      <p class="text-primary text-center mb-2" style="color: #2b669a; font-weight: bold">Upload your Valid I.D</p>
      <va-file-upload
        class="mb-4"
        type="gallery"
        file-types="image/*"
        v-model="createdItem.government_id"
        dropzone
      />

      <p class="text-center mb-2" style="color: #2b669a; font-weight: bold">Set Scheduled Appointment</p>
      <div class="start-appointment">
        <v-date-picker
          label="Date of Appointment *"
          v-model="createdItem.start_appointment"
          mode="dateTime" :minute-increment="5"
        />
      </div>
    </slot>
  </va-modal>

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
import {
  VaDataTable,
  VaInput,
  VaButton,
  VaModal,
  VaPagination,
  VaImage,
  VaChip,
  VaFileUpload,
  VaSelect
} from "vuestic-ui";
import { mapActions, mapGetters, mapMutations } from "vuex";
import "v-calendar/dist/style.css";
import Swal from "sweetalert2/dist/sweetalert2.js";

const defaultItem = {
  recipient_name: "",
  purpose: "",
  government_id: [],
  start_appointment: new Date(),
}

export default {
  name: "appointment",
  components: {
    VaDataTable,
    VaInput,
    VaButton,
    VaModal,
    VaPagination,
    VaImage,
    VaChip,
    VaFileUpload,
    VaSelect,
  },
  mounted() {
    this.getAppointmentList();
  },
  data() {
    const items = []
    const statusOptions = [
      {
        text: "Pending",
        value: "PEN"
      },
      {
        text: "Approved",
        value: "APP"
      },
      {
        text: "Completed",
        value: "COM"
      },
      {
        text: "Cancelled",
        value: "CAN"
      },
      {
        text: "Rejected",
        value: "REJ"
      },
    ]
    const documentOptions = [
      {
        text: "Indigency",
        value: "IND"
      },
      {
        text: "Verification",
        value: "VER"
      },
      {
        text: "Local Employment",
        value: "EMP"
      },
      {
        text: "Clearance Permit",
        value: "CLP"
      },
      {
        text: "Certificate to File Action",
        value: "CFA"
      },
      {
        text: "Complaint Filing",
        value: "COF"
      },
      {
        text: "Certificate to File Counterclaim",
        value: "CFC"
      },
      {
        text: "Borrowing of Tools and Equipment",
        value: "BOR"
      },
      {
        text: "General Appointment",
        value: "APT"
      },
    ]
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
      items,
      columns,

      showModal: false,

      statusOptions,
      statusValue: statusOptions[0],

      documentOptions,
      documentValue: documentOptions[0],

      masks: {
        input: "MM/dd/YYYY hh:mm A",
      },

      perPage: 10,
      currentPage: 1,

      filter: "",
      filtered: items,

      fieldErrorMessage: "This field is required.",

      viewMode: false,

      editedItemId: null,
      editedItem: null,
      createdItem: {
        ...defaultItem,
        status: statusOptions[0].value,
        document: documentOptions[0].value
      },
      defaultItem,
    }
  },

  computed: {
    validateNameLength() {
      return this.createdItem.recipient_name.length > 0 ? true : this.fieldErrorMessage;
    },
    validatePurposeLength() {
      return this.createdItem.purpose.length > 0 ? true : this.fieldErrorMessage;
    },
    isNewData() {
      return Object.keys(this.createdItem)
        .every((key) => !!this.createdItem[key])
    },
    ...mapGetters("appointment", {
      appointment: "getAppointment",
      appointmentList: "getAppointmentList",
      appointmentNext: "getAppointmentNext",
      appointmentPrevious: "getAppointmentPrevious",
      appointmentCount: "getAppointmentCount",
      message: "getMessage",
    }),
    pages() {
      return (this.perPage && this.perPage !== 0)
        ? Math.ceil(this.appointmentCount / this.perPage)
        : this.filtered.length
    },
  },
  methods: {
    ...mapMutations("appointment", ["setAppointmentItem"]),

    resetEditedItem() {
      this.editedItem = null
      this.editedItemId = null
    },
    resetCreatedItem() {
      this.createdItem = { ...defaultItem }
    },
    addNewItem() {
      const formData = new FormData()
      formData.append("government_id", this.createdItem.government_id[0])
      formData.append("purpose", this.createdItem.purpose)
      formData.append("recipient_name", this.createdItem.recipient_name)
      formData.append("start_appointment", this.createdItem.start_appointment.toISOString())
      formData.append("status", this.statusValue.value)
      formData.append("document", this.documentValue.value)

      this.createAppointment(formData)
        .then((appointment) => {
          Swal.fire({
            title: "Success",
            text: "Appointment has been created.",
            icon: "success",
            timer: 2500,
            showConfirmButton: false,
          })
          this.setAppointmentItem(appointment)
        })
        .catch((error) => {
          Swal.fire({
            title: "Error",
            html: `Appointment has not been created. <br> ${error.message}`,
            icon: "error",
            timer: 2500,
            showConfirmButton: false,
          })
        })
      this.resetCreatedItem()
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
      })
        .then((result) => {
          if (!result.isConfirmed) { return; }

          const appointment = this.items[id];
          this.deleteAppointment(appointment.id)
          .then(() => {
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
          })
          .catch((error) => {
            Swal.fire({
              title: "Error",
              html: `Appointment has not been deleted.<br>${error.message}`,
              icon: "error",
              timer: 2500,
              showConfirmButton: false,
            })
          })
        })
    },
    viewItem(id) {
      this.viewMode = true
      this.editedItem = this.items[id]
      this.editedItemId = id
    },
    editItem() {
      this.editMode = true
      const id = this.items[this.editedItemId].id
      const status = this.editedItem.status.value
      this.editedItem.status = this.editedItem.status.text

      this.updateStatus({
        id: id,
        status: status,
      })
        .then(() => {
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
        })
        .catch((error) => {
          Swal.fire({
            title: "Error!",
            html: `Status has not been updated. <br>${error.message}`,
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
          })
        })
    },
    openModalToEditItemById(id) {
      this.editedItemId = id
      this.editedItem = { ...this.items[id] }
      this.viewMode = false
    },
    ...mapActions("appointment", {
      getAppointmentList: "getAppointmentList",
      createAppointment: "createAppointment",
      updateStatus: "updateAppointmentStatus",
      deleteAppointment: "deleteAppointment",
    }),
  },

  watch: {
    appointmentList: {
      handler(newValue) {
        if (newValue) {
          this.items = newValue;
        }
      },
      immediate: true,
    },
    appointment: {
      handler(newValue) {
        if (newValue) {
          this.items = [newValue, ...this.items];
        }
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.start-appointment {
  display: flex;
  align-items: center;
  justify-content: center;
}

.table--pagination {
  margin-top: 1rem;
  text-align: center;
  text-align: -moz-center;
  text-align: -webkit-center;
}

.add-appointment {
  margin: 20px;
}
</style>
