import { useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import { getProductos, editProducto, deleteProducto, addProducto, getCategorias } from "../services/serviceProductos";
import { Modal, Button, Nav } from "react-bootstrap";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import ProductForm from "../components/ProductForm";

const GestionProductos = ({ isLoggedIn }) => {
  const [productos, setProductos] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isNewProductPopupOpen, setIsNewProductPopupOpen] = useState(false);
  const [productoEditado, setProductoEditado] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [nuevoProducto, setNuevoProducto] = useState({
    descripcion: "",
    precio: "",
    stock: "",
    categoria: { id: "", nombre: "", descripcion: "" },
    informacion: "",
    direccionImagenes: []
  });

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    } else {
      console.log("No estás logueado");
    }
  }, [isLoggedIn]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const fetchedProductos = await getProductos();
      setProductos(fetchedProductos);
      const fetchedCategorias = await getCategorias();
      setCategorias(fetchedCategorias);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (producto) => {
    setIsPopupOpen(true);
    setProductoEditado(producto);
  };

  const handleConfirmEdit = async () => {
    const response = await editProducto(productoEditado);
    if (response.status === 200) {
      console.log("Producto editado correctamente");
      fetchData();
    } else {
      console.log("Error al editar el producto");
    }
    setIsPopupOpen(false);
  };

  const handleDelete = (producto) => {
    setIsDeletePopupOpen(true);
    setProductoAEliminar(producto);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deleteProducto(productoAEliminar.id);
      if (response.status === 200) {
        console.log("Producto eliminado correctamente");
        fetchData();
      } else {
        console.log("Error al eliminar el producto");
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    } finally {
      setIsDeletePopupOpen(false);
    }
  };

  const handleNewProduct = () => {
    setIsNewProductPopupOpen(true);
  };

  const handleConfirmNewProduct = async () => {
    try {
      const response = await addProducto(nuevoProducto);
      if (response.status === 201) {
        console.log("Producto agregado correctamente");
        fetchData();
      } else {
        console.log("Error al agregar el producto");
      }
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    } finally {
      setIsNewProductPopupOpen(false);
      setNuevoProducto({
        descripcion: "",
        precio: "",
        stock: "",
        categoria: { id: "", nombre: "", descripcion: "" },
        informacion: "",
        direccionImagenes: []
      });
    }
  };

  const handleCancelEdit = () => {
    setIsPopupOpen(false);
    setProductoEditado(null);
  };

  const handleCancelNewProduct = () => {
    setIsNewProductPopupOpen(false);
    setNuevoProducto({
      descripcion: "",
      precio: "",
      stock: "",
      categoria: { id: "", nombre: "", descripcion: "" },
      informacion: "",
      direccionImagenes: []
    });
  };

  return (
    <div>
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
        <div className="m-5">
          <div className="d-flex justify-content-between align-content-center p-2">
            <h3>Gestión de Productos</h3>
            <button type="button" className="btn btn-success" onClick={handleNewProduct}>Nuevo Producto</button>
          </div>
          <div className="table-responsive rounded border border-secondary">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Descripción</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Categoría</th>
                  <th scope="col" className="w-25">Información</th>
                  <th scope="col">Cantidad de Imágenes</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id} scope="row">
                    <td>{producto.descripcion}</td>
                    <td>{producto.precio}</td>
                    <td>{producto.stock}</td>
                    <td>{producto.categoria.nombre}</td>
                    <td>{producto.informacion}</td>
                    <td>{producto.direccionImagenes ? producto.direccionImagenes.length : 0}</td>
                    <td>
                      <button type="button" className="btn btn-primary m-1" onClick={() => handleEdit(producto)}>
                        <PencilFill />
                      </button>
                      <button type="button" className="btn btn-danger m-1" onClick={() => handleDelete(producto)}>
                        <TrashFill />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      <Modal show={isPopupOpen} onHide={handleCancelEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductForm
            producto={productoEditado || {}}
            categorias={categorias}
            setProducto={setProductoEditado}
            handleSave={handleConfirmEdit}
            handleCancel={handleCancelEdit}
          />
        </Modal.Body>
      </Modal>
      
      <Modal show={isNewProductPopupOpen} onHide={handleCancelNewProduct}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductForm
            producto={nuevoProducto || {}}
            categorias={categorias}
            setProducto={setNuevoProducto}
            handleSave={handleConfirmNewProduct}
            handleCancel={handleCancelNewProduct}
            isNewProduct={true}
          />
        </Modal.Body>
      </Modal>
      
      <Modal show={isDeletePopupOpen} onHide={() => setIsDeletePopupOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar el producto?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsDeletePopupOpen(false)}>Cancelar</Button>
          <Button variant="danger" onClick={handleConfirmDelete}>Eliminar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GestionProductos;