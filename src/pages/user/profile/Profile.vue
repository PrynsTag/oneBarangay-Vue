<template>
  <div class="row">
    <div class="flex xs12 lg8">
      <ProfileForm/>
      <ProfileAppointment/>
    </div>
    <div class="flex xs12 lg4">
      <ProfileCard/>
      <ProfilePhoto/>
    </div>
  </div>
</template>

<script>
import ProfileForm from "./ProfileForm.vue"
import ProfileAppointment from "./ProfileAppointment";
import ProfileCard from "./ProfileCard.vue";
import ProfilePhoto from "./ProfilePhoto.vue";

export default {
  name: "Profile",
  components: { ProfileAppointment, ProfileForm, ProfileCard, ProfilePhoto }
}
</script>

<style scoped>

</style>
