import axios from 'axios';
 
const BASE_URL = 'http://localhost:8080/api'; // 백엔드 서버 주소에 맞게 수정
 
export const fetchRecommendedCategory = async (userId) => {
  const response = await axios.get(`${BASE_URL}/recommendations/category?userId=${userId}`);
  return response.data;
};
 
export const fetchTopSpendingCategory = async (userId) => {
  const response = await axios.get(`${BASE_URL}/spending/top-category?userId=${userId}`);
  return response.data;
};
 
export const fetchSubscriptionsByCategory = async (category) => {
  const response = await axios.get(`${BASE_URL}/subscriptions/by-category?category=${category}`);
  return response.data;
};
 
export const fetchSubscriptionDetails = async (subscriptionId) => {
  const response = await axios.get(`${BASE_URL}/subscriptions/${subscriptionId}`);
  return response.data;
};