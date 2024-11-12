import client from './client';

export const getTransaccionesPorUsuario = async (usuarioId) => {
    try {
        const response = await client.get('/transacciones'); 
        const transacciones = response.data.filter(
            transaccion => transaccion.usuarioId === usuarioId
        );
        return transacciones;
    } catch (error) {
        console.error("Error al buscar las transacciones:", error);
        throw error;
    }
};
