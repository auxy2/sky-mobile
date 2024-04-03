import axios from "axios";
import store from "@react-native-async-storage/async-storage";

const baseURL = "https://faithful-pocket-tick.cyclic.app/api/V1/skyshowNG";

export const api = axios.create({ baseURL });

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await store.getItem("token");
      console.log("token", token);
      if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch (error) {}

    return config;
  },
  (error) => Promise.reject(error)
);

export async function createUser(payload) {
  const response = await api.post(`signUp`, payload);
  return response.data;
}

export async function verifyEmailAndNumber(option, data) {
  if (option === "Email") {
    const response = await api.post(`signUp?email=${data}`);
    return response.data;
  }

  if (option === "Number") {
    const response = await api.post(`signUp?Number=${data}`);
    return response.data;
  }
}

export async function login(payload) {
  const response = await api.post(`login`, payload);
  return response.data;
}

export async function generateBTC() {
  const response = await api.get(`btc_Wallet_Address`);
  return response.data;
}

export async function generateEthereumWallet() {
  const response = await api.get(`generateEtheriumWallet`);
  return response.data;
}

export async function generateUsdt() {
  const response = await api.get(`generateTetherAddress`);
  return response.data;
}

export async function update(data) {
  const response = await api.patch(`updateMe`, data);
  return response.data;
}

export async function getBankList() {
  const response = await api.get(`listBank`);
  return response.data;
}

export async function addBank(data) {
  const response = await api.get(
    `addBank?AccountNumber=${data.number}&bankName=${data.bankName}`
  );
  return response.data;
}

export async function getSavedBank() {
  const response = await api.get(`savedBank`);
  return response.data;
}

export async function withdraw(data) {
  const response = await api.post("withdraw", data);
  return response.data;
}

export async function cryptoTransactionHis() {
  const response = await api.get(`transations_Crypo`);
  return response.data;
}

export async function refer() {
  const response = await api.get(`refarral_link`);
  return response.data;
}

export async function getgiftCarfHistory() {
  const response = await api.get(`transations_GiftCard`);
  return response.data;
}

export async function ngnHistory() {
  const response = await api.get(`transations_NGN`);
  return response.data;
}

export async function createUserPin(data) {
  const response = await api.post(`set_pin`, data);
  return response.data;
}

export async function resetUserPin(data) {
  const response = await api.post(`reset_pin`, data);
  return response.data;
}

/////// update password
export async function changePassword(data) {
  const response = await api.patch(`Updatepassword`);
  return response.data;
}

export async function resetPassword(data) {
  const response = await api.get(`forgetpassword?Info=${data}`);
  return response.data;
}

export async function resetPasswordOTP(data) {
  const response = await api.get(`verity_otp?verify_Info=${data}`);
  return response.data;
}

///// change password
export async function resetPass(data) {
  const response = await api.patch(`resetPassword`, data);
  return response.data;
}

export async function crptoRateCalc(data) {
  const response = await api.post(`reateCalculator_Crypto`, data);
  return response.data;
}

export async function giftCardRateCalc(data) {
  const response = await api.get(`ratecalculator_giftCard`);
  return response.data;
}

export async function rateAlert(data) {
  const response = await api.post(`setRateAlart`, data);
  return response.data;
}

export async function alertList() {
  const response = await api.get(`listAlart`);
  return response.data;
}

export async function deleteAlert(id) {
  const response = await api.delete(`deleteAlart?id=${id}`);
  return response.data;
}

export async function categories() {
  const response = await api.get(`giftCard_Catigories`);
  return response.data;
}

export async function subCartegories(data) {
  const response = await api.get(`giftCard_Catigories?data=${data}`);
  return response.data;
}

export async function sellGiftCard(data) {
  const response = await api.post(`sell_Gift_Card`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function verification(data) {
  const response = await api.post(`req_verification`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function getHighCardRates() {
  const response = await api.get(`getHighCard_rates`);
  return response.data;
}

export async function getNotifications() {
  const response = await api.get(`getNotifications`);
  return response.data;
}
