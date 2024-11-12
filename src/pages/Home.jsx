import { useState, useEffect } from "react";
import ProductosPaginadosList from "../components/ProductosPaginadosList";
import { getProductosDestacados, getVisitadosRecientemente } from "../services/serviceProductos";

function Home({isLoggedIn, itemsCarrito, refreshCarrito}) {
    const [productosDestacados, setProductosDestacados] = useState([]);
    const [visitadosRecientemente, setVisitadosRecientemente] = useState([]);

    useEffect(() => {
        async function fetchData(){
            setProductosDestacados(await getProductosDestacados());
            if(isLoggedIn){
                setVisitadosRecientemente(await getVisitadosRecientemente());
            }
        }
        fetchData()
    },[isLoggedIn]);

    return(
        <>
            <h2 className="text-center mt-5">Productos Destacados</h2>
            <ProductosPaginadosList productos={productosDestacados} cantProductos={4} itemsCarrito={itemsCarrito} refreshCarrito={refreshCarrito}/>
            {isLoggedIn && visitadosRecientemente.length > 0 ? (
                <div className="container">
                    <h2 className="text-center mt-5">Visitados recientemente</h2>
                    <ProductosPaginadosList productos={visitadosRecientemente} cantProductos={4} itemsCarrito={itemsCarrito} refreshCarrito={refreshCarrito}/>
                </div>
                )
                : null}
        </>
    )
}

export default Home;