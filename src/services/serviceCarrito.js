import client from './client';
import {editProducto, getProductosDestacados, getVisitadosRecientemente} from "./serviceProductos.js";
import NotificationManager from "./NotificationManager.js";

export const getItemsCarrito = async (usuario) => {
    try {
        const userFilter = usuario ? `?usuario.id=${usuario.id}` : '';
        const response = await client.get('/carrito' + userFilter);
        return response.data;
    } catch (error) {
        NotificationManager.INSTANCE.push('Error al listar carrito', error.message, true);
        console.error(error);
    }
}

export const getItemByProducto = async (productoId) => {
    try {
        const response = await client.get(`/carrito?producto.id=${productoId}`);
        if (response.data && response.data.length > 0) {
            return response.data[0];
        }
    } catch (error) {
        NotificationManager.INSTANCE.push('Error al buscar producto en el carrito', error.message, true);
        console.error(error);
    }
}

export const addOrUpdateItemCarrito = async (itemCarrito) => {
    try {
        if (!itemCarrito.id) {
            const foundItem = (await getItemsCarrito(itemCarrito.usuario)).find(item => item.producto.id === itemCarrito.producto.id);
            if (foundItem) {
                return (await updateItemCarrito({...foundItem, cantidad: itemCarrito.cantidad ?? foundItem.cantidad + 1}));
            }
            return (await client.post('/carrito', {...itemCarrito, cantidad: itemCarrito.cantidad ?? 1 }));
        } else {
            return await updateItemCarrito(itemCarrito);
        }
    } catch (error) {
        NotificationManager.INSTANCE.push('Error al agregar al carrito', error.message, true);
        console.error(error);
    }
}

export const updateItemCarrito = async (itemCarrito) => {
    try {
        if (itemCarrito.cantidad > itemCarrito.producto.stock) {
            throw Error(`Límite de stock alcanzado para ${itemCarrito.producto.descripcion}`);
        }
        const response = await client.put(`/carrito/${itemCarrito.id}`, itemCarrito);
        return response.data;
    } catch (error) {
        NotificationManager.INSTANCE.push('Error al actualizar carrito', error.message, true);
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

export const clearCarrito = async (usuario) => {
    try {
        const itemsCarrito = await getItemsCarrito(usuario);
        for (const item of itemsCarrito) {
            await removeItemCarrito(item.id);
        }
    } catch (error) {
        NotificationManager.INSTANCE.push('Error al vaciar carrito', error.message, true);
        console.error(error);
    }
}

export const checkout = async (usuario) => {
    try {
        const itemsCarrito = await getItemsCarrito(usuario);
        await client.post('/checkout', {
            items: itemsCarrito,
            usuario,
            timestamp: Date.now()
        })
        for (const item of itemsCarrito) {
            const newStock = item.producto.stock - item.cantidad;
            await editProducto({...item.producto, stock: newStock});
            const destacado = (await getProductosDestacados())
                .find(prodDestacado => prodDestacado.id === item.producto.id);
            if (destacado) {
                await client.put(`/productosDestacados/${destacado.id}`, {...destacado, stock: newStock});
            }
            const reciente = (await getVisitadosRecientemente())
                .find(prodReciente => prodReciente.id === item.producto.id);
            if (reciente) {
                await client.put(`/visitadosRecientemente/${reciente.id}`, {...reciente, stock: newStock});
            }
        }
        await clearCarrito(usuario);
        NotificationManager.INSTANCE.push('Confirmación de compra', 'Carrito confirmado exitosamente!');
        console.log('Checkout carrito: ' + JSON.stringify(itemsCarrito));
    } catch (error) {
        NotificationManager.INSTANCE.push('Error al confirmar carrito', error.message, true);
        console.error(error);
    }
}

export const getHistory = async (usuario) => {
    try {
        const response = await client.get(`/checkout?usuario.id=${usuario.id}&_sort=-timestamp`);
        return response.data;
    } catch (error) {
        NotificationManager.INSTANCE.push('Error al buscar historial de compras', error.message, true);
        console.error(error);
    }
}
