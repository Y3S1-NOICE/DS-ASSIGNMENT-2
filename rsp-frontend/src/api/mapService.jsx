import axios from "axios";

export const updateMap = (payload) => axios.put(`http://localhost:5009/map`, payload);
export const createMap = (payload) => axios.post(`http://localhost:5009/map`, payload);
export const fetchMap = () => axios.get(`http://localhost:5009/map`);