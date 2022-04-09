import houseApi from "@/services/rbi/houseApi";
import familyApi from "@/services/rbi/familyApi";

export default {
  fetchHouseList() {
    return houseApi.get("/?limit=100&ordering=-created_at")
      .then(response => response.data);
  },
  fetchFamilyList() {
    return familyApi.get("/?limit=100&ordering=-created_at")
      .then(response => response.data);
  },
  fetchHouseRecord(id: number) {
    return houseApi.get(`/${id}/`)
      .then(response => response.data);
  },
  fetchFamilyRecord(houseId: number) {
    return familyApi.get(`/?house_record=${houseId}`)
      .then(response => response.data);
  },
  createHouseRecord(house: {}) {
    return houseApi.post("/", house)
      .then(response => response.data);
  },
  createFamilyRecord(family: {}) {
    return familyApi.post("/", family)
      .then(response => response.data);
  },
  deleteHouseRecord(id: number) {
    return houseApi.delete(`/${id}/`)
      .then(response => response.data);
  },
}
