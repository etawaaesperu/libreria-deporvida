package com.deporvida.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * Configuración de WebSocket con STOMP para notificaciones en tiempo real
 * (cambios de estado de pedido, nuevos pedidos, etc).
 *
 * Endpoints de conexión (context-path /api ya se antepone solo):
 *   - /api/ws         -> WebSocket nativo (STOMP over WS puro)
 *   - /api/ws-sockjs   -> fallback SockJS, útil si algún proxy/navegador bloquea WS puro
 * Broker de salida (servidor -> cliente): /topic/**
 * Prefijo de entrada (cliente -> servidor), si se necesita a futuro: /app/**
 */
@Configuration
@EnableWebSocketMessageBroker
public class ConfiguracionWebSocket implements WebSocketMessageBrokerConfigurer {

    @Value("${app.cors.allowed-origins}")
    private String origenesPermitidos;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
            .setAllowedOrigins(origenesPermitidos.split(","));

        registry.addEndpoint("/ws-sockjs")
            .setAllowedOrigins(origenesPermitidos.split(","))
            .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic");
        registry.setApplicationDestinationPrefixes("/app");
    }
}
