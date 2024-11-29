import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Nav } from "react-bootstrap";
import ProductCard from "../components/ProductoCard";
import { getProductos } from "../services/serviceProductos";

function Productos({ isLoggedIn, itemsCarrito, loggedUser, refreshCarrito }) {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedProductos = await getProductos();
        setProductos(fetchedProductos);
        setCategorias([...new Set(fetchedProductos.map((producto) => producto.categoria.nombre))]);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategorias = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCategoriasSeleccionadas([...categoriasSeleccionadas, value]);
    } else {
      setCategoriasSeleccionadas(categoriasSeleccionadas.filter((cat) => cat !== value));
    }
  };

  let productosFiltrados = [];
  if(productos != null){
    productosFiltrados = productos.filter((producto) =>
      categoriasSeleccionadas.length === 0 ||
      categoriasSeleccionadas.includes(producto.categoria.nombre)
    );
  }else{
    productosFiltrados = [];
  }

  return (
    <div className="container products-page">
      {!isLoggedIn ? (
        <div className="alert alert-danger text-center m-5" role="alert">
          <h3>Tenés que loguearte para acceder a esta funcionalidad</h3>
          <button type="button" className="btn btn-dark">
            <Nav.Link as={Link} to="/login">
              Iniciar Sesión
            </Nav.Link>
          </button>
        </div>
      ) : isLoading ? (
        <div className="loading">Cargando productos...</div>
      ) : productosFiltrados == null || productosFiltrados.length === 0 ? (
        <h3 className="text-center mt-5">No se pudieron obtener productos</h3>
      ): (
        <>
            <div className="row pt-3" style={{"height": "800px"}}>
                <div className="col-2 border border-2">
                    <div className="category-filter pt-3">
                        {categorias.map((categoria) => (
                        <div key={"categoria" + categoria} className="form-check">
                            <input
                            className="form-check-input"
                            type="checkbox"
                            id={`categoria-${categoria}`}
                            value={categoria}
                            checked={categoriasSeleccionadas.includes(categoria)}
                            onChange={handleCategorias}
                            />
                            <label className="form-check-label" htmlFor={`categoria-${categoria}`}>{categoria}</label>
                        </div>
                        ))}
                    </div>
                </div>
                <div className="col-10">
                    <div className="row">
                        {productosFiltrados.map((producto) => (
                        <div className="col-md-3 col-sm-6 pb-4" key={producto.id}>
                            <ProductCard producto={producto} loggedUser={loggedUser} itemsCarrito={itemsCarrito} refreshCarrito={refreshCarrito}/>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
      )}
    </div>
  );
}

export default Productos;
