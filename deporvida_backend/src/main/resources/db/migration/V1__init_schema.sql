CREATE TABLE usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    contrasena VARCHAR(120) NOT NULL,
    nombres VARCHAR(50),
    apellidos VARCHAR(50),
    telefono VARCHAR(20),
    activo BIT(1) DEFAULT 1,
    correo_verificado BIT(1) DEFAULT 0,
    ultimo_inicio_sesion DATETIME,
    fecha_creacion DATETIME NOT NULL,
    fecha_actualizacion DATETIME,
    CONSTRAINT uk_usuarios_nombre_usuario UNIQUE (nombre_usuario),
    CONSTRAINT uk_usuarios_correo UNIQUE (correo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    descripcion VARCHAR(100),
    CONSTRAINT uk_roles_nombre UNIQUE (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(500),
    image_url VARCHAR(500),
    is_activo BIT(1) DEFAULT 1,
    display_pedido INT DEFAULT 0,
    padre_id BIGINT,
    created_at DATETIME NOT NULL,
    updated_at DATETIME,
    CONSTRAINT uk_categories_nombre UNIQUE (nombre),
    CONSTRAINT fk_categories_padre FOREIGN KEY (padre_id) REFERENCES categories(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE autors (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    biografia VARCHAR(1000),
    birth_date DATE,
    death_date DATE,
    nacionalidad VARCHAR(50),
    image_url VARCHAR(500),
    created_at DATETIME NOT NULL,
    updated_at DATETIME
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE libros (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    isbn_13 VARCHAR(13),
    isbn_10 VARCHAR(10),
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    sale_precio DECIMAL(10,2),
    publication_date DATE,
    editorial VARCHAR(50),
    paginas INT,
    idioma VARCHAR(20),
    cover_image_url VARCHAR(500),
    thumbnail_url VARCHAR(500),
    is_activo BIT(1) NOT NULL DEFAULT 1,
    is_destacado BIT(1) NOT NULL DEFAULT 0,
    is_mas_vendido BIT(1) NOT NULL DEFAULT 0,
    average_calificacion DECIMAL(3,2) DEFAULT 0,
    resena_count INT DEFAULT 0,
    view_count BIGINT DEFAULT 0,
    sales_count BIGINT DEFAULT 0,
    weight_grams INT,
    dimensiones VARCHAR(50),
    categoria_id BIGINT,
    created_at DATETIME NOT NULL,
    updated_at DATETIME,
    CONSTRAINT uk_libros_isbn_13 UNIQUE (isbn_13),
    CONSTRAINT uk_libros_isbn_10 UNIQUE (isbn_10),
    CONSTRAINT fk_libros_categoria FOREIGN KEY (categoria_id) REFERENCES categories(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE inventario (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    libro_id BIGINT NOT NULL,
    cantidad INT NOT NULL DEFAULT 0,
    reserved_cantidad INT DEFAULT 0,
    repedido_level INT DEFAULT 10,
    max_stock INT,
    warehouse_location VARCHAR(100),
    last_restocked_at DATETIME,
    next_repedido_date DATETIME,
    created_at DATETIME NOT NULL,
    updated_at DATETIME,
    CONSTRAINT uk_inventario_libro UNIQUE (libro_id),
    CONSTRAINT fk_inventario_libro FOREIGN KEY (libro_id) REFERENCES libros(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE carritos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME,
    CONSTRAINT uk_carritos_usuario UNIQUE (usuario_id),
    CONSTRAINT fk_carritos_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE pedidos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    pedido_number VARCHAR(50) NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE',
    subtotal DECIMAL(10,2) NOT NULL,
    tax_monto DECIMAL(10,2),
    shipping_cost DECIMAL(10,2),
    discount_monto DECIMAL(10,2),
    total_monto DECIMAL(10,2) NOT NULL,
    shipping_direccion VARCHAR(500),
    shipping_ciudad VARCHAR(100),
    shipping_departamento VARCHAR(100),
    shipping_zip_code VARCHAR(20),
    shipping_pais VARCHAR(100),
    shipping_telefono VARCHAR(50),
    notas VARCHAR(1000),
    shipped_at DATETIME,
    delivered_at DATETIME,
    cancelled_at DATETIME,
    cancellation_reason VARCHAR(500),
    usuario_id BIGINT NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME,
    CONSTRAINT uk_pedidos_numero UNIQUE (pedido_number),
    CONSTRAINT fk_pedidos_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE libro_autors (
    libro_id BIGINT NOT NULL,
    autor_id BIGINT NOT NULL,
    PRIMARY KEY (libro_id, autor_id),
    CONSTRAINT fk_libro_autors_libro FOREIGN KEY (libro_id) REFERENCES libros(id),
    CONSTRAINT fk_libro_autors_autor FOREIGN KEY (autor_id) REFERENCES autors(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE carrito_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cantidad INT NOT NULL,
    unit_precio DECIMAL(10,2),
    carrito_id BIGINT NOT NULL,
    libro_id BIGINT NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME,
    CONSTRAINT fk_carrito_items_carrito FOREIGN KEY (carrito_id) REFERENCES carritos(id),
    CONSTRAINT fk_carrito_items_libro FOREIGN KEY (libro_id) REFERENCES libros(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE pedido_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cantidad INT NOT NULL,
    unit_precio DECIMAL(10,2) NOT NULL,
    discount_precio DECIMAL(10,2),
    total_precio DECIMAL(10,2) NOT NULL,
    pedido_id BIGINT NOT NULL,
    libro_id BIGINT NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME,
    CONSTRAINT fk_pedido_items_pedido FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    CONSTRAINT fk_pedido_items_libro FOREIGN KEY (libro_id) REFERENCES libros(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE pagos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    pago_reference VARCHAR(100) NOT NULL,
    pago_method VARCHAR(20) NOT NULL,
    pago_estado VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE',
    monto DECIMAL(10,2) NOT NULL,
    moneda VARCHAR(3) DEFAULT 'USD',
    transaction_id VARCHAR(100),
    pago_gateway_response VARCHAR(200),
    failure_reason VARCHAR(500),
    paid_at DATETIME,
    refunded_at DATETIME,
    refund_monto DECIMAL(10,2),
    pedido_id BIGINT NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME,
    CONSTRAINT uk_pagos_reference UNIQUE (pago_reference),
    CONSTRAINT uk_pagos_pedido UNIQUE (pedido_id),
    CONSTRAINT fk_pagos_pedido FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE direcciones (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    etiqueta VARCHAR(50),
    full_nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    direccion_line1 VARCHAR(255) NOT NULL,
    direccion_line2 VARCHAR(255),
    ciudad VARCHAR(100) NOT NULL,
    departamento VARCHAR(100) NOT NULL,
    zip_code VARCHAR(20) NOT NULL,
    pais VARCHAR(100) NOT NULL,
    is_default BIT(1) DEFAULT 0,
    is_facturacion BIT(1) DEFAULT 0,
    usuario_id BIGINT NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME,
    CONSTRAINT fk_direcciones_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE resenas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    calificacion INT NOT NULL,
    comentario VARCHAR(1000),
    is_verified_purchase BIT(1) DEFAULT 0,
    is_aprobado BIT(1) DEFAULT 1,
    usuario_id BIGINT NOT NULL,
    libro_id BIGINT NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME,
    CONSTRAINT fk_resenas_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    CONSTRAINT fk_resenas_libro FOREIGN KEY (libro_id) REFERENCES libros(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE usuario_roles (
    usuario_id BIGINT NOT NULL,
    rol_id BIGINT NOT NULL,
    PRIMARY KEY (usuario_id, rol_id),
    CONSTRAINT fk_usuario_roles_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    CONSTRAINT fk_usuario_roles_rol FOREIGN KEY (rol_id) REFERENCES roles(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
