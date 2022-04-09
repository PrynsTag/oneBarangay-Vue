<template>
  <va-input
    class="my-4"
    label="Recipient Name"
    disabled
    v-model="form.recipient_name"
  />
  <va-input
    class="mb-4"
    disabled
    v-model="form.purpose"
    type="textarea"
    label="Purpose of Appointment*"
    autosize
  />
  <va-input
    disabled
    class="mb-4"
    label="Type of Document"
    v-model="form.document"
  />
  <va-select
    :disabled="isView"
    class="mb-4"
    label="Select Status *"
    clearable
    :options="statusOptions"
    v-model="form.status"
    :track-by="(option) => option.value"
    clearableIcon="cancel"
  />
  <va-input
    disabled
    class="mb-4"
    label="Scheduled Date"
    v-model="form.start_appointment"
  />
  <va-image
    disabled
    v-if="!!form.government_id"
    ratio="0.75"
    contain
    :src="form.government_id"
  >
    <template #error>
      Government I.D. not found!
    </template>
  </va-image>
</template>

<script>
import { VaInput, VaSelect, VaImage } from "vuestic-ui";

export default {
  name: "EditAppointmentForm",
  components: {
    VaInput,
    VaSelect,
    VaImage
  },
  props: {
    formData: {
      type: Object,
      required: true,
      default: () => ({})
    },
    itemId: {
      type: Number,
      required: true
    },
    isView: {
      type: Boolean,
      required: true
    }
  },
  mounted() {
    this.form = this.formData;
  },
  data() {
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
    return {
      statusOptions,
      form: this.formData,
      modal: null
    };
  },
}
</script>

<style scoped>

</style>
