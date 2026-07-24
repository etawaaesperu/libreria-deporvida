package com.deporvida.util;

import org.springframework.stereotype.Component;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

/**
 * Codificador de contraseñas propio (SHA-256 con salt aleatorio), reemplazo del
 * BCryptPasswordEncoder de Spring Security ahora que el proyecto no depende de
 * spring-boot-starter-security. El formato almacenado es "salt:hash", ambos en Base64.
 */
@Component
public class CodificadorContrasena {

    private static final String ALGORITMO = "SHA-256";
    private static final int LONGITUD_SALT = 16;

    public String codificar(String contrasenaPlana) {
        byte[] salt = generarSalt();
        byte[] hash = hashear(contrasenaPlana, salt);
        return Base64.getEncoder().encodeToString(salt) + ":" + Base64.getEncoder().encodeToString(hash);
    }

    public boolean verificar(String contrasenaPlana, String contrasenaCodificada) {
        if (contrasenaCodificada == null || !contrasenaCodificada.contains(":")) {
            return false;
        }
        String[] partes = contrasenaCodificada.split(":", 2);
        byte[] salt = Base64.getDecoder().decode(partes[0]);
        byte[] hashEsperado = Base64.getDecoder().decode(partes[1]);
        byte[] hashCalculado = hashear(contrasenaPlana, salt);
        return MessageDigest.isEqual(hashEsperado, hashCalculado);
    }

    private byte[] generarSalt() {
        byte[] salt = new byte[LONGITUD_SALT];
        new SecureRandom().nextBytes(salt);
        return salt;
    }

    private byte[] hashear(String contrasenaPlana, byte[] salt) {
        try {
            MessageDigest digest = MessageDigest.getInstance(ALGORITMO);
            digest.update(salt);
            return digest.digest(contrasenaPlana.getBytes());
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("Algoritmo de hash no disponible: " + ALGORITMO, e);
        }
    }
}
