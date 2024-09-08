//  Contendrá la información de los carritos comprados y la fecha de transacción.

@Entity
public class Checkout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate fechaTransaccion;
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    // otros campos relevantes

    // Getters y Setters
}