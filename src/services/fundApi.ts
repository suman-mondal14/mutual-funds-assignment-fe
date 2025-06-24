// src/services/fundApi.ts
import axios from "axios";

const BASE_URL = "https://api.mfapi.in/mf"; // public API endpoint

export const searchFunds = async (query: string) => {
  const response = await axios.get(`https://api.mfapi.in/mf/search?q=${query}`);
  return response.data;
};

export const getFundDetail = async (fundCode: string) => {
  const response = await axios.get(`${BASE_URL}/${fundCode}`);
  return response.data;
};
