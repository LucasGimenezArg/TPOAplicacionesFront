import client from './client';

export const getProductosDestacados = async () => {
    try {
        const response = await client.get('/productosDestacados');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}