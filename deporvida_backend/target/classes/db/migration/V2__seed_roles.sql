INSERT INTO roles (nombre, descripcion)
VALUES ('ROL_ADMIN', 'Administrador con acceso total')
ON DUPLICATE KEY UPDATE descripcion = VALUES(descripcion);

INSERT INTO roles (nombre, descripcion)
VALUES ('ROL_USUARIO', 'Cliente regular')
ON DUPLICATE KEY UPDATE descripcion = VALUES(descripcion);

INSERT INTO roles (nombre, descripcion)
VALUES ('ROL_VENDEDOR', 'Vendedor / encargado del catálogo')
ON DUPLICATE KEY UPDATE descripcion = VALUES(descripcion);
