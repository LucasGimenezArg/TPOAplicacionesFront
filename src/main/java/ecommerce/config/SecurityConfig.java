
package ecommerce.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/api/perfil/**").authenticated()  // Protege los endpoints de perfil
                .anyRequest().permitAll()
                .and()
                .httpBasic()  // Usa autenticación básica para el ejemplo
                .and()
                .csrf().disable();  // Desactiva CSRF para desarrollo (no recomendado en producción)
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("user").password("{noop}password").roles("USER")  // Usuario en memoria para pruebas
                .and()
                .withUser("admin").password("{noop}admin").roles("ADMIN");
    }
}
