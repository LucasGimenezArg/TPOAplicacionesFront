// Incluye los datos del usuario como nombre, apellido, correo electrónico, etc.

@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String apellido;
    private String email;
    // otros campos relevantes

    // Getters y Setters
}