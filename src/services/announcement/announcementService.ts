import api from "@/services/announcement/announcementApi";

export default {
  fetchAnnouncementList() {
    return api.get("/?limit=10&ordering=-created_at")
      .then(response => response.data);
  },
  fetchAnnouncement(slug: string) {
    return api.get(`/${slug}/`).then(response => response.data);
  },
  createAnnouncement(announcement: any) {
    return api.post("/", announcement)
      .then(response => response.data);
  },
  editAnnouncement(announcement: { slug: string } ) {
    const { slug } = announcement;
    delete announcement.slug;

    return api.patch(`/${slug}/`, announcement)
      .then(response => response.data);
  },
  deleteAnnouncementItem(id: number) {
    return api.delete(`/${id}/`)
      .then(response => response.data);
  }
}
