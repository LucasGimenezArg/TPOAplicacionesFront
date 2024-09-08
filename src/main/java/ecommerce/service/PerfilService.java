// Manejará la lógica para recuperar y mostrar la información del perfil del usuario.
//  @Transactional en los métodos de servicio para asegurar consistencia en la base de datos.


@Service
public class PerfilService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CheckoutRepository checkoutRepository;

    @Transactional(readOnly = true)
    public UsuarioDTO obtenerDatosUsuario(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        UsuarioDTO dto = new UsuarioDTO();
        dto.setNombre(usuario.getNombre());
        dto.setApellido(usuario.getApellido());
        dto.setEmail(usuario.getEmail());
        return dto;
    }

    @Transactional(readOnly = true)
    public List<CheckoutDTO> obtenerCheckoutsUsuario(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        List<Checkout> checkouts = checkoutRepository.findByUsuario(usuario);
        List<CheckoutDTO> dtos = new ArrayList<>();
        for (Checkout checkout : checkouts) {
            CheckoutDTO dto = new CheckoutDTO();
            dto.setFechaTransaccion(checkout.getFechaTransaccion());
            // Aquí agregarías la lógica para poblar la lista de productos comprados
            dtos.add(dto);
        }
        return dtos;
    }
}
