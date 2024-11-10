import client from './client';

export const getProductos = async () => {
    try {
        const response = await client.get('/productos');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getProductosDestacados = async () => {
    try {
        const response = await client.get('/productosDestacados');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getVisitadosRecientemente = async () => {
    try {
        const response = await client.get('/visitadosRecientemente');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const editProducto = async (producto) => {
    try {
        const response = await client.put(`/productos/${producto.id}`, producto);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const deleteProducto = async (id) => {
    try {
        const response = await client.delete(`/productos/${id}`);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const addProducto = async (producto) => {
    try {
        const response = await client.post('/productos', producto);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getCategorias = async () => {
    try {
        const response = await client.get('/categorias');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}