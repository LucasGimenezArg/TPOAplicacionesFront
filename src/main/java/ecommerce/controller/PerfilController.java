// Expondrá las APIs necesarias para que el frontend pueda obtener la información del perfil.
// puede devolver datos en diferentes formatos (JSON y XML) dependiendo de las preferencias del cliente.

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/perfil")
public class PerfilController {

    @Autowired
    private PerfilService perfilService;

    @GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
    public ResponseEntity<UsuarioDTO> obtenerPerfil(Principal principal) {
        String email = principal.getName();
        UsuarioDTO usuario = perfilService.obtenerDatosUsuario(email);
        return ResponseEntity.ok(usuario);
    }

    @GetMapping(value = "/checkouts", produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
    public ResponseEntity<List<CheckoutDTO>> obtenerCheckouts(Principal principal) {
        String email = principal.getName();
        List<CheckoutDTO> checkouts = perfilService.obtenerCheckoutsUsuario(email);
        return ResponseEntity.ok(checkouts);
    }
}