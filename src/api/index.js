import { API_URLS, LOCAL_STORAGE_TOKEN_KEY, getFormBody } from "../utils";

export const logIn = async (email, password) => {
  let response = await fetch(API_URLS.login(), {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: getFormBody({ email: email, password: password }),
  });
  response = await response.json();
  return response;
};

export const signUp = async (
  email,
  name,
  password,
  confirm_password,
  profileImg,
  city,
  state,
  bloodGroup,
  contact
) => {
  let response = await fetch(API_URLS.signup(), {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: getFormBody({
      email: email,
      name: name,
      password: password,
      confirmPassword: confirm_password,
      profileImg: profileImg,
      city: city,
      state: state,
      bloodGroup: bloodGroup,
      contact: contact,
    }),
  });
  response = await response.json();
  return response;
};

export const getLoggedInUser = async () => {
  const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  let response = await fetch(API_URLS.getUser(), {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`, // Remove Auth if not required
    },
  });
  response = await response.json();
  return response;
};

export const getDonor = async (state, city, bloodGroup) => {
  const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  let response = await fetch(API_URLS.getDonor(), {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`, // Remove Auth if not required
    },
    body: getFormBody({
      state: state,
      city: city,
      bloodGroup: bloodGroup,
    }),
  });
  response = await response.json();
  return response;
};

export const getBloodBank = async (state, city, bloodGroup) => {
  let response = await fetch(API_URLS.getBloodBank(), {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: getFormBody({
      state: state,
      city: city,
      bloodGroup: bloodGroup,
    }),
  });
  response = await response.json();
  return response;
};

export const getHospitals = async (state, city) => {
  let response = await fetch(API_URLS.getHospitals(), {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: getFormBody({
      state: state,
      city: city,
    }),
  });
  response = await response.json();
  return response;
};
