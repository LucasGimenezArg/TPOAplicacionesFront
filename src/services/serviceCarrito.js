import client from './client';
import {editProducto} from "./serviceProductos.js";

export const getItemsCarrito = async () => {
    try {
        const response = await client.get('/carrito');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

// Si el carrito en db.json no está vacío, inicializo el autoincremental en el máximo id que existe.
// Si está vacío, se inicializa en 0
let autoincrementalId = Math.max(...(await getItemsCarrito()).map(item => parseInt(item.id)), 0);

export const addOrUpdateItemCarrito = async (itemCarrito) => {
    try {
        if (!itemCarrito.id) {
            const foundItem = (await getItemsCarrito()).find(item => item.producto.id === itemCarrito.producto.id);
            if (foundItem) {
                return (await updateItemCarrito({...foundItem, cantidad: itemCarrito.cantidad ?? foundItem.cantidad + 1})).data;
            }
            autoincrementalId++;
            return (await client.post('/carrito', {
                id: autoincrementalId.toString(),
                producto: itemCarrito.producto,
                cantidad: itemCarrito.cantidad ?? 1
            })).data;
        } else {
            return await updateItemCarrito(itemCarrito);
        }
    } catch (error) {
        console.error(error);
    }
}

export const updateItemCarrito = async (itemCarrito) => {
    try {
        const response = await client.put(`/carrito/${itemCarrito.id}`, itemCarrito);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const removeItemCarrito = async (itemId) => {
    try {
        const response = await client.delete(`/carrito/${itemId}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const clearCarrito = async () => {
    try {
        const itemsCarrito = await getItemsCarrito();
        for (const item of itemsCarrito) {
            await removeItemCarrito(item.id);
        }
    } catch (error) {
        console.error(error);
    }
}

export const checkout = async () => {
    try {
        const itemsCarrito = await getItemsCarrito();
        for (const item of itemsCarrito) {
            await editProducto({...item.producto, stock: item.producto.stock - item.cantidad});
        }
        await clearCarrito();
        console.log('Checkout carrito: ' + JSON.stringify(itemsCarrito));
    } catch (error) {
        console.error(error);
    }
}
