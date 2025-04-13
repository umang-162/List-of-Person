import axios from "axios";

const API_BASE = "http://localhost:3000/person";

export const getPeople = () => axios.get(API_BASE);
export const getPerson = (id) => axios.get(`${API_BASE}/${id}`);
export const createPerson = (data) => axios.post(API_BASE, data);
export const updatePerson = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deletePerson = (id) => axios.delete(`${API_BASE}/${id}`);
