const API_ROOT = "http://127.0.0.1:8000";
// const API_ROOT = "http://16.171.57.202:8000";

export const API_URLS = {
  login: () => `${API_ROOT}/api/authenticate`,
  signup: () => `${API_ROOT}/api/create-user`,
  getUser: () => `${API_ROOT}/api/get-authenticated-user`,
  getDonor: () => `${API_ROOT}/api/get-donor`,
  getBloodBank: () => `${API_ROOT}/api/get-blood-bank`,
  getHospitals: () => `${API_ROOT}/api/get-hospital`,
};

export const bloodGroups = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];

export const LOCAL_STORAGE_TOKEN_KEY = "donate_life";
