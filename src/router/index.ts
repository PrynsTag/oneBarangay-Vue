import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AuthLayout from "@/layout/auth-layout.vue";
import AppLayout from "@/layout/app-layout.vue";
import Page404Layout from "@/layout/page-404-layout.vue";
import RouteViewComponent from "./route-view.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:catchAll(.*)",
    redirect: { name: "home" },
  },
  {
    name: "index",
    path: "",
    component: RouteViewComponent,
    children: [
      {
        name: "home",
        path: "",
        component: () => import("@/pages/home/Home.vue"),
      },
      {
        name: "government",
        path: "government",
        component: () => import("@/pages/home/Government.vue"),
      },
    ]
  },
  {
    name: "admin",
    path: "/admin",
    component: AppLayout,
    children: [
      {
        name: "dashboard",
        path: "dashboard",
        component: () => import("@/pages/admin/dashboard/Dashboard.vue"),
      },
      {
        name: "appointment",
        path: "appointment",
        component: () => import("@/pages/admin/appointment/Appointment.vue"),
      },
      {
        name: "announcement",
        path: "announcement",
        component: RouteViewComponent,
        children: [
          {
            name: "announcement-list",
            path: "list",
            component: () => import("@/pages/admin/announcement/AnnouncementList.vue"),
          },
          {
            name: "announcement-create",
            path: "create",
            component: () => import("@/pages/admin/announcement/AnnouncementCreate.vue"),
          },
          {
            name: "announcement-edit",
            path: "edit/:slug",
            component: () => import("@/pages/admin/announcement/AnnouncementEdit.vue"),
          },
        ],
      },
      {
        name: "rbi",
        path: "rbi",
        component: RouteViewComponent,
        children: [
          {
            name: "rbi-list",
            path: "list",
            component: () => import("@/pages/admin/rbi/RbiList.vue"),
          },
          {
            name: "rbi-create",
            path: "create",
            component: () => import("@/pages/admin/rbi/RbiCreate.vue"),
          },
          {
            name: "rbi-edit",
            path: "edit/:id",
            component: () => import("@/pages/admin/rbi/RbiEdit.vue"),
          },
          {
            name: "rbi-view",
            path: "edit/:id",
            component: () => import("@/pages/admin/rbi/RbiEdit.vue"),
          },
        ]
      },
      {
        name: "profile",
        path: "profile/:username",
        component: () => import("@/pages/user/profile/Profile.vue"),
      },
    ],
  },
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        name: "login",
        path: "login",
        component: () => import("@/pages/auth/login/Login.vue"),
      },
      {
        name: "signup",
        path: "signup",
        component: () => import("@/pages/auth/signup/Signup.vue"),
      },
      {
        name: "verify-email",
        path: "verify-email/:key/",
        component: () => import("@/pages/auth/verify-email/VerifyEmail.vue"),
      },
      {
        name: "recover-password",
        path: "recover-password",
        component: () => import("@/pages/auth/recover-password/RecoverPassword.vue"),
      },
      {
        name: "reset-password",
        path: "reset-password/:uid/:token/",
        component: () => import("@/pages/auth/reset-password/ResetPassword.vue"),
      },
      {
        path: "",
        redirect: { name: "login" },
      },
    ],
  },
  {
    path: "/404",
    component: Page404Layout,
    children: [
      {
        name: "not-found-advanced",
        path: "not-found-advanced",
        component: () => import("@/pages/404-pages/VaPageNotFoundSearch.vue"),
      },
      {
        name: "not-found-simple",
        path: "not-found-simple",
        component: () => import("@/pages/404-pages/VaPageNotFoundSimple.vue"),
      },
      {
        name: "not-found-custom",
        path: "not-found-custom",
        component: () => import("@/pages/404-pages/VaPageNotFoundCustom.vue"),
      },
      {
        name: "not-found-large-text",
        path: "/pages/not-found-large-text",
        component: () => import("@/pages/404-pages/VaPageNotFoundLargeText.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  //  mode: process.env.VUE_APP_ROUTER_MODE_HISTORY === 'true' ? 'history' : 'hash',
  routes,
});

export default router;
