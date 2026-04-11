# MTX-Parts API - Guía de Endpoints

**Base URL:** `http://localhost:8080`

**Autenticación:** HTTP Basic Auth (email:password)

---

## Auth (`/auth`) - Público

### POST /auth/register
Registrar nuevo usuario (rol CLIENTE por defecto).

**Body:**
```json
{
  "nombreCompleto": "Juan Pérez",
  "email": "juan@email.com",
  "password": "密码123",
  "telefono": "0991234567",
  "direccion": "Calle Principal 123"
}
```

### POST /auth/login
Iniciar sesión.

**Body:**
```json
{
  "email": "alexdan@admin.com",
  "password": "hola123"
}
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "nombreCompleto": "Alex Daniel",
    "email": "alexdan@admin.com",
    "rol": "ROLE_ADMIN",
    "telefono": "0987654321",
    "direccion": "Sur de Quito",
    "password": null
  },
  "message": "Login exitoso"
}
```

---

## Productos (`/productos`)

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET | `/productos` | No | Listar todos (filtros: `?nombre=x`, `?disponibles=true`) |
| GET | `/productos/{id}` | No | Buscar por ID |
| GET | `/productos/sku/{sku}` | No | Buscar por SKU |
| POST | `/productos` | Sí | Crear producto |
| PUT | `/productos/{id}` | Sí | Actualizar producto |
| DELETE | `/productos/{id}` | Sí | Eliminar producto |

### Ejemplo crear producto

**Body:**
```json
{
  "sku": "FRN-001",
  "nombre": "Frenos Delanteros",
  "descripcion": "Juego de pastillas de freno",
  "precio": 45.99,
  "stock": 20,
  "imagenUrl": "https://ejemplo.com/frenos.jpg"
}
```

---

## Usuarios (`/usuarios`) - Requiere Auth

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET | `/usuarios` | Sí | Listar usuarios |
| GET | `/usuarios/{id}` | Sí | Buscar por ID |
| GET | `/usuarios/mi-perfil` | Sí | Perfil del usuario autenticado |
| POST | `/usuarios` | Sí | Crear usuario |
| PUT | `/usuarios/{id}` | Sí | Actualizar usuario |
| DELETE | `/usuarios/{id}` | Sí | Eliminar usuario |

---

## Pedidos (`/pedidos`) - Requiere Auth

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET | `/pedidos` | Sí | Listar pedidos (USER: propios, ADMIN: todos) |
| GET | `/pedidos/{id}` | Sí | Ver pedido específico |
| GET | `/pedidos/status/{status}` | Sí | Filtrar por estado |
| POST | `/pedidos` | Sí | Crear pedido |
| PUT | `/pedidos/{id}/status` | ADMIN | Cambiar estado |

### Estados disponibles
- `PENDIENTE`
- `PAGADO`
- `ENTREGADO`
- `ANULADO`

### Ejemplo crear pedido

**Body:**
```json
{
  "detalles": [
    {"productoId": 1, "cantidad": 2},
    {"productoId": 3, "cantidad": 1}
  ],
  "direccionEnvio": "Av. Principal 456"
}
```

---

## Códigos de Respuesta

| Código | Significado |
|--------|-------------|
| 200 | OK |
| 201 | Creado |
| 400 | Bad Request (validación fallida) |
| 401 | Unauthorized (no autenticado) |
| 403 | Forbidden (sin permisos) |
| 404 | No encontrado |
| 409 | Conflict (recurso ya existe) |

---

## Formato de Respuesta

### Éxito
```json
{
  "success": true,
  "data": { ... },
  "message": "Operación exitosa"
}
```

### Error
```json
{
  "success": false,
  "message": "Descripción del error"
}
```

---

## Roles

| Rol | Descripción |
|-----|-------------|
| `ROLE_ADMIN` | Administrador (acceso total) |
| `ROLE_CLIENTE` | Cliente (solo pedidos propios) |

---

## Ejemplos con cURL

### Login
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alexdan@admin.com","password":"hola123"}'
```

### Listar productos
```bash
curl http://localhost:8080/productos
```

### Crear producto (con auth)
```bash
curl -X POST http://localhost:8080/productos \
  -u alexdan@admin.com:hola123 \
  -H "Content-Type: application/json" \
  -d '{
    "sku": "FRN-002",
    "nombre": "Cadena de transmisión",
    "descripcion": "Cadena reforzada 428",
    "precio": 35.50,
    "stock": 15,
    "imagenUrl": "https://ejemplo.com/cadena.jpg"
  }'
```

### Crear pedido (con auth)
```bash
curl -X POST http://localhost:8080/pedidos \
  -u alexdan@admin.com:hola123 \
  -H "Content-Type: application/json" \
  -d '{
    "detalles": [
      {"productoId": 1, "cantidad": 2}
    ],
    "direccionEnvio": "Av. Americas 789"
  }'
```
