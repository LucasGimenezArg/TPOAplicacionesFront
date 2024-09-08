// DTOs para transferir datos entre las capas de tu aplicación.
package ecommerce.model.dto;

import java.time.LocalDate;
import java.util.List;

public class CheckoutDTO {
    private LocalDate fechaTransaccion;
    private List<String> productos;

    // Getters y Setters
    public LocalDate getFechaTransaccion() {
        return fechaTransaccion;
    }

    public void setFechaTransaccion(LocalDate fechaTransaccion) {
        this.fechaTransaccion = fechaTransaccion;
    }

    public List<String> getProductos() {
        return productos;
    }

    public void setProductos(List<String> productos) {
        this.productos = productos;
    }
}
