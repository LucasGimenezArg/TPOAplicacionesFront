import axios from "axios";
import { useState, useEffect } from "react";
import ProductosPaginadosList from "../components/ProductosPaginadosList";

function Home() { 
    const [productosDestacados, setProductosDestacados] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/productosDestacados')
            .then(response => {
                setProductosDestacados(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return(
        <>
            <h2 className="text-center mt-5">Productos Destacados</h2>
            <ProductosPaginadosList productos={productosDestacados} cantProductos={4}/>
        </>
    )
}

export default Home;