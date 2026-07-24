package com.deporvida.security;

import com.deporvida.config.ConfiguracionCors;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final ConfiguracionCors configuracionCors;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(configuracionCors.corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/register", "/auth/login",
                    "/auth/forgot-password").permitAll()
                .requestMatchers(HttpMethod.POST, "/auth/reset-password").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/libros/**", "/categories/**", "/autors/**").permitAll()
                .requestMatchers("/swagger-ui/**", "/api-docs/**", "/v3/api-docs/**").permitAll()
                .requestMatchers("/actuator/health").permitAll()
                .requestMatchers("/imagenes/**").permitAll()
                .requestMatchers("/ws/**", "/ws-sockjs/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/libros/**", "/categories/**", "/autors/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/libros/**", "/categories/**", "/autors/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/libros/**", "/categories/**", "/autors/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/auth/register-admin").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/usuarios/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/usuarios/*/roles").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/pagos/*/reembolsar").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/pedidos/all").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/pedidos/*/estado").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/pedidos/estado/*").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/usuarios").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
