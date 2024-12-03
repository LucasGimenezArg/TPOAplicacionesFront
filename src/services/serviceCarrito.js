import client from './client';
import NotificationManager from "./NotificationManager.js";

export const getItemsCarrito = async () => {
    try {
        const response = await client.get('/carrito');
        return response.data;
    } catch (error) {
        NotificationManager.INSTANCE.push('Error al listar carrito', error.message, true);
        console.error(error);
    }
}

export const addOrUpdateItemCarrito = async (request) => {
    try {
        const response = await client.put(`/carrito`, request);
        return response.data;
    } catch (error) {
        NotificationManager.INSTANCE.push('Error al agregar al carrito', error.message, true);
        console.error(error);
    }
}

export const removeItemCarrito = async (itemId) => {
    try {
        const response = await client.delete(`/carrito/${itemId}`);
        return response.data;
    } catch (error) {
        NotificationManager.INSTANCE.push('Error al eliminar del carrito', error.message, true);
        console.error(error);
    }
}

export const clearCarrito = async () => {
    try {
        const response = await client.delete(`/carrito`);
        return response.data;
    } catch (error) {
        NotificationManager.INSTANCE.push('Error al vaciar carrito', error.message, true);
        console.error(error);
    }
}

export const checkout = async () => {
    try {
        const response = await client.post(`/checkout`);
        NotificationManager.INSTANCE.push('Confirmación de compra', 'Carrito confirmado exitosamente!');
        console.log('Checkout carrito: ' + JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        NotificationManager.INSTANCE.push('Error al confirmar carrito', error.message, true);
        console.error(error);
    }
}

export const getHistory = async (page, size) => {
    try {
        const response = await client.get(`/checkout?page=${page}&size=${size}`);
        return response.data;
    } catch (error) {
        NotificationManager.INSTANCE.push('Error al buscar historial de compras', error.message, true);
        console.error(error);
    }
}
