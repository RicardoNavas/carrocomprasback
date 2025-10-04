import api from "./apirest";

export const getCart = () => api.get("/carro");
export const addToCart = (cproId, cantidad = 1) =>api.post(`/carro/agregar_producto?cproId=${cproId}&cantidad=${cantidad}`);
export const updateQuantity = (cproId, cantidad) =>api.put(`/carro/actualizar_cantidadproducto/${cproId}?cantidad=${cantidad}`);
export const removeFromCart = (cproId) => api.delete(`/carro/eliminar_producto/${cproId}`);
export const clearCart = () => api.delete("/carro/limpiar_producto");
export const checkout = () => api.post("/carro/comprafinal");
