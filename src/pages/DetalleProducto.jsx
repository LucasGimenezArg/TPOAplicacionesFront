import { useParams, Link } from "react-router-dom";
import { Nav, Carousel, Button } from "react-bootstrap";
import { Cart } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import { getProductoPorId } from "../services/serviceProductos";
import NumericInput from "../components/NumericInput.jsx";
import { addOrUpdateItemCarrito } from "../services/serviceCarrito.js";

function DetalleProducto({
  isLoggedIn,
  loggedUser,
  itemsCarrito,
  refreshCarrito,
}) {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cantidadCarrito, setCantidadCarrito] = useState(1);
  const [inCarrito, setInCarrito] = useState(false);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const fetchedProducto = await getProductoPorId(id);
        setProducto(fetchedProducto);
      } catch (error) {
        console.error("Error fetching product detail:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  useEffect(() => {
    const item = itemsCarrito.find((item) => item.producto.id === id);
    if (item) {
      setCantidadCarrito(item.cantidad);
      setInCarrito(true);
    } else {
      setCantidadCarrito(1);
      setInCarrito(false);
    }
  }, [itemsCarrito, refreshCarrito]);

  return (
    <>
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
      ) : (
        <div className="container mt-5">
          <div className="d-flex align-items-center mb-4">
            <Link to="/" className="btn btn-outline-secondary">
              <i className="bi bi-arrow-left"></i> Volver
            </Link>
          </div>

          <div className="row">
            <div className="col-md-5">
              <Carousel>
                {producto.direccionImagenes &&
                producto.direccionImagenes.length > 0 ? (
                  producto.direccionImagenes.map((imagen, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block"
                        src={imagen}
                        alt={`Imagen ${index + 1} de ${producto.nombre}`}
                        style={{
                          height: "400px",
                          width: "100%",
                          objectFit: "fill",
                        }}
                      />
                    </Carousel.Item>
                  ))
                ) : (
                  <Carousel.Item>
                    <img
                      className="d-block"
                      src="/noImg.jpg"
                      alt="Imagen predeterminada"
                      style={{
                        height: "400px",
                        width: "100%",
                        objectFit: "fill",
                      }}
                    />
                  </Carousel.Item>
                )}
              </Carousel>
            </div>

            {/* Información del producto */}
            <div className="col-md-5">
              <h2 className="mb-3">{producto.descripcion}</h2>
              <p className="mb-3">
                <strong>Descripción:</strong> {producto.informacion}
              </p>
              <h3 className="text-success">${producto.precio}</h3>
              <NumericInput
                label="Cantidad"
                value={cantidadCarrito}
                minValue={1}
                maxValue={producto.stock}
                onChange={setCantidadCarrito}
              />
              <Button
                className="btn btn-primary"
                onClick={() => {
                  addOrUpdateItemCarrito({
                    productoId: producto.id,
                    cantidad: cantidadCarrito,
                  }).then(() => refreshCarrito());
                }}
              >
                <Cart /> {inCarrito ? "Modificar " : "Agregar al "}Carrito
              </Button>
              <p className="p-3 d-inline" style={{ fontSize: "12px" }}>
                Stock: {producto.stock}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DetalleProducto;
