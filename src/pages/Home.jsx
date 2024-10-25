import apiClient from "../services/client";
import { useState, useEffect } from "react";
import ProductosPaginadosList from "../components/ProductosPaginadosList";

function Home({isLoggedIn}) { 
    const [productosDestacados, setProductosDestacados] = useState([]);

    useEffect(() => {
        apiClient.get('/productosDestacados')
            .then(response => setProductosDestacados(response.data))
            .catch(error => console.log(error));
    }, []);

    return(
        <>
            <h2 className="text-center mt-5">Productos Destacados</h2>
            <ProductosPaginadosList productos={productosDestacados} cantProductos={4}/>
            {isLoggedIn ? <ProductosPaginadosList productos={productosDestacados} cantProductos={4}/> : null}
        </>
    )
}

export default Home;