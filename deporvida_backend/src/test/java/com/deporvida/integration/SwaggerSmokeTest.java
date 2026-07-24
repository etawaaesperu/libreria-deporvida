package com.deporvida.integration;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.*;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.*;

/**
 * Smoke test que verifica que Swagger UI cargue correctamente.
 * Solo se ejecuta con el tag "smoke" (excluido del test rapido por defecto).
 * Requiere Chrome instalado o WebDriverManager lo descargara automaticamente.
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
@Tag("smoke")
class SwaggerSmokeTest {

    @LocalServerPort
    private int puerto;

    private WebDriver driver;

    @BeforeAll
    static void setupDriver() {
        WebDriverManager.chromedriver().setup();
    }

    @BeforeEach
    void initDriver() {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        driver = new ChromeDriver(options);
    }

    @AfterEach
    void quitDriver() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    @DisplayName("Swagger UI deberia cargar y mostrar titulo")
    void swaggerUi_deberiaCargar() {
        driver.get("http://localhost:" + puerto + "/api/swagger-ui/index.html");

        String titulo = driver.getTitle();
        assertThat(titulo).isNotBlank();

        String contenido = driver.getPageSource();
        assertThat(contenido).contains("swagger");
    }
}
