<template>
  <!-- Make two buttons in between -->
  <div class="row mb-4">
    <va-button
      class="ml-auto"
      @click="addFamilyMember"
    >
      <va-icon name="add"/>
      Add Family Member
    </va-button>
    <va-button
      class=""
      color="danger"
      @click="removeFamilyMember"
      :disabled="familyMemberForm <= 1"
    >
      <va-icon name="delete"/>
      Remove Family Member
    </va-button>
  </div>
  <va-form
    tag="form"
    class="rbi-card__form"
    @submit.prevent="onsubmit()"
  >
    <va-card class="rbi-card pb-4">
      <h1 class="text-center pa-3">House Information</h1>
      <div class="row">
        <va-input
          class="rbi-card__input"
          label="Address"
          v-model="address"
          :rules="[validateAddress]"
          :success="validateAddress === true"
          style="max-width: 230px;"
        />
        <va-input
          class="rbi-card__input"
          label="Street"
          v-model="street"
          :rules="[validateStreet]"
          :success="validateStreet === true"
          style="max-width: 230px;"
        />
      </div>

      <div class="row">
        <va-input
          class="rbi-card__input"
          label="Family Name"
          v-model="family_name"
          :rules="[validateFamilyName]"
          :success="validateFamilyName === true"
          style="max-width: 230px;"
        />

        <va-date-input
          class="rbi-card__input"
          label="Date Accomplished"
          v-model="date_accomplished"
          clearable
          :rules="[validateDateAccomplished]"
          :success="validateDateAccomplished === true"
          style="max-width: 230px;"
        />
      </div>
    </va-card>

    <va-card
      v-for="(field, index) in fields"
      :key="index"
      class="rbi-card mt-4 pb-4"
    >
      <h1 class="text-center pa-3">Family {{ index >= 1 ? `Member ${index + 1}` : 'Head' }}</h1>
      <div class="row px-5 pt-3">
        <va-input
          class="rbi-card__input"
          label="First Name"
          v-model="field.first_name"
          :rules="[validateFirstName]"
          :success="validateFirstName === true"
          style="max-width: 230px;"
        />
        <va-input
          class="rbi-card__input"
          label="Middle Name"
          v-model="field.middle_name"
          :rules="[validateMiddleName]"
          :success="validateMiddleName === true"
          style="max-width: 230px;"
        />
        <va-input
          class="rbi-card__input"
          label="Last Name"
          v-model="field.last_name"
          :rules="[validateLastName]"
          :success="validateLastName === true"
          style="max-width: 230px;"
        />
      </div>

      <div class="row px-5 py-2">
        <va-select
          class="rbi-card__input"
          label="Civil Status"
          :options="civilStatusOptions"
          v-model="field.civil_status"
          :value-by="(option) => option.value"
          :rules="[validateCivilStatus]"
          :success="validateCivilStatus === true"
          style="max-width: 230px;"
        />
        <va-select
          class="rbi-card__input"
          label="Gender"
          :options="genderOptions"
          :value-by="(option) => option.value"
          v-model="field.gender"
          :rules="[validateGender]"
          :success="validateGender === true"
          style="max-width: 230px;"
        />
        <va-input
          class="rbi-card__input"
          label="Citizenship"
          v-model="field.citizenship"
          :rules="[validateCitizenship]"
          :success="validateCitizenship === true"
          style="max-width: 230px;"
        />
      </div>

      <div class="row px-5 py-2">
        <va-input
          class="rbi-card__input"
          label="Age"
          v-model.number="field.age"
          type="number"
          min="1"
          :rules="[validateAge]"
          :success="validateAge === true"
          style="max-width: 230px;"
        />
        <va-input
          class="rbi-card__input"
          label="Birth Place"
          v-model="field.birth_place"
          :rules="[validateBirthPlace]"
          :success="validateBirthPlace === true"
          style="max-width: 230px;"
        />
        <va-date-input
          class="rbi-card__input"
          label="Birth Date"
          v-model="field.date_of_birth"
          style="max-width: 230px;"
          clearable
          :rules="[validateDateOfBirth]"
          :success="validateDateOfBirth === true"
        />
      </div>

      <div class="row px-5 py-2">
        <va-input
          class="rbi-card__input"
          label="Extension"
          v-model="field.extension"
          :rules="[validateExtension]"
          :success="validateExtension === true"
          style="max-width: 230px;"
        />
        <va-input
          class="rbi-card__input"
          label="Monthly Income"
          v-model="field.monthly_income"
          mask="numeral"
          :rules="[validateMonthlyIncome]"
          :success="validateMonthlyIncome === true"
          style="max-width: 230px;"
        />
        <va-input
          class="rbi-card__input"
          label="Remarks"
          v-model="field.remarks"
          :rules="[validateRemarks]"
          :success="validateRemarks === true"
          style="max-width: 230px;"
        />
      </div>
    </va-card>

    <div class="rbi-card__submit">
      <va-button
        type="submit"
        :disabled="!formReady"
      >
        Submit
      </va-button>
    </div>
  </va-form>
</template>

<script>
import { VaForm, VaCard, VaInput, VaButton, VaIcon, VaDateInput, VaSelect } from "vuestic-ui";
import { mapActions, mapGetters, mapMutations } from "vuex";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default {
  name: "RbiCreate",
  components: {
    VaForm,
    VaCard,
    VaInput,
    VaButton,
    VaIcon,
    VaDateInput,
    VaSelect,
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

    const familyMemberForm = 1;
    const defaultFamilyMember = {
      first_name: "",
      middle_name: "",
      last_name: this.family_name,
      civil_status: "SI",
      gender: "",
      age: 1,
      birth_place: "",
      citizenship: "Filipino",
      date_of_birth: new Date(),
      extension: "",
      monthly_income: 0,
      remarks: "",
    }
    const fields = [defaultFamilyMember];
    return {
      // House Form
      address: "",
      family_name: "",
      street: "",
      date_accomplished: new Date(),
      house_id: null,
      masks: {
        input: "MM/dd/YYYY hh:mm A",
      },

      errors: {},
      message: "House Record Not Saved. Please Fix the Error Presented in the Form.",

      // Family Member Form
      fields,
      civilStatusOptions,
      genderOptions,
      defaultFamilyMember,

      familyMemberForm
    };
  },
  methods: {
    onsubmit() {
      if (!this.formReady) { return; }

      this.createHouseRecord({
        address: this.address,
        family_name: this.family_name,
        street: this.street,
        date_accomplished: this.date_accomplished.toISOString(),
      }).then((response) => {
        let birth_date;
        this.fields.forEach(field => {
          birth_date = field.date_of_birth.toISOString()
          delete field.date_of_birth;

          this.createFamilyRecord({
            ...field,
            date_of_birth: birth_date,
            house_record: response.house_id
          }).catch(error => {
            let errorObject = error.response.data;
            for (let key in errorObject) {
              this.errors[key] = errorObject[key];
            }
          });
        });
        Swal.fire({
          title: "Success!",
          text: `${response.family_name}'s House Record with ${this.fields.length} members has been Saved!`,
          icon: "success",
          timer: 2500,
          showConfirmButton: false
        }).then(() => {
          this.fields = [this.defaultFamilyMember];
          this.familyMemberForm = 1;
          this.setHouseItem(response);

          this.$router.push({ name: "rbi-list" });
        });
      }).catch(error => {
        Swal.fire({
          title: "Error!",
          text: "House Record Not Saved. Please Fix the Error Presented in the Form.",
          icon: "error",
          confirmButtonText: "OK"
        });

        let errorObject = error.response.data;
        for (let key in errorObject) {
          this.errors[key] = errorObject[key];
        }
      });
    },
    addFamilyMember() {
      this.familyMemberForm++
      this.fields.push(
        {
          first_name: "",
          middle_name: "",
          last_name: this.family_name,
          civil_status: "SI",
          gender: "",
          age: 1,
          birth_place: "",
          citizenship: "",
          date_of_birth: new Date(),
          extension: "",
          monthly_income: 0,
          remarks: "",
          house_record: this.house_id
        }
      )
    },
    removeFamilyMember() {
      this.familyMemberForm--;
      this.fields.pop();
    },
    ...mapActions("rbi", ["createHouseRecord", "createFamilyRecord"]),
    ...mapMutations("rbi", ["setHouseItem"])
  },
  computed: {
    formReady() {
      return this.validateFamilyName === true &&
        this.validateAddress === true &&
        this.validateStreet === true &&
        this.validateDateAccomplished === true &&
        this.validateFamilyMember === true &&
        this.validateFirstName === true &&
        this.validateMiddleName === true &&
        this.validateLastName === true &&
        this.validateCivilStatus === true &&
        this.validateGender === true &&
        this.validateAge === true &&
        this.validateBirthPlace === true &&
        this.validateCitizenship === true &&
        this.validateDateOfBirth === true &&
        this.validateExtension === true &&
        this.validateMonthlyIncome === true &&
        this.validateRemarks === true;
    },
    validateFamilyName() {
      return this.family_name.length > 0 && !("family_name" in this.errors) ? true : "This field is required";
    },
    validateAddress() {
      return this.address.length > 0 && !("address" in this.errors) ? true : "This field is required";
    },
    validateStreet() {
      return this.street.length > 0 && !("street" in this.errors) ? true : "This field is required";
    },
    validateDateAccomplished() {
      return this.date_accomplished && !("date_accomplished" in this.errors) ? true : "This field is required";
    },
    validateFamilyMember() {
      return this.familyMemberForm > 0 && !("familyMemberForm" in this.errors) ? true : "This field is required";
    },
    validateFirstName() {
      return this.fields[this.familyMemberForm - 1].first_name.length > 0 && !("first_name" in this.errors) ? true : "This field is required";
    },
    validateMiddleName() {
      return this.fields[this.familyMemberForm - 1].middle_name.length > 0 && !("middle_name" in this.errors) ? true : "This field is required";
    },
    validateLastName() {
      return this.fields[this.familyMemberForm - 1].last_name.length > 0 && !("last_name" in this.errors) ? true : "This field is required";
    },
    validateCivilStatus() {
      return this.fields[this.familyMemberForm - 1].civil_status.length > 0 && !("civil_status" in this.errors) ? true : "This field is required";
    },
    validateGender() {
      return this.fields[this.familyMemberForm - 1].gender.length > 0 && !("gender" in this.errors) ? true : "This field is required"
    },
    validateCitizenship() {
      return this.fields[this.familyMemberForm - 1].citizenship.length > 0 && !("citizenship" in this.errors) ? true : "This field is required"
    },
    validateAge() {
      return this.fields[this.familyMemberForm - 1].age > 0 && !("age" in this.errors) ? true : "This field should be greater than zero"
    },
    validateDateOfBirth() {
      return this.fields[this.familyMemberForm - 1].date_of_birth && !("date_of_birth" in this.errors) ? true : "This field is required"
    },
    validateBirthPlace() {
      return this.fields[this.familyMemberForm - 1].birth_place.length > 0 && !("birth_place" in this.errors) ? true : "This field is required"
    },
    validateExtension() {
      return this.fields[this.familyMemberForm - 1].extension.length > 0 && !("extension" in this.errors) ? true : "This field is required"
    },
    validateMonthlyIncome() {
      return this.fields[this.familyMemberForm - 1].monthly_income >=0 && !("monthly_income" in this.errors) ? true : "This field is required"
    },
    validateRemarks() {
      return this.fields[this.familyMemberForm - 1].remarks.length > 0 && !("remarks" in this.errors) ? true : "This field is required"
    },
    ...mapGetters("rbi", {
      houseItem: "getHouseItem",
    })
  },
  watch: {
    houseItem: {
      handler(houseItem) {
        if (houseItem) { this.house_id = houseItem.id; }
      },
      immediate: true
    },
    family_name: {
      handler(family_name) {
        this.fields.forEach(field => {
          field.last_name = family_name;
        });
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.rbi-card {
  margin: 0 auto;
  max-width: 800px;

  &__submit {
    text-align: right;
    margin: 1rem auto;
    max-width: 800px;
  }

  &__input, &__editor {
    margin: 0 auto;
    padding: 1rem 0;
    max-width: 400px;
  }
}
</style>
