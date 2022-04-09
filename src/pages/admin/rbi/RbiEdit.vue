<template>
  <!-- Make two buttons in between -->
  <div class="right-btn" style="float: right;">
    <va-button
      class="mr-3"
      color="success"
      @click="viewMode = !viewMode"
    >

      <div v-if="viewMode">
        <va-icon name="edit"/>
        Edit
      </div>
      <div v-else>
        <va-icon name="eye"/>
        View
      </div>
    </va-button>
    <va-button
      class=""
      @click="addFamilyMember"
    >
      <va-icon name="add"/>
      Add Family Member
    </va-button>
  </div>

  <div class="left-btn" style="float: left;">
    <va-button
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
    class="rbi-card__form mt-5"
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
          :disabled="viewMode"
        />
        <va-input
          class="rbi-card__input"
          label="Street"
          v-model="street"
          :rules="[validateStreet]"
          :success="validateStreet === true"
          :disabled="viewMode"
        />
      </div>

      <div class="row">
        <va-input
          class="rbi-card__input"
          label="Family Name"
          v-model="family_name"
          :rules="[validateFamilyName]"
          :success="validateFamilyName === true"
          :disabled="viewMode"
        />
        <va-date-input
          class="rbi-card__input"
          label="Date Accomplished"
          v-model="date_accomplished"
          clearable
          :rules="[validateDateAccomplished]"
          :success="validateDateAccomplished === true"
          :disabled="viewMode"
        />
      </div>
    </va-card>

    <va-card
      v-for="(member, index) in fields"
      :key="index"
      class="rbi-card mt-4 pb-4"
    >
      <h1 class="text-center pa-3">Family {{ index >= 1 ? `Member ${index + 1}` : 'Head' }}</h1>
      <div class="row px-5 pt-3">
        <va-input
          class="rbi-card__input"
          label="First Name"
          v-model="member.first_name"
          :rules="[validateFirstName]"
          :success="validateFirstName === true"
          :disabled="viewMode"
        />
        <va-input
          class="rbi-card__input"
          label="Middle Name"
          v-model="member.middle_name"
          :rules="[validateMiddleName]"
          :success="validateMiddleName === true"
          :disabled="viewMode"
        />
        <va-input
          class="rbi-card__input"
          label="Last Name"
          v-model="member.last_name"
          :rules="[validateLastName]"
          :success="validateLastName === true"
          :disabled="viewMode"
        />
      </div>

      <div class="row px-5 py-2">
        <va-select
          class="rbi-card__input"
          label="Civil Status"
          :options="civilStatusOptions"
          v-model="member.civil_status"
          :value-by="(option) => option.value"
          :rules="[validateCivilStatus]"
          :success="validateCivilStatus === true"
          :disabled="viewMode"
        />
        <va-select
          class="rbi-card__input"
          label="Gender"
          :options="genderOptions"
          :value-by="(option) => option.value"
          v-model="member.gender"
          :rules="[validateGender]"
          :success="validateGender === true"
          :disabled="viewMode"
        />
        <va-input
          class="rbi-card__input"
          label="Citizenship"
          v-model="member.citizenship"
          :rules="[validateCitizenship]"
          :success="validateCitizenship === true"
          :disabled="viewMode"
        />
      </div>

      <div class="row px-5 py-2">
        <va-input
          class="rbi-card__input"
          label="Age"
          v-model.number="member.age"
          type="number"
          min="1"
          :rules="[validateAge]"
          :success="validateAge === true"
          :disabled="viewMode"
        />
        <va-date-input
          class="rbi-card__input"
          label="Birth Date"
          v-model="member.date_of_birth"
          clearable
          :rules="[validateDateOfBirth]"
          :success="validateDateOfBirth === true"
          :disabled="viewMode"
        />
        <va-input
          class="rbi-card__input"
          label="Birth Place"
          v-model="member.birth_place"
          :rules="[validateBirthPlace]"
          :success="validateBirthPlace === true"
          :disabled="viewMode"
        />
      </div>

      <div class="row px-5 py-2">
        <va-input
          class="rbi-card__input"
          label="Extension"
          v-model="member.extension"
          :rules="[validateExtension]"
          :success="validateExtension === true"
          :disabled="viewMode"
        />
        <va-input
          class="rbi-card__input"
          label="Monthly Income"
          v-model="member.monthly_income"
          mask="numeral"
          :rules="[validateMonthlyIncome]"
          :success="validateMonthlyIncome === true"
          :disabled="viewMode"
        />
        <va-input
          class="rbi-card__input"
          label="Remarks"
          v-model="member.remarks"
          :rules="[validateRemarks]"
          :success="validateRemarks === true"
          :disabled="viewMode"
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

  <va-modal ref="statefulModal" :message="message" stateful/>
</template>

<script>
import { VaForm, VaCard, VaInput, VaButton, VaIcon, VaSelect, VaModal } from "vuestic-ui";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "RbiEdit",
  components: {
    VaForm,
    VaCard,
    VaInput,
    VaButton,
    VaIcon,
    VaSelect,
    VaModal
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
    return {
      houseId: this.$route.params.id,
      houseItem: {},
      fields: [],
      viewMode: true,
      familyMemberForm: null,
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
      civilStatusOptions,
      genderOptions,
      defaultFamilyMember,
    };
  },
  mounted() {
    this.fetchHouseRecord(this.houseId);
    this.fetchFamilyRecord(this.houseId);
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
      return this.fields[this.familyMemberForm - 1].monthly_income >= 0 && !("monthly_income" in this.errors) ? true : "This field is required"
    },
    validateRemarks() {
      return this.fields[this.familyMemberForm - 1].remarks.length > 0 && !("remarks" in this.errors) ? true : "This field is required"
    },
    ...mapGetters("rbi", {
      houseData: "getHouseItem",
      familyList: "getFamilyList",
      familyCount: "getFamilyCount",
    }),
  },
  methods: {
    onsubmit() {
      if (!this.formReady) {
        return;
      }

      this.createHouseRecord({
        address: this.address,
        family_name: this.family_name,
        street: this.street,
        date_accomplished: this.date_accomplished.toISOString(),
      })
        .then((response) => {
          let birth_date;
          this.fields.forEach(field => {
            birth_date = field.date_of_birth.toISOString()
            delete field.date_of_birth;

            this.createFamilyRecord({
              ...field,
              date_of_birth: birth_date,
              house_record: response.house_id
            })
              .catch(error => {
                let errorObject = error.response.data;
                for (let key in errorObject) {
                  this.errors[key] = errorObject[key];
                }
              });
          });
          this.message = `${this.family_name}'s House Record with ${this.familyMemberForm} members has been successfully saved.`;
          this.$refs.statefulModal.show();
        })
        .catch(error => {
          let errorObject = error.response.data;
          for (let key in errorObject) {
            this.errors[key] = errorObject[key];
          }
          this.$refs.statefulModal.show();
        });

      this.fields = [this.defaultFamilyMember];
      this.familyMemberForm = 1;

      this.$router.push({ name: "rbi-list" });
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
    ...mapActions("rbi", [
      "fetchHouseRecord",
      "fetchFamilyRecord",
    ]),
  },
  watch: {
    houseData(newValue) {
      if (newValue) {
        this.house_id = newValue.id;
        this.family_name = newValue.family_name;
        this.address = newValue.address;
        this.street = newValue.street;
        this.date_accomplished = new Date(newValue.date_accomplished);
      }
    },
    familyList(newValue) {
      if (newValue) {
        newValue.map(family => {
          const date_of_birth = new Date(family.date_of_birth);
          this.fields.push({ ...family, "date_of_birth": date_of_birth });
        });
      }
    },
    family_name: {
      handler(family_name) {
        this.fields.forEach(field => {
          field.last_name = family_name;
        });
      },
      immediate: true
    },
    familyCount: {
      handler(newValue) {
        if (newValue) { this.familyMemberForm = newValue; }
      },
      immediate: true
    }
  },
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
    max-width: 230px;
  }
  .right-btn { float: right; }
  .left-btn { float: left; }
}
</style>
