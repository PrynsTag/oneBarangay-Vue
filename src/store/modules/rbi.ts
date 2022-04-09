import rbiService from "@/services/rbi/rbiService";
import type { Commit } from "vuex";


type HouseRecord = {
  house_id: number;
  created_at: string;
  updated_at: string;
  date_accomplished: string;
  address: string;
  family_name: string;
  street: string;
};

type FamilyRecord = {
  family_member_id: number;
  civil_status: string;
  gender: string;
  created_at: string;
  updated_at: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  age: number;
  birth_place: string;
  citizenship: string;
  date_of_birth: string;
  extension: string;
  monthly_income: number;
  remarks: string;
  house_record: number;
};

type HouseData = {
  houseList: [];
  houseCount: number;
  houseNext: string;
  housePrevious: string;
}

type HouseDataItem = {
  house_id: number;
  created_at: string;
  updated_at: string;
  date_accomplished: string;
  address: string;
  family_name: string;
  street: string;
}

type FamilyData = {
  familyList: [];
  familyCount: number;
  familyNext: string;
  familyPrevious: string;
}

type Payload = {
  results: [];
  count: number;
  next: string;
  previous: string;
}

const state = {
  houseList: null,
  houseCount: null,
  houseNext: null,
  housePrevious: null,
  houseDataItem: null,
}
const getters = {
  getHouseList: (state: HouseData): [] => { return state.houseList },
  getFamilyList: (state: FamilyData): [] => { return state.familyList },
  getHouseItem: (state: { houseDataItem: {} }): {} => { return state.houseDataItem },
  getHouseCount: (state: HouseData): number => { return state.houseCount },
  getFamilyCount: (state: FamilyData): number => { return state.familyCount },
}
const actions = {
  fetchHouseList({ commit }: { commit: Commit }): void {
    rbiService.fetchHouseList()
      .then(response => { commit("setHouseData", response); });
  },
  createHouseRecord({ commit }: { commit: Commit }, payload: HouseRecord) {
    return rbiService.createHouseRecord(payload)
  },
  createFamilyRecord({ commit }: { commit: Commit }, payload: FamilyRecord) {
    return rbiService.createFamilyRecord(payload)
  },
  deleteHouseRecord({ commit }: { commit: Commit }, id: number): Promise<any> {
    return rbiService.deleteHouseRecord(id)
  },
  fetchHouseRecord({ commit }: { commit: Commit }, id: number): void {
    rbiService.fetchHouseRecord(id)
      .then(payload => { commit("setHouseItem", payload); });
  },
  fetchFamilyRecord({ commit }: { commit: Commit }, id: number): void {
    rbiService.fetchFamilyRecord(id)
      .then(payload => { commit("setFamilyData", payload); });
  },
}
const mutations = {
  setHouseData(state: HouseData, payload: Payload): void {
    state.houseList = payload.results;
    state.houseCount = payload.count;
    state.houseNext = payload.next;
    state.housePrevious = payload.previous;
  },
  setFamilyData(state: FamilyData, payload: Payload): void {
    state.familyList = payload.results;
    state.familyCount = payload.count;
    state.familyNext = payload.next;
    state.familyPrevious = payload.previous;
  },
  setHouseItem(state: { houseDataItem: {} }, payload: HouseDataItem): void {
    state.houseDataItem = payload;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
