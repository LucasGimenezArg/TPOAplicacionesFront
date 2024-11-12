import client from './client';

export const getUsuarioPorId = async (usuarioId) => {
    try {
        const response = await client.get(`/usuario/${usuarioId}`);
        const usuario = response.data;
        return usuario; 
    } catch (error) {
        console.error("Error al buscar al usuario:", error);
        throw error;
    }
};