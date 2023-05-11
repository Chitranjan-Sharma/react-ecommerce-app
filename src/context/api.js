import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

export const fetchProducts = async (query) => {
  var { data } = await axios.get(`${BASE_URL}/${query}`);
  return data;
};

export const fetchProductById = async (id) => {
  var { data } = await axios.get(`${BASE_URL}/products/${id}`);

  return data;
};

export const userLogin = async () => {
  var { data } = await axios.get(`${BASE_URL}/users`);
  return data;
};

export const fetchCartList = async () => {
  var { data } = await axios.get(`${BASE_URL}/carts`);

  return data;
};

export const deleteCartItem = async (id) => {
  var { data } = await axios.delete(`${BASE_URL}/carts/${id}`);

  return data;
};

export const fetchOrderList = async () => {
  var { data } = await axios.get(`${BASE_URL}/orders`);

  return data;
};
