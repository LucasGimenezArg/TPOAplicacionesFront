import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { TrashFill } from 'react-bootstrap-icons';

const ProductForm = ({
  producto,
  categorias,
  setProducto,
  handleSave,
  handleCancel,
  isNewProduct = false,
}) => {
  const [errors, setErrors] = useState({
    descripcion: false,
    precio: false,
    stock: false,
  });

  const handleChange = (e, field) => {
    const value = e.target.value;
    setProducto({
      ...producto,
      [field]: value,
    });
  };

  const handleBlur = (e, field) => {
    const value = e.target.value;

    let isInvalid = false;
    if (field === 'descripcion') {
      isInvalid = value.trim() === '';
    } else if ((field === 'precio' || field === 'stock') && value < 0) {
      isInvalid = true;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: isInvalid,
    }));
  };

  const handleCategoriaChange = (e) => {
    const selectedCategoria = categorias.find(
      (categoria) => categoria.id === parseInt(e.target.value)
    );
    setProducto({
      ...producto,
      categoria: selectedCategoria || {},
      categoriaId: selectedCategoria?.id || '',
    });
  };

  const handleImageChange = (e, index) => {
    const newUrls = [...producto.direccionImagenes];
    newUrls[index] = e.target.value;
    setProducto({
      ...producto,
      direccionImagenes: newUrls,
    });
  };

  const handleRemoveImage = (index) => {
    const newUrls = producto.direccionImagenes.filter((_, i) => i !== index);
    setProducto({
      ...producto,
      direccionImagenes: newUrls,
    });
  };

  return (
    <form>
      <div className="form-group">
        <label htmlFor="descProducto" className="form-label">
          Descripción <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className={`form-control ${errors.descripcion ? 'is-invalid' : ''}`}
          id="descProducto"
          value={producto.descripcion || ''}
          onChange={(e) => handleChange(e, 'descripcion')}
          onBlur={(e) => handleBlur(e, 'descripcion')}
        />
        {errors.descripcion && (
          <div className="invalid-feedback">
            La descripción es obligatoria.
          </div>
        )}
      </div>

      <div className="form-row mt-2" style={{ display: 'flex' }}>
        <div className="form-group col-md-4">
          <label htmlFor="precioProducto" className="form-label">
            Precio
          </label>
          <input
            type="number"
            className={`form-control ${errors.precio ? 'is-invalid' : ''}`}
            id="precioProducto"
            value={producto.precio || ''}
            onChange={(e) => handleChange(e, 'precio')}
            onBlur={(e) => handleBlur(e, 'precio')}
            min="0"
          />
          {errors.precio && (
            <div className="invalid-feedback">
              El precio no puede ser negativo.
            </div>
          )}
        </div>

        <div className="form-group col-md-3 mx-2">
          <label htmlFor="stockProducto" className="form-label">
            Stock
          </label>
          <input
            type="number"
            className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
            id="stockProducto"
            value={producto.stock || ''}
            onChange={(e) => handleChange(e, 'stock')}
            onBlur={(e) => handleBlur(e, 'stock')}
            min="0"
          />
          {errors.stock && (
            <div className="invalid-feedback">
              El stock no puede ser negativo.
            </div>
          )}
        </div>
      </div>

      <div className="form-group mt-2">
        <label htmlFor="categoriaProducto" className="form-label">
          Categoría
        </label>
        <select
          className="form-control"
          id="categoriaProducto"
          value={producto?.categoria?.id || ''}
          onChange={handleCategoriaChange}
        >
          <option value="">Seleccionar categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group mt-2">
        <label htmlFor="infoProducto" className="form-label">
          Información
        </label>
        <textarea
          className="form-control"
          id="infoProducto"
          value={producto.informacion || ''}
          onChange={(e) => handleChange(e, 'informacion')}
        />
      </div>

      <div className="form-group mt-2">
        <label htmlFor="imagenesProducto" className="form-label">
          URLs de Imágenes
        </label>
        {producto.direccionImagenes?.map((url, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <input
              type="text"
              className="form-control"
              value={url}
              onChange={(e) => handleImageChange(e, index)}
              placeholder="Ingrese una URL de imagen"
            />
            <button
              type="button"
              className="btn btn-danger ml-2"
              onClick={() => handleRemoveImage(index)}
            >
              <TrashFill />
            </button>
          </div>
        ))}
        {producto.direccionImagenes?.length < 5 && (
          <div className="d-flex align-items-center mb-2">
            <input
              type="text"
              className="form-control"
              value=""
              onChange={(e) => {
                const newUrls = [...producto.direccionImagenes, e.target.value];
                setProducto({
                  ...producto,
                  direccionImagenes: newUrls,
                });
              }}
              placeholder="Ingrese una URL de imagen"
            />
          </div>
        )}
      </div>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={Object.values(errors).some((error) => error)}
        >
          {isNewProduct ? 'Agregar Producto' : 'Guardar Cambios'}
        </Button>
      </Modal.Footer>
    </form>
  );
};

export default ProductForm;