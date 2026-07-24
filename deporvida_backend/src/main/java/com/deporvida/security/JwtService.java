package com.deporvida.security;

import com.deporvida.entity.Rol;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class JwtService {

    private final SecretKey claveFirma;
    private final long expiracionMs;

    public JwtService(
            @Value("${app.jwt.secret}") String secreto,
            @Value("${app.jwt.expiration-ms}") long expiracionMs) {
        this.claveFirma = Keys.hmacShaKeyFor(secreto.getBytes(StandardCharsets.UTF_8));
        this.expiracionMs = expiracionMs;
    }

    public String generarToken(Long usuarioId, Set<Rol.NombreRol> roles) {
        List<String> nombresRoles = roles.stream()
            .map(Rol.NombreRol::name)
            .collect(Collectors.toList());

        Date ahora = new Date();
        Date expiracion = new Date(ahora.getTime() + expiracionMs);

        return Jwts.builder()
            .subject(String.valueOf(usuarioId))
            .claim("roles", nombresRoles)
            .issuedAt(ahora)
            .expiration(expiracion)
            .signWith(claveFirma)
            .compact();
    }

    public Long extraerUsuarioId(String token) {
        return Long.parseLong(extraerClaims(token).getSubject());
    }

    @SuppressWarnings("unchecked")
    public List<String> extraerRoles(String token) {
        return extraerClaims(token).get("roles", List.class);
    }

    public boolean esValido(String token) {
        try {
            extraerClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private Claims extraerClaims(String token) {
        return Jwts.parser()
            .verifyWith(claveFirma)
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }
}
