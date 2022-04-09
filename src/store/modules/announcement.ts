import announcementService from "@/services/announcement/announcementService";
import type { Commit } from "vuex";

type AnnouncementItem = {
  id: 0,
  tags: string,
  author: string,
  url: string,
  created_at: string,
  updated_at: string,
  title: string,
  content: string,
  is_featured: boolean,
  thumbnail: string,
  slug: string
};

type AnnouncementPayload = {
  announcementList: [];
  announcementCount: number;
  announcementNext: string;
  announcementPrevious: string;
}

const state = {
  announcementList: null,
  announcementCount: null,
  announcementNext: null,
  announcementPrevious: null,
  announcementItem: null,
}
const getters = {
  getAnnouncementList: (state: AnnouncementPayload): [] => { return state.announcementList },
  getAnnouncementCount: (state: AnnouncementPayload): number => { return state.announcementCount },
  getAnnouncementNext: (state: AnnouncementPayload): string => { return state.announcementNext },
  getAnnouncementPrevious: (state: AnnouncementPayload): string => { return state.announcementPrevious },
  getAnnouncementItem: (state: { announcementItem: AnnouncementItem }): AnnouncementItem => { return state.announcementItem },
}
const actions = {
  fetchAnnouncementList({ commit }: { commit: Commit }): void {
    announcementService.fetchAnnouncementList()
      .then(payload => {
        commit("setAnnouncementList", payload);
      });
  },
  fetAnnouncementItem({ commit }: { commit: Commit }, slug: string) {
    return announcementService.fetchAnnouncement(slug)
      .then(payload => { commit("setAnnouncementItem", payload); });
  },
  createAnnouncement({ commit }: { commit: Commit }, announcement: {}) {
    return announcementService.createAnnouncement(announcement)
  },
  editAnnouncement({ commit }: { commit: Commit }, announcement: AnnouncementItem) {
    return announcementService.editAnnouncement(announcement)
  },
  deleteAnnouncement({ commit }: { commit: Commit }, id: number) {
    return announcementService.deleteAnnouncementItem(id)
  }
}
const mutations = {
  setAnnouncementList(state: AnnouncementPayload, payload: { count: number, next: string, previous: string, results: [] }): void {
    state.announcementList = payload.results;
    state.announcementCount = payload.count;
    state.announcementNext = payload.next;
    state.announcementPrevious = payload.previous;
  },
  setAnnouncementItem(state: { announcementItem: AnnouncementItem }, payload: AnnouncementItem): void {
    state.announcementItem = payload;
  },
  createAnnouncementItem(state: { announcementItem: {} }, announcementItem: {}): void {
    state.announcementItem = announcementItem;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
