-- =====================================================================
-- SEED COMPLETO - Librería Deporvida
-- Pensado para correr sobre una base de datos recién migrada
-- (después de que Flyway haya aplicado V1__init_schema.sql y V2__seed_roles.sql)
--
-- Seguro de re-ejecutar: usuarios/roles/categorías usan INSERT IGNORE,
-- inventario usa WHERE NOT EXISTS, y el bloque de limpieza de rutas
-- corre siempre al final por si algún dato quedó contaminado con
-- "/imagenes/" pegado por error (ej. import manual o carga desde admin).
--
-- Los libros SÍ se duplicarán si corres el bloque 4 dos veces sobre la
-- misma base (libros.titulo no tiene UNIQUE en el schema). Si necesitas
-- volver a sembrar libros, borra la tabla antes:
--   DELETE FROM inventario; DELETE FROM libros;
-- =====================================================================

SET SQL_SAFE_UPDATES = 0;

-- 1) USUARIOS (contraseñas en texto plano abajo para que las anotes)
-- admin  -> Admin123!
-- carlos -> Colab123!   (vendedor)
-- maria  -> Colab123!   (vendedor)
-- juan   -> Cliente123!
-- ana    -> Cliente123!
-- luis   -> Cliente123!
-- sofia  -> Cliente123!

INSERT IGNORE INTO usuarios (nombre_usuario, correo, contrasena, nombres, apellidos, telefono, activo, correo_verificado, fecha_creacion)
VALUES
('admin',  'admin@deporvida.com',  '9NHsLoETPMflosfkaN6nTw==:jKD5itoygJvFX19z7gYxVVo/6aGZtD/HrdbqWYdQgEE=', 'Admin', 'Deporvida', '999000001', 1, 1, NOW()),
('carlos', 'carlos@deporvida.com', 'IQfp9yEpfVGvAHKZ2gEUPg==:xAewK/UiNnjhPx/TUpgRWZkODychF7OiCqDfnwLNx6I=', 'Carlos', 'Garcia', '999000002', 1, 1, NOW()),
('maria',  'maria@deporvida.com',  'SyfjhVIJhh6M59BNMsS3wA==:6iCN4wrV5qlVsRqNamkQ5YWABgehOnLVRKAOwL2/SZ8=', 'Maria', 'Lopez', '999000003', 1, 1, NOW()),
('juan',   'juan@deporvida.com',   '/Grx5kE8ZMBu6hOD+KI/Og==:AAGLDsSFxjlNPboPA8oemtZh2+BH0wMOsNDJCVqV+Lk=', 'Juan', 'Perez', '999000004', 1, 1, NOW()),
('ana',    'ana@deporvida.com',    '7/VX1sYTIaNExXNlHTG/kA==:oLSdEJatpLUc5KL45kicWePIQKv+Wx2m3jX519XVXm0=', 'Ana', 'Torres', '999000005', 1, 1, NOW()),
('luis',   'luis@deporvida.com',   'n+QEEh8r5JrIqtmOaZW7JA==:ussxu60qM2Q7gwZY0Eu8MjQenBxMXwKo3jLlzIhPc/E=', 'Luis', 'Ramirez', '999000006', 1, 1, NOW()),
('sofia',  'sofia@deporvida.com',  'qLK2xKLvAbSdHjBZHroHBA==:4/60CGmL0xbrHzpG4tjLlpgUhLGeaXbdFTQonr3k1mU=', 'Sofia', 'Mendoza', '999000007', 1, 1, NOW());

-- 2) ASIGNAR ROLES (usa los roles que ya sembró tu V2__seed_roles.sql)
INSERT IGNORE INTO usuario_roles (usuario_id, rol_id)
SELECT u.id, r.id FROM usuarios u, roles r WHERE u.nombre_usuario = 'admin'  AND r.nombre = 'ROL_ADMIN';
INSERT IGNORE INTO usuario_roles (usuario_id, rol_id)
SELECT u.id, r.id FROM usuarios u, roles r WHERE u.nombre_usuario = 'carlos' AND r.nombre = 'ROL_VENDEDOR';
INSERT IGNORE INTO usuario_roles (usuario_id, rol_id)
SELECT u.id, r.id FROM usuarios u, roles r WHERE u.nombre_usuario = 'maria'  AND r.nombre = 'ROL_VENDEDOR';
INSERT IGNORE INTO usuario_roles (usuario_id, rol_id)
SELECT u.id, r.id FROM usuarios u, roles r WHERE u.nombre_usuario IN ('juan','ana','luis','sofia') AND r.nombre = 'ROL_USUARIO';

-- 3) CATEGORÍAS
INSERT IGNORE INTO categories (nombre, descripcion, is_activo, display_pedido, created_at) VALUES
('Novela', 'Novelas y ficción literaria', 1, 1, NOW()),
('Ficción', 'Ciencia ficción y fantasía', 1, 2, NOW()),
('Infantil', 'Libros para niños', 1, 3, NOW()),
('Autoayuda', 'Desarrollo personal', 1, 4, NOW()),
('Negocios', 'Finanzas y negocios', 1, 5, NOW()),
('Historia', 'Historia y sociedad', 1, 6, NOW()),
('Cómics', 'Manga y cómics', 1, 7, NOW()),
('Académico', 'Filosofía y ensayo', 1, 8, NOW());

-- 4) LIBROS (usando archivos que SÍ existen en tu carpeta imagenes/)
-- Solo correr una vez por base de datos: si necesitas resembrar,
-- primero: DELETE FROM inventario; DELETE FROM libros;
INSERT INTO libros (titulo, descripcion, precio, sale_precio, editorial, idioma, cover_image_url, thumbnail_url, is_activo, is_destacado, is_mas_vendido, categoria_id, created_at) VALUES
('El Principito', 'Clásico de la literatura infantil', 45.00, NULL, 'Salamandra', 'es', 'el principito.png', 'el principito.png', 1, 1, 1, (SELECT id FROM categories WHERE nombre='Infantil'), NOW()),
('El extranjero', 'Novela de Albert Camus', 55.00, 45.00, 'Alianza', 'es', 'el extranjero.jpeg', 'el extranjero.jpeg', 1, 0, 1, (SELECT id FROM categories WHERE nombre='Novela'), NOW()),
('El mito de Sísifo', 'Ensayo filosófico de Camus', 58.00, NULL, 'Alianza', 'es', 'el mito de sisfo.png', 'el mito de sisfo.png', 1, 1, 0, (SELECT id FROM categories WHERE nombre='Académico'), NOW()),
('El poder del ahora', 'Guía de desarrollo espiritual', 55.00, NULL, 'Grijalbo', 'es', 'el poder del ahora.jpeg', 'el poder del ahora.jpeg', 1, 0, 1, (SELECT id FROM categories WHERE nombre='Autoayuda'), NOW()),
('Las 48 leyes del poder', 'Robert Greene', 89.00, 75.00, 'Atria', 'es', 'las 48 leyes del poder.jpeg', 'las 48 leyes del poder.jpeg', 1, 1, 1, (SELECT id FROM categories WHERE nombre='Autoayuda'), NOW()),
('La psicología del dinero', 'Morgan Housel', 65.00, NULL, 'Planeta', 'es', 'la psicologia del dinero.png', 'la psicologia del dinero.png', 1, 1, 1, (SELECT id FROM categories WHERE nombre='Negocios'), NOW()),
('El arte de gastar dinero', 'Educación financiera práctica', 62.00, NULL, 'Planeta', 'es', 'el arte de gastar dinero.png', 'el arte de gastar dinero.png', 1, 0, 0, (SELECT id FROM categories WHERE nombre='Negocios'), NOW()),
('21 Lessons for the 21st Century', 'Yuval Noah Harari', 85.00, 70.00, 'Debate', 'en', '21 Lessons for the 21st Century de Yuval Noah Harari.png', '21 Lessons for the 21st Century de Yuval Noah Harari.png', 1, 1, 0, (SELECT id FROM categories WHERE nombre='Historia'), NOW()),
('Proyecto Hail Mary', 'Andy Weir', 79.00, NULL, 'Nova', 'es', 'proyecto hail mary.png', 'proyecto hail mary.png', 1, 1, 1, (SELECT id FROM categories WHERE nombre='Ficción'), NOW()),
('Indigno de ser humano', 'Osamu Dazai', 48.00, NULL, 'Sexto Piso', 'es', 'indigno de ser humano.png', 'indigno de ser humano.png', 1, 0, 0, (SELECT id FROM categories WHERE nombre='Novela'), NOW()),
('Blue Lock', 'Manga deportivo', 35.00, NULL, 'Norma', 'es', 'bluelock.png', 'bluelock.png', 1, 0, 1, (SELECT id FROM categories WHERE nombre='Cómics'), NOW()),
('Demon Slayer', 'Manga de acción', 35.00, 30.00, 'Norma', 'es', 'demon slayer.png', 'demon slayer.png', 1, 1, 1, (SELECT id FROM categories WHERE nombre='Cómics'), NOW());

-- 5) INVENTARIO (stock para cada libro que NO tenga inventario todavía)
INSERT INTO inventario (libro_id, cantidad, repedido_level, created_at)
SELECT l.id, FLOOR(5 + RAND() * 25), 10, NOW()
FROM libros l
WHERE NOT EXISTS (SELECT 1 FROM inventario i WHERE i.libro_id = l.id);

-- 6) LIMPIEZA DEFENSIVA
-- Por si algún dato quedó contaminado con "/imagenes/" pegado por error
-- (típico de una carga manual desde el admin panel). No debería tocar
-- nada si los datos sembrados arriba están limpios, pero se deja como
-- red de seguridad para no repetir el bug de mapeo ya resuelto en el backend.
UPDATE libros
SET titulo = TRIM(REPLACE(REPLACE(REPLACE(REPLACE(titulo,
    '/imagenes/', ''), 'imagenes/', ''), '/IMAGENES/', ''), 'IMAGENES/', ''))
WHERE titulo LIKE '%imagenes/%' OR titulo LIKE '%IMAGENES/%';

UPDATE categories
SET nombre = TRIM(REPLACE(REPLACE(REPLACE(REPLACE(nombre,
    '/imagenes/', ''), 'imagenes/', ''), '/IMAGENES/', ''), 'IMAGENES/', ''))
WHERE nombre LIKE '%imagenes/%' OR nombre LIKE '%IMAGENES/%';

UPDATE libros
SET cover_image_url = TRIM(REPLACE(REPLACE(REPLACE(REPLACE(cover_image_url,
        '/imagenes/', ''), 'imagenes/', ''), '/IMAGENES/', ''), 'IMAGENES/', '')),
    thumbnail_url    = TRIM(REPLACE(REPLACE(REPLACE(REPLACE(thumbnail_url,
        '/imagenes/', ''), 'imagenes/', ''), '/IMAGENES/', ''), 'IMAGENES/', ''))
WHERE cover_image_url LIKE '%imagenes/%' OR cover_image_url LIKE '%IMAGENES/%'
   OR thumbnail_url LIKE '%imagenes/%' OR thumbnail_url LIKE '%IMAGENES/%';

SET SQL_SAFE_UPDATES = 1;

-- 7) VERIFICACIÓN
SELECT (SELECT COUNT(*) FROM usuarios)   AS total_usuarios,
       (SELECT COUNT(*) FROM categories) AS total_categorias,
       (SELECT COUNT(*) FROM libros)     AS total_libros,
       (SELECT COUNT(*) FROM inventario) AS total_inventario;

SELECT id, titulo FROM libros WHERE titulo LIKE '%imagenes/%' OR titulo LIKE '%IMAGENES/%';
SELECT id, nombre FROM categories WHERE nombre LIKE '%imagenes/%' OR nombre LIKE '%IMAGENES/%';
