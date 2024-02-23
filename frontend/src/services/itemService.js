import axios from "axios";

const baseURL = "https://dummyjson.com/products";
const fetchItems = async () => {
  const {data} = await axios.get(`${baseURL}?limit=100`)
  return data;
};

export {fetchItems};