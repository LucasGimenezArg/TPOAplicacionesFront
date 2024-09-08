// Para manejar las operaciones CRUD de los checkouts.

@Repository
public interface CheckoutRepository extends JpaRepository<Checkout, Long> {
    List<Checkout> findByUsuario(Usuario usuario);
}