<template>
  <Base/>
  <body>
    <TopNavigation/>
    <!-- Start Banner Hero -->
    <div class="banner-wrapper bg-light">
      <div id="index_banner" class="banner-vertical-center-index container-fluid pt-5">

        <!-- Start slider -->
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
          <ol class="carousel-indicators">
            <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"></li>
            <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
            <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="py-5 row d-flex align-items-center text-white">
                <div class="banner-content col-lg-8 col-8 offset-2 m-lg-auto text-left py-5 pb-5">
                  <h1 class="banner-heading h1 text-black display-3 mb-0 pb-5 mx-0 px-0 light-300 typo-space-line text-white">
                    <strong>LOOK:</strong> A week ago,
                    <br>the Commission on Audit
                  </h1>
                  <p class="banner-body text-black py-3 mx-0 px-0">
                    Valenzuela conducted a 5-Day Training-Seminar on the Handbook of Financial
                    Transactions of the Sangguniang Kabataan. SKC Mark and SKT Jesa attended and
                    completed the said event. The lectures and workshops enables the SK to transact
                    properly and independently their finances and be knowledgeable regarding their
                    budget reports.
                    Thank you to Ma'am Emy, Sir Joey, Ma'am Abi, Ma'am Jill at Ma'am Kath for patiently
                    teaching the 33 Barangay-SKs of Valenzuela.
                  </p>
                  <router-link to="/home" class="banner-button btn rounded-pill btn-primary btn-lg px-4" role="button">View</router-link>
                </div>
              </div>

            </div>
            <div class="carousel-item">
              <div class="py-5 row d-flex align-items-center">
                <div class="banner-content col-lg-8 col-8 offset-2 m-lg-auto text-left py-5 pb-5">
                  <h1 class="banner-heading h1 text-white display-3 mb-0 pb-3 mx-0 px-0 light-300">
                    Pagdiriwang ng Kapistahan ni SanDiego deAlcala
                  </h1>
                  <p class="banner-body text-white py-3">
                    Nakikiisa ang Pamahalaang Lungsod ng Valenzuela sa pagdiriwang ng Pistang Bayan 2021
                    ngayong ika-398 Taon na Kapistahan ng Parokya at Mahal na Patron San Diego de
                    Alcala.
                    Maligaya at ligtas na pagdiriwang ng kapistahan ni San Diego de Alcala!
                  </p>
                  <a class="banner-button btn rounded-pill btn-light btn-lg px-4" href="#"
                    role="button">View</a>
                </div>
              </div>

            </div>
            <div class="carousel-item">

              <div class="py-5 row d-flex align-items-center">
                <div class="banner-content col-lg-8 col-8 offset-2 m-lg-auto text-left py-5 pb-5">
                  <h1 class="banner-heading h1 text-white display-3 mb-0 pb-3 mx-0 px-0 light-300">
                    MALANDAY sa Makabagong 'Letras Y Figuras'
                  </h1>
                  <p class="banner-body text-white py-3">
                    Sa pinagsama-samang ideya ng SK Malanday ay muli natin binigyang kulay sa
                    pamamagitan sining ang ating kapaligiran. Iniangkop natin sa bawat letra ang
                    sumisimbolo sa payak na barangay ng Malanday dito sa Lungsod ng Valenzuela.

                    Iba-iba man ang sukat at laki, pero iisang obra, anyo at ganda. Sana po ay maibigan
                    ninyo. ❤
                    #ExperienceMalanday
                  </p>
                  <a class="banner-button btn rounded-pill btn-light btn-lg px-4" href="#"
                    role="button">View</a>
                </div>
              </div>

            </div>
          </div>
          <a class="carousel-control-prev text-decoration-none" href="#carouselExampleIndicators" role="button"
            data-bs-slide="prev">
            <i class='bx bx-chevron-left'></i>
            <span class="visually-hidden">Previous</span>
          </a>
          <a class="carousel-control-next text-decoration-none" href="#carouselExampleIndicators" role="button"
            data-bs-slide="next">
            <i class='bx bx-chevron-right'></i>
            <span class="visually-hidden">Next</span>
          </a>
        </div>
        <!-- End slider -->

      </div>
    </div>
    <!-- End Banner Hero -->


    <!-- Start Service -->
    <section class="service-wrapper py-3">
      <div class="container-fluid pb-3">
        <div class="row">
          <h2 class="h2 text-center col-12 py-5 semi-bold-600">Announcement</h2>
          <div class="service-header col-2 col-lg-3 text-end light-300">
            <i class='bx bxs-megaphone h3 mt-1'></i>

          </div>
          <div class="service-heading col-10 col-lg-9 text-start float-end light-300">
            <h2 class="h3 pb-4 typo-space-line">Advisory: Alert Level 2</h2>
          </div>
        </div>
        <p class="service-footer col-10 offset-2 col-lg-9 offset-lg-3 text-start pb-3 text-muted px-2">
          The Inter-Agency Task Force (IATF) on Thursday, November 4, 2021, approved the de-escalation of the
          National Capital Region to Alert Level 2, according to Presidential Spokesperson Harry Roque.
          <br/>
          <br/>
          This shall take effect beginning tomorrow, November 5, 2021 until November 21, 2021.
        </p>
      </div>

      <div class="service-tag py-5 bg-dark">
        <div class="col-md-12">
          <ul class="nav d-flex justify-content-center">
            <li class="nav-item mx-lg-4">
              <a class="filter-btn nav-link btn-outline-primary active shadow rounded-pill text-light px-4 light-300"
                href="#" data-filter=".project">All</a>
            </li>
            <li class="nav-item mx-lg-4">
              <a class="filter-btn nav-link btn-outline-primary rounded-pill text-light px-4 light-300"
                id="events" data-filter=".event">Events</a>
            </li>
            <li class="filter-btn nav-item mx-lg-4">
              <a class="filter-btn nav-link btn-outline-primary rounded-pill text-light px-4 light-300"
                id="news" data-filter=".news">News</a>
            </li>
            <li class="nav-item mx-lg-4">
              <a class="filter-btn nav-link btn-outline-primary rounded-pill text-light px-4 light-300"
                id="project" data-filter=".branding">Project</a>
            </li>
          </ul>
        </div>
      </div>

    </section>

    <section class="container overflow-hidden py-5">
      <div class="row gx-5 gx-sm-3 gx-lg-5 gy-lg-5 gy-3 pb-3 projects">

        <!-- Start Recent Work -->
        <div class="col-xl-3 col-md-4 col-sm-6 project news branding">
          <a href="#" class="service-work card border-0 text-white shadow-sm overflow-hidden mx-5 m-sm-0">
            <img class="service card-img" :src="news1" alt="Card image">
            <div class="service-work-vertical card-img-overlay d-flex align-items-end">
              <div class="service-work-content text-left text-light">
                <p class="card-text">PAALALA, simula ngayong araw ay muling sumailalim sa ECQ ang buong Metro Manila, kabilang ang Valenzuela City. </p>
              </div>
            </div>
          </a>
        </div><!-- End Recent Work -->

        <!-- Start Recent Work -->
        <div class="col-xl-3 col-md-4 col-sm-6 project news event">
          <a href="#" class="service-work card border-0 text-white shadow-sm overflow-hidden mx-5 m-sm-0">
            <img class="card-img" :src="event1" alt="Card image">
            <div class="service-work-vertical card-img-overlay d-flex align-items-end">
              <div class="service-work-content text-left text-light">
                <p class="card-text">Panatilihin po natin ang pagsunod sa mga safe and health protocols ayon
                  sa IATF!</p>
              </div>
            </div>
          </a>
        </div><!-- End Recent Work -->

        <!-- Start Recent Work -->
        <div class="col-xl-3 col-md-4 col-sm-6 project branding">
          <a href="#" class="service-work card border-0 text-white shadow-sm overflow-hidden mx-5 m-sm-0">
            <img class="card-img" :src="business1" alt="Card image">
            <div class="service-work-vertical card-img-overlay d-flex align-items-end">
              <div class="service-work-content text-left text-light">
                <p class="card-text">#QuaranSing! 🎤
                  This Online Singing Contest is part of the 2020 Sharing is Caring Program of SK
                  Malanday. A virtual activity that would amplify our kabarangay's talent in singing and
                  performing.
                </p>
              </div>
            </div>
          </a>
        </div><!-- End Recent Work -->

        <!-- Start Recent Work -->
        <div class="col-xl-3 col-md-4 col-sm-6 project news event">
          <a href="#" class="service-work card border-0 text-white shadow-sm overflow-hidden mx-5 m-sm-0">
            <img class="card-img" :src="events2" alt="Card image">
            <div class="service-work-vertical card-img-overlay d-flex align-items-end">
              <div class="service-work-content text-left text-light">
                <p class="card-text">#VCVax Update: Hindi makarehistro online? Pwede nang mag-REGISTER at
                  magpaBAKUNA ON-SITE simula Oktubre 18 hanggang Oktubre 30, 2021 sa Valenzuela City
                  People's Park Amphitheater! 💉</p>
              </div>
            </div>
          </a>
        </div><!-- End Recent Work -->

        <!-- Start Recent Work -->
        <div class="col-xl-3 col-md-4 col-sm-6 project news event">
          <a href="#" class="service-work card border-0 text-white shadow-sm overflow-hidden mx-5 m-sm-0">
            <img class="card-img" :src="events1" alt="Card image">
            <div class="service-work-vertical card-img-overlay d-flex align-items-end">
              <div class="service-work-content text-left text-light">
                <p class="card-text">NOW HIRING!!!!
                  for McDonald's Malanday
                  You can submit your Resume at McDonald's Tres Picos & McDonald's Valenzuela South.</p>
              </div>
            </div>
          </a>
        </div><!-- End Recent Work -->

        <!-- Start Recent Work -->
        <div class="col-xl-3 col-md-4 col-sm-6 project branding">
          <a href="#" class="service-work card border-0 text-white shadow-sm overflow-hidden mx-5 m-sm-0">
            <img class="card-img" :src="project2" alt="Card image">
            <div class="service-work-vertical card-img-overlay d-flex align-items-end">
              <div class="service-work-content text-left text-light">
                <p class="card-text">Kamahal-mahal ka! Hindi ka nag-iisa!
                  #LoveWins #SharewithPride #PrideMonth2021</p>
              </div>
            </div>
          </a>
        </div><!-- End Recent Work -->

        <!-- Start Recent Work -->
        <div class="col-xl-3 col-md-4 col-sm-6 project branding">
          <a href="#" class="service-work card border-0 text-white shadow-sm overflow-hidden mx-5 m-sm-0">
            <img class="card-img" :src="project2" alt="Card image">
            <div class="service-work-vertical card-img-overlay d-flex align-items-end">
              <div class="service-work-content text-left text-light">
                <p class="card-text">Congratulations, SK Chairman Mark Dela Cruz, 2021 Gawad Dr. Pio
                  Valenzuela Awardee for Youth Leadership and Mr. Delfin Gutierrez, 2021 Gawad Dr. Pio
                  Valenzuela Awardee for Cultural Heritage!</p>
              </div>

            </div>
          </a>
        </div><!-- End Recent Work -->

        <!-- Start Recent Work -->
        <div class="col-xl-3 col-md-4 col-sm-6 project news graphic branding">
          <a href="#" class="service-work card border-0 text-white shadow-sm overflow-hidden mx-5 m-sm-0">
            <img class="card-img" :src="news1" alt="Card image">
            <div class="service-work-vertical card-img-overlay d-flex align-items-end">
              <div class="service-work-content text-left text-light">
                <p class="card-text">
                  Cash Assistance Beneficiaries (AUG 20,2021, MALANDAY BATCH 4)

                  PAUNAWA: Batch 4 pa lang po ito.

                  Kung ikaw ay wala sa listahan na ito, antabayanan ang mga susunod na batch ng list of
                  beneficiaries na aming ia-upload.
                </p>
              </div>
            </div>
          </a>
        </div><!-- End Recent Work -->

      </div>
    </section>
    <!-- End Service -->


    <!-- Start View Work -->
    <section class="bg-dark">
      <div class="container py-5">
        <div class="row d-flex justify-content-center text-center">
          <div class="col-lg-2 col-12 text-light align-items-center">
            <i class='display-1 bx bxs-mobile bx-lg'></i>
          </div>
          <div class="col-lg-7 col-12 text-light pt-2">
            <h3 class="h4 light-300">Our app is now available on Google Play.</h3>
            <p class="light-300">Get our app now!.</p>
          </div>
          <div class="col-lg-3 col-12 pt-4">
            <a href="#" class="btn btn-primary rounded-pill btn-block shadow px-4 py-2">Download now</a>
          </div>
        </div>
      </div>
    </section>
    <!-- End View Work -->

    <!-- Start Recent Work -->
    <section class="py-5 mb-5">
      <div class="container">
        <div class="recent-work-header row text-center pb-5">
          <h2 class="col-md-6 m-auto h2 semi-bold-600 py-5">E-SERVICES</h2>
        </div>

        <div class="row gy-5 g-lg-5 mb-4">
          <!-- Start Recent Work -->
          <div class="col-md-4 mb-3">
            <a href="#" class="recent-work card border-0 shadow-lg overflow-hidden">
              <img class="recent-work-img card-img" :src="recentWork1"
                alt="Card image">
              <div class="recent-work-vertical card-img-overlay d-flex align-items-end">
                <div class="recent-work-content text-start mb-3 ml-3 text-dark">
                  <h3 class="card-title light-300">Request Document</h3>
                  <p class="card-text">Ullamco laboris nisi ut aliquip ex</p>
                </div>
              </div>
            </a>
          </div><!-- End Recent Work -->

          <!-- Start Recent Work -->
          <div class="col-md-4 mb-3">
            <a href="#" class="recent-work card border-0 shadow-lg overflow-hidden">
              <img class="recent-work-img card-img" :src="recentWork2"
                alt="Card image">
              <div class="recent-work-vertical card-img-overlay d-flex align-items-end">
                <div class="recent-work-content text-start mb-3 ml-3 text-dark">
                  <h3 class="card-title light-300">File Complaint</h3>
                  <p class="card-text">Psum officia anim id est laborum.</p>
                </div>
              </div>
            </a>
          </div>
          <!-- End Recent Work -->

          <!-- Start Recent Work -->
          <div class="col-md-4 mb-3">
            <a href="#" class="recent-work card border-0 shadow-lg overflow-hidden">
              <img class="recent-work-img card-img" :src="recentWork4"
                alt="Card image">
              <div class="recent-work-vertical card-img-overlay d-flex align-items-end">
                <div class="recent-work-content text-start mb-3 ml-3 text-dark">
                  <h3 class="card-title light-300">Public Relation</h3>
                  <p class="card-text">Lorem ipsum dolor sit amet</p>
                </div>
              </div>
            </a>
          </div>
          <!-- End Recent Work -->

          <div class="row justify--center">
            <!-- Start Recent Work -->
            <div class="col-md-4 mb-3">
              <a href="#" class="recent-work card border-0 shadow-lg overflow-hidden">
                <img class="recent-work-img card-img" :src="recentWork5"
                  alt="Card image">
                <div class="recent-work-vertical card-img-overlay d-flex align-items-end">
                  <div class="recent-work-content text-start mb-3 ml-3 text-dark">
                    <h3 class="card-title light-300">RBI Registration</h3>
                    <p class="card-text">Put enim ad minim veniam</p>
                  </div>
                </div>
              </a>
            </div><!-- End Recent Work -->

            <!-- Start Recent Work -->
            <div class="col-md-4 mb-3">
              <a href="#" class="recent-work card border-0 shadow-lg overflow-hidden">
                <img class="recent-work-img card-img" :src="recentWork6"
                  alt="Card image">
                <div class="recent-work-vertical card-img-overlay d-flex align-items-end">
                  <div class="recent-work-content text-start mb-3 ml-3 text-dark">
                    <h3 class="card-title light-300">Schedule Appointments</h3>
                    <p class="card-text">Mollit anim id est laborum.</p>
                  </div>
                </div>
              </a>
            </div>
            <!-- End Recent Work -->
          </div>
        </div>
      </div>
    </section>
    <!-- End Recent Work -->
    <Footer/>
  </body>
</template>

<script>
import Base from "./Base"
import TopNavigation from "./TopNavigation"
import Footer from "./Footer"

import recentWork1 from "../../assets/images/home/recent-work-01.jpg"
import recentWork2 from "../../assets/images/home/recent-work-02.jpg"
import recentWork3 from "../../assets/images/home/recent-work-03.jpg"
import recentWork4 from "../../assets/images/home/recent-work-04.jpg"
import recentWork5 from "../../assets/images/home/recent-work-05.jpg"
import recentWork6 from "../../assets/images/home/recent-work-06.jpg"
import news1 from "../../assets/images/home/news-1.jpg"
import project2 from "../../assets/images/home/project-2.jpg"
import events1 from "../../assets/images/home/events-1.jpg"
import events2 from "../../assets/images/home/event-2.png"
import business1 from "../../assets/images/home/business-1.jpg"
import event1 from "../../assets/images/home/event-1.png"

export default {
  name: "Home",
  components: {
    Base,
    TopNavigation,
    Footer,
  },
  data() {
    return {
      recentWork1,
      recentWork2,
      recentWork3,
      recentWork4,
      recentWork5,
      recentWork6,
      news1,
      project2,
      events1,
      events2,
      business1,
      event1
    }
  }
}
</script>

<style scoped>

</style>
