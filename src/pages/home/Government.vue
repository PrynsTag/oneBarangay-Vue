<template>
  <Base/>
  <!-- Start Banner Hero -->
  <body>
    <TopNavigation/>

    <section class="bg-light w-100">
      <div class="container">
        <div class="row d-flex align-items-center py-5">
          <div class="col-lg-6 text-start">
            <h1 class="about-title h2 py-5 text-primary typo-space-line">Barangay Malanday</h1>
            <p class="light-300">
              Barangay Malanday is located in the City of Valenzuela, and its boundaries are: Brgy. Bancal,
              Meycauayan City, Bulacan in the North, Brgy. Dalandanan, Valenzuela City in the South, Brgy.
              Veinte Reales, Valenzuela City in the East and Brgy. Coloong, Valenzuela City in the West.
            </p>
          </div>
          <div class="col-lg-6">
            <img class="w-100" :src="AboutBarangay">
          </div>
        </div>
      </div>
    </section>
    <!-- End Banner Hero -->


    <!-- Start City Government Officials -->
    <section class="bg-light w-100">
      <div class="container py-4">
        <div class="pt-5 pb-3 d-lg-flex align-items-center gx-5">
          <div class="col-lg-3">
            <h2 class="h2 py-5 typo-space-line">City Government Officials</h2>
            <p class="text-muted light-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div class="col-lg-9 row">
            <div class="team-member col-md-6 d-flex justify-content-center align-items-center flex-column">
              <img class="team-member-img img-fluid rounded-circle p-6"
                :src="Rex"
                alt="Card image">
              <ul class="team-member-caption list-unstyled text-center pt-4 text-muted light-300">
                <li>HON. Rexlon T. Gatchalian</li>
                <li>Mayor, City of Valenzuela</li>
              </ul>
            </div>
            <div class="team-member col-md-6  d-flex justify-content-center align-items-center flex-column">
              <img class="team-member-img img-fluid rounded-circle p-6"
                :src="Borja"
                alt="Card image">
              <ul class="team-member-caption list-unstyled text-center pt-4 text-muted light-300">
                <li>HON. Lorena C. Natividad-Borja</li>
                <li>Vice Mayor, City of Valenzuela</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Team Member -->

    <!-- Start Local Government Officials -->
    <section class="local-gov-container bg-secondary py-3">
      <div class="container py-5">
        <h2 class="h2 text-light text-center py-5">Local Government Officials</h2>
        <div class="row text-center">
          <div class="col-md-3 mb-3">
            <div class="local-gov-card card partner-wap py-4">
              <div class="team-member d-flex justify-content-center align-items-center flex-column">
                <img class="team-member-img img-fluid rounded-circle p-6"
                  :src="Efren"
                  alt="Card image">
                <ul class="team-member-caption list-unstyled text-center pt-4 text-light light-300">
                  <li>HON. Efren S. Santiago</li>
                  <li>Punong Barangay</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <div class="local-gov-card card partner-wap py-4">
              <div class="team-member d-flex justify-content-center align-items-center flex-column">
                <img class="team-member-img img-fluid rounded-circle p-6"
                  :src="Mark"
                  alt="Card image">
                <ul class="team-member-caption list-unstyled text-center pt-4 text-light light-300">
                  <li>HON. Mark Angelo A. Dela Cruz</li>
                  <li>SK Chairperson</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <div class="local-gov-card card partner-wap py-4">
              <div class="team-member d-flex justify-content-center align-items-center flex-column">
                <img class="team-member-img img-fluid rounded-circle p-6"
                  :src="Jian"
                  alt="Card image">
                <ul class="team-member-caption list-unstyled text-center pt-4 text-light light-300">
                  <li>HON. Jianne Nicole G. Duque</li>
                  <li>SK Kagawad</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <div class="local-gov-card card partner-wap py-4">
              <div class="team-member d-flex justify-content-center align-items-center flex-column">
                <img class="team-member-img img-fluid rounded-circle p-6"
                  :src="Abi"
                  alt="Card image">
                <ul class="team-member-caption list-unstyled text-center pt-4 text-light light-300">
                  <li>HON. Abigail V. Jabel</li>
                  <li>SK Kagawad</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <div class="local-gov-card card partner-wap py-4">
              <div class="team-member d-flex justify-content-center align-items-center flex-column">
                <img class="team-member-img img-fluid rounded-circle p-6"
                  :src="James"
                  alt="Card image">
                <ul class="team-member-caption list-unstyled text-center pt-4 text-light light-300">
                  <li>HON. James Martin B. Caacbay</li>
                  <li>SK Kagawad</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <div class="local-gov-card card partner-wap py-4">
              <div class="team-member d-flex justify-content-center align-items-center flex-column">
                <img class="team-member-img img-fluid rounded-circle p-6"
                  :src="Angelo"
                  alt="Card image">
                <ul class="team-member-caption list-unstyled text-center pt-4 text-light light-300">
                  <li>HON. Angelo C. Taylo</li>
                  <li>SK Kagawad</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <div class="local-gov-card card partner-wap py-4">
              <div class="team-member d-flex justify-content-center align-items-center flex-column">
                <img class="team-member-img img-fluid rounded-circle p-6"
                  :src="Adel"
                  alt="Card image">
                <ul class="team-member-caption list-unstyled text-center pt-4 text-light light-300">
                  <li>HON. Adelbert John S. Santiago</li>
                  <li>SK Kagawad</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <div class="local-gov-card card partner-wap py-4">
              <div class="team-member d-flex justify-content-center align-items-center flex-column">
                <img class="team-member-img img-fluid rounded-circle p-6"
                  :src="Romel"
                  alt="Card image">
                <ul class="team-member-caption list-unstyled text-center pt-4 text-light light-300">
                  <li>HON. Romel R. Martin</li>
                  <li>SK Kagawad</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <div class="local-gov-card card partner-wap py-4">
              <div class="team-member d-flex justify-content-center align-items-center flex-column">
                <img class="team-member-img img-fluid rounded-circle p-6"
                  :src="Netha"
                  alt="Card image">
                <ul class="team-member-caption list-unstyled text-center pt-4 text-light light-300">
                  <li>HON. Nethacia P. Narvaja</li>
                  <li>SK Kagawad</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <div class="local-gov-card card partner-wap py-4">
              <div class="team-member d-flex justify-content-center align-items-center flex-column">
                <img class="team-member-img img-fluid rounded-circle p-6"
                  :src="Mara"
                  alt="Card image">
                <ul class="team-member-caption list-unstyled text-center pt-4 text-light light-300">
                  <li>HON. Mara Sindac</li>
                  <li>SK Secretary</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <div class="local-gov-card card partner-wap py-4">
              <div class="team-member d-flex justify-content-center align-items-center flex-column">
                <img class="team-member-img img-fluid rounded-circle p-6"
                  :src="Jesa"
                  alt="Card image">
                <ul class="team-member-caption list-unstyled text-center pt-4 text-light light-300">
                  <li>HON. Jesa May M. Bernales</li>
                  <li>SK Treasurer</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--End Our Partner-->


    <!-- Start Aim -->
    <section class="banner-bg bg-white py-5">
      <div class="container my-4">
        <div class="row text-center">

          <div class="objective col-lg-4">
            <div class="objective-icon card m-auto py-4 mb-2 mb-sm-4 shadow-lg">
              <i class="display-4 bx bxs-bulb text-light"></i>
            </div>
            <h2 class="objective-heading h3 mb-2 mb-sm-4 regular-400">Our Vision</h2>
            <p class="regular-400">
              Incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse commodo viverra.
            </p>
          </div>

          <div class="objective col-lg-4 mt-sm-0 mt-4">
            <div class="objective-icon card m-auto py-4 mb-2 mb-sm-4 bg-secondary shadow-lg">
              <i class='display-4 bx bx-revision text-light'></i>
            </div>
            <h2 class="objective-heading h3 mb-2 mb-sm-4 light-300">Our Mission</h2>
            <p class="light-300">
              Eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam quis.
            </p>
          </div>

          <div class="objective col-lg-4 mt-sm-0 mt-4">
            <div class="objective-icon card m-auto py-4 mb-2 mb-sm-4 bg-secondary shadow-lg">
              <i class="display-4 bx bxs-select-multiple text-light"></i>
            </div>
            <h2 class="objective-heading h3 mb-2 mb-sm-4 light-300">Our Goal</h2>
            <p class="light-300">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit,
              sed do eiusmod tempor.
            </p>
          </div>

        </div>
      </div>
    </section>
    <!-- End Aim -->

    <!-- Start Contact -->
    <section class="banner-bg bg-light py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 mx-auto my-4 p-3">
            <form action="#" method="get"><h1 class="h2 text-center">Any recommendations?</h1>
              <div class="input-group py-3">

                <input name="email" type="text"
                  class="form-control form-control-lg rounded-pill rounded-end" id="recommendation"
                  placeholder="Send your recommendation here..." aria-label="Send your recommendation">
                <button class="btn btn-send btn-secondary text-light btn-lg rounded-pill rounded-start px-lg-4"
                  type="submit">Send
                </button>
              </div>
              <p class="text-center light-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt labore et dolore magna aliqua.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
    <!-- End Contact -->

    <Footer/>
  </body>
</template>

<script>
import Base from "./Base.vue"
import TopNavigation from "./TopNavigation.vue"
import Footer from "./Footer.vue"

import AboutBarangay from "../../assets/images/government/about-barangay.jpg"
import Rex from "../../assets/images/government/rex.png"
import Borja from "../../assets/images/government/borja.png"
import Efren from "../../assets/images/government/efren.png"
import Mark from "../../assets/images/government/mark.png"
import Jian from "../../assets/images/government/jian.png"
import Abi from "../../assets/images/government/abi.png"
import James from "../../assets/images/government/james.png"
import Angelo from "../../assets/images/government/angelo.png"
import Adel from "../../assets/images/government/adel.png"
import Romel from "../../assets/images/government/romel.png"
import Netha from "../../assets/images/government/netha.png"
import Mara from "../../assets/images/government/mara.png"
import Jesa from "../../assets/images/government/jesa.png"

export default {
  name: "Government",
  components: {
    Base,
    TopNavigation,
    Footer
  },
  data() {
    return {
      AboutBarangay,
      Rex,
      Borja,
      Efren,
      Mark,
      Jian,
      Abi,
      James,
      Angelo,
      Adel,
      Romel,
      Netha,
      Mara,
      Jesa
    }
  }
}
</script>

<style scoped>

</style>
