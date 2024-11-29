import client from './client';

export const login = async (credencial, contrasena, handleLogin) => {
    try {
        const response = await client.post('/usuario/login', {credencial,contrasena});
        const token = response.data.token;
        document.cookie = `jwt=${token}; path=/; secure; samesite=strict;`;
        const usuario = response.data.usuario;
        localStorage.setItem("usuario", JSON.stringify(usuario));
        handleLogin(usuario);
        return true;
    } catch (error) {
        console.error("Error al hacer login:", error);
        return false;
    }
}

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