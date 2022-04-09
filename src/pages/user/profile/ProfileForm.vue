<template>
  <va-card class="mb-4">
    <va-card-title>General Information</va-card-title>
    <div v-if="!editMode">
      <va-button @click="editMode = !editMode" class="action-button mr-4" :rounded="false" outline icon="edit"/>
    </div>
    <div v-else>
      <va-button @click="editMode = !editMode" class="action-button mr-4" :rounded="false" outline icon="eye"/>
    </div>

    <va-card-content>
      <va-form
        tag="form"
        @submit.prevent="onSubmit"
      >
        <div class="row">
          <va-input
            class="flex xs12 sm6 lg4"
            v-model="form.firstName"
            label="First Name"
            placeholder="First Name"
            disabled
          />
          <va-input
            class="flex xs12 sm6 lg4"
            v-model="form.middleName"
            label="Middle Name"
            placeholder="Middle Name"
            disabled
          />
          <va-input
            class="flex xs12 sm6 lg4"
            v-model="form.lastName"
            label="Last Name"
            placeholder="Last Name"
            disabled
          />
        </div>
        <div class="row">
          <va-date-input
            class="flex xs12 sm6 lg4"
            v-model="form.birthday"
            label="Birthday"
            placeholder="mm/dd/yyyy"
            disabled
          />
          <va-select
            class="flex xs12 sm6 lg4"
            label="Gender"
            :options="genderOptions"
            :value-by="(option) => option.value"
            v-model="form.gender"
            disabled
          />
          <!--            :rules="[validateGender]"-->
          <!--            :success="validateGender === true"-->
          <va-select
            class="flex xs12 sm6 lg4"
            label="Civil Status"
            :options="civilStatusOptions"
            v-model="form.civil_status"
            :value-by="(option) => option.value"
            :disabled="!editMode"
          />
          <!--            :rules="[validateCivilStatus]"-->
          <!--            :success="validateCivilStatus === true"-->
        </div>
        <div class="row">
          <va-input
            class="flex xs12 sm6 lg4"
            v-model="form.age"
            label="Age"
            placeholder="Age"
            disabled
          />
          <va-input
            class="flex xs12 sm6 lg4"
            v-model="form.address"
            label="Address"
            placeholder="Address"
            :disabled="!editMode"
          />
          <va-input
            class="flex xs12 sm6 lg4"
            v-model="form.contactNumber"
            label="Contact Number"
            placeholder="9## ### ####"
            :rules="[validateMobile]"
            :mask="{blocks: [3, 3, 4], delimiters: ['-']}"
            :disabled="!editMode"
          >
            <template #prependInner>
              <va-chip :rounded="false" outline square icon="dialpad">+63</va-chip>
            </template>
          </va-input>
        </div>

        <div class="col">
          <va-switch
            left-label
            v-model="isSubscribe"
            label="Subscribe to Notification?"
            size="small"
            true-inner-label="Yes!"
            false-inner-label="No."
            :disabled="!editMode"
            @update:model-value="isSubscribe ? onSubscribe() : onUnSubscribe()"
          />

          <va-button
            id="submit-button"
            class="d-block ml-auto"
            type="submit"
            :rounded="false"
            :disabled="!editMode"
            :hidden="!editMode"
            icon="save"
          >
            Save
          </va-button>
        </div>
      </va-form>
    </va-card-content>
  </va-card>
</template>

<script>
import { VaCard, VaCardTitle, VaCardContent, VaForm, VaInput, VaDateInput, VaSelect, VaButton, VaChip, VaSwitch } from "vuestic-ui";
import { mapActions, mapGetters, mapMutations } from "vuex";
import Swal from "sweetalert2";

export default {
  name: "ProfileForm",
  components: {
    VaCard,
    VaCardTitle,
    VaCardContent,
    VaForm,
    VaInput,
    VaDateInput,
    VaSelect,
    VaButton,
    VaChip,
    VaSwitch
  },
  data() {
    const civilStatusOptions = [
      {
        text: "Single",
        value: "SI"
      },
      {
        text: "Married",
        value: "MD"
      },
      {
        text: "Widowed",
        value: "WD"
      },
      {
        text: "Separated",
        value: "SP"
      },
      {
        text: "Divorced",
        value: "DV"
      },
      {
        text: "Cohabiting",
        value: "CH"
      },
    ]
    const genderOptions = [
      {
        text: "Male",
        value: "M"
      },
      {
        text: "Female",
        value: "F"
      },
      {
        text: "Non-binary",
        value: "N"
      },
      {
        text: "Others",
        value: "O"
      },
    ]
    const profile = {
      created_at: "",
      updated_at: "",
      name: "",
      email: "",
      profile_image: "",
      age: 0,
      birth_place: "",
      birth_date: "",
      civil_status: "",
      address: "",
      phone_number: "+63",
    }

    return {
      genderOptions,
      civilStatusOptions,
      profile,
      editMode: false,
      isSubscribe: false,
      userId: null,
      form: {
        firstName: "John",
        middleName: "Doe",
        lastName: "Smith",
        birthday: "",
        gender: "",
        civil_status: "",
        contactNumber: "",
        age: 1
      }
    };
  },
  mounted() {
    this.getProfile()
      .then((res) => {
        this.setProfile(res)
      }).catch(error => {
        console.log(error)
      })
    this.getNotificationByAuthenticated()
  },
  methods: {
    ...mapActions("user", ["getProfile", "updateProfile"]),
    ...mapMutations("user", ["setProfile"]),
    ...mapActions("notification", ["subscribeToNotifications", "unsubscribeFromNotifications", "getNotificationByAuthenticated"]),

    onSubmit() {
      const contactNumber = `+63${this.form.contactNumber}`
      delete this.form.contactNumber
      this.updateProfile({ ...this.form, phone: contactNumber, username: this.getUserName })
        .then((res) => {
          Swal.fire({
            title: "Success!",
            text: "Profile updated successfully!",
            icon: "success",
            timer: 2500,
            showConfirmButton: false
          })
          this.setProfile(res)
        }).catch(error => {
          console.log(error)
        })
    },
    onSubscribe() {
      this.subscribeToNotifications(this.getUserName)
    },
    onUnSubscribe() {
      this.unsubscribeFromNotifications()
    },
  },
  computed: {
    ...mapGetters("user", ["profileData", "getUserName"]),
    ...mapGetters("notification", {
      registrationToken: "getRegistrationToken",
    }),
    validateMobile() {
      const emailRegex = /^\d{10}$/
      return emailRegex.test(this.form.contactNumber) ? true : "Enter a valid mobile number.";
    },
  },
  watch: {
    profileData: {
      handler(newValue) {
        if (newValue.first_name) {
          this.form.firstName = newValue.first_name;
          this.form.middleName = newValue.middle_name;
          this.form.lastName = newValue.last_name;
          this.form.birthday = new Date(newValue.birth_date);
          this.form.age = newValue.age;
          this.form.address = newValue.address;
          this.form.contactNumber = newValue.phone_number.slice(3);
          this.form.civil_status = newValue.civil_status;
          this.form.gender = newValue.gender
        }
      },
      immediate: true,
    },
    registrationToken: {
      handler(newValue) {
        if (newValue) { this.isSubscribe = !!newValue }
      },
      immediate: true,
    }
  }
}
</script>

<style scoped>
.action-button {
  margin-top: 25px;
  margin-right: 10px;
  position: absolute;
  top: 0;
  right: 0;
}
</style>
