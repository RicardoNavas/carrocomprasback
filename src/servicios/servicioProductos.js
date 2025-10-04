import api from "./apirest";

export const getCategories = () => api.get("/categorias");
export const getProduct = (id) => api.get(`/categorias/producto/${id}`);
