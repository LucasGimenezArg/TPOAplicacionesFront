import client from './client';

export const getProductos = async () => {
    try {
        const response = await client.get('producto/list');
        return response.data.productos;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getProductoPorId = async (id) => {
    try {
        const response = await client.get(`/producto/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getProductosDestacados = async () => {
    try {
        const response = await client.get('producto/destacados');
        return response.data.productos;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getVisitadosRecientemente = async () => {
    /* try {
        const response = await client.get('/visitadosRecientemente');
        return response.data.productos;
    } catch (error) {
        console.log(error);
    } */
   return [];
}

export const editProducto = async (producto) => {
    try {
        const response = await client.put(`/producto/${producto.id}`, producto);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const deleteProducto = async (id) => {
    try {
        const response = await client.delete(`/producto/${id}`);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const addProducto = async (producto) => {
    try {
        const response = await client.post('/producto/add', producto);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getCategorias = async () => {
    try {
        const response = await client.get('/producto/categorias');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}