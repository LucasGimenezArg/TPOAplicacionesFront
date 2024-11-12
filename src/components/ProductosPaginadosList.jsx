import { useState } from "react";
import ProductoCard from "./ProductoCard";

function ProductosPaginadosList(props) {
    const productos = props.productos;
    const productosPorPagina = props.cantProductos;
    const itemsCarrito = props.itemsCarrito;
    const refreshCarrito = props.refreshCarrito;
    const loggedUser = props.loggedUser;
    const [indice, setIndice] = useState(0);

    const handleNext = () => {
        if (indice + productosPorPagina < productos.length) {
            setIndice(indice + 1);
        }
    };

    const handlePrev = () => {
        if (indice > 0) {
            setIndice(indice - 1);
        }
    };

    const productosPaginados = productos.slice(indice, indice + productosPorPagina);

    return (
        <div className="container d-flex align-items-center my-3 border rounded py-4">
            <button className="btn btn-light me-3" onClick={handlePrev}>&lt;</button>
            <div className="d-flex flex-row flex-wrap justify-content-between flex-grow-1">
                {productosPaginados.map(producto => (
                    <div key={producto.id} className="me-3">
                        <ProductoCard key={producto.id} producto={producto} loggedUser={loggedUser} itemsCarrito={itemsCarrito} refreshCarrito={refreshCarrito} />
                    </div>
                ))}
            </div>
            <button className="btn btn-light ms-3" onClick={handleNext}>&gt;</button>
        </div>
    )
}

export default ProductosPaginadosList;