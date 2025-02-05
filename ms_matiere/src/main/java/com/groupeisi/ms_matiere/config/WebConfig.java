package com.groupeisi.ms_matiere.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/ws/**") // Autoriser les requêtes SOAP
                .allowedOrigins("http://localhost:3000") // Remplace par l'URL de ton front-end
                .allowedMethods("POST");
    }
}
