<template>
  <nav id="main_nav" class="navbar navbar-expand-lg navbar-light bg-white shadow">
    <div class="container d-flex justify-content-between align-items-center">
      <router-link to="/home" class="navbar-brand h1 w-25">
        <span class="text-dark h4">
          <img id="test" class="w-100" src="@/assets/images/logo/apple-icon.png" alt="">
        </span>
      </router-link>
      <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbar-toggler-success" aria-controls="navbarSupportedContent"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between"
        id="navbar-toggler-success">
        <div class="flex-fill mx-xl-5 mb-2">
          <ul class="nav navbar-nav d-flex justify-content-end mx-xl-5 text-center text-dark">
            <li class="nav-item mx-2">
              <router-link to="/home" class="nav-link btn-outline-primary rounded-pill px-3">Home</router-link>
            </li>
            <li class="nav-item mx-2 mr-0">
              <router-link class="nav-link btn-outline-primary rounded-pill px-3" to="/government">Government
              </router-link>
            </li>
          </ul>
        </div>
        <div class="navbar align-self-center d-flex">
          <router-link to="/auth/login">
            <i class='login-icon bx bx-user-circle bx-sm text-dark'></i>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default { name: "TopNavigation" }
</script>

<style scoped>

</style>
