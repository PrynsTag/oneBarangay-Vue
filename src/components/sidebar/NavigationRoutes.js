export default {
  root: {
    name: "/",
    displayName: "navigationRoutes.home",
  },
  routes: [
    {
      name: "dashboard",
      displayName: "menu.dashboard",
      meta: {
        icon: "vuestic-iconset-statistics",
      },
    },
    {
      name: "appointment",
      displayName: "Appointment",
      meta: {
        icon: "vuestic-iconset-dashboard",
      },
    },
    {
      name: "announcement-list",
      displayName: "Announcement",
      meta: {
        icon: "vuestic-iconset-files",
      },
    },
    {
      name: "rbi-list",
      displayName: "Record of Barangay Indigency",
      meta: {
        icon: "vuestic-iconset-maps",
      },
    },
  ],
}
