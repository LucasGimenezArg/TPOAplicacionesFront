import { useState, useEffect } from "react";
import ProductCard from "../components/ProductoCard";
import { getProductos } from "../services/serviceProductos";

function Productos() {
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

  const productosFiltrados = productos.filter((producto) =>
    categoriasSeleccionadas.length === 0 ||
    categoriasSeleccionadas.includes(producto.categoria.nombre)
  );

  return (
    <div className="container products-page">
      {isLoading ? (
        <div className="loading">Cargando productos...</div>
      ) : (
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
                            <ProductCard producto={producto} />
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
