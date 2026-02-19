# Pangea Relics - Plataforma de Antigüedades

## Descripción del Proyecto

Pangea Relics es una plataforma moderna para la compra, venta y certificación de antigüedades auténticas. El proyecto incluye un sitio web completamente responsivo con múltiples vistas y funcionalidades.

## Estructura del Proyecto

```
PangeaRelicsV2/
├── index.html                  # Página principal
├── assets/
│   ├── css/
│   │   ├── global.css         # Estilos globales y variables CSS
│   │   ├── index.css          # Estilos de página de inicio
│   │   ├── productos.css      # Estilos de galería de productos
│   │   ├── contacto.css       # Estilos de formulario de contacto
│   │   └── mision-vision.css  # Estilos de misión y visión
│   ├── js/
│   │   ├── global.js          # JavaScript global
│   │   ├── index.js           # JavaScript página principal
│   │   
│   │   
│   │   
│   └── img/
│       └── [imágenes]         # Recursos de imagen
├── components/
│   ├── header.html            # Componente de encabezado
│   └── footer.html            # Componente de pie de página
└── pages/
    ├── productos.html         # Página de productos
    ├── contacto.html          # Página de contacto
    └── mision-vision.html     # Página de misión y visión
```

## Variables CSS disponibles

El proyecto utiliza variables CSS estandarizadas en español:

### Colores
- `--color-primario`: #d4af37 (Dorado)
- `--color-primario-oscuro`: #b8940a
- `--color-primario-claro`: #e5c158
- `--color-oscuro`: #1a1a1a
- `--color-gris-claro`: #f9f9f9
- `--color-texto-principal`: #333


### Transiciones
- `--transicion-rapida`: 0.2s ease
- `--transicion-normal`: 0.3s ease
- `--transicion-lenta`: 0.5s ease

## Componentes Principales

### Encabezado (Header)
- Logo navegable
- Menú de navegación responsivo
- Botón de menú móvil

### Páginas Creadas

#### 1. Index.html - Página Principal
- Sección hero con CTA
- Productos destacados
- Categorías principales
- Sección "Cómo funciona"
- Testimonios
- CTA de venta

#### 2. productos.html - Galería de Productos
- Panel de filtros (categoría, precio, disponibilidad)
- Cuadrícula de productos con imagen
- Ordenamiento personalizado
- Paginación
- Botón de favoritos

#### 3. contacto.html - Formulario de Contacto
- Información de contacto
- Formulario completo con validación
- Horarios de atención
- Enlaces de redes sociales

#### 4. mision-vision.html - Información de la Empresa
- Misión y visión
- Valores corporativos
- Equipo
- Línea de tiempo histórica

### Pie de Página (Footer)
- Información de la empresa
- Enlaces rápidos
- Contacto
- Redes sociales

## Funcionalidades JavaScript

### global.js
- Gestión de tema (claro/oscuro)
- Rastreo de eventos
- Formateo de precios
- Parámetros de URL

### index.js
- Menú móvil
- Animaciones de scroll

### productos.js
- Filtrado de productos
- Ordenamiento
- Sistema de favoritos

### contacto.js
- Validación de formulario
- Envío de datos

### mision-vision.js
- Animaciones de entrada
- Menú móvil

## Responsive Design

El proyecto es completamente responsivo con breakpoints en:
- 1024px (tablets)
- 768px (tablets pequeños)
- 480px (móviles)



## Personalización

Para personalizar los colores, edita las variables en `global.css`:

```css
:root {
    --color-primario: #d4af37;
    /* Otros colores aquí */
}
```

## Navegadores Soportados

- Chrome (último)
- Firefox (último)
- Safari (último)
- Edge (último)

## Notas de Desarrollo

- No hay dependencias externas (vanilla HTML, CSS, JavaScript)
- Las imágenes de productos provienen de URL externas (Supabase)
- El formulario de contacto es un prototipo (requiere backend para enviarse)

---
---
---

# 🏛️ Documentación Técnica de JavaScript: Pangea Relics

Este documento detalla la arquitectura lógica y el flujo de datos del sitio web **Pangea Relics**. El sistema utiliza una arquitectura híbrida de almacenamiento para gestionar la persistencia de datos globales y la seguridad de las sesiones individuales.

---

## 🏗️ Arquitectura de Scripts

### 1. `global.js` (Núcleo y Sesión)
Controla la estructura común del sitio y la persistencia de la sesión del usuario.
* **Componentes Dinámicos**: Carga el `header` y el `footer` mediante `fetch` desde la carpeta `/components/`.
* **Identidad Visual**: Verifica la sesión activa para inyectar el nombre del usuario y el botón de logout en el menú de navegación.

### 2. `productos.js` (Motor del Catálogo y Admin)
Es el archivo central que gestiona el inventario de piezas históricas.
* **Inventario (Seed)**: Define un array inicial de productos que se guarda en el navegador la primera vez que se visita el sitio.
* **Herramientas Administrativas**: Si el usuario es `admin`, el script habilita botones de **Editar** y **Eliminar** en cada tarjeta, además de inyectar la **Tarjeta de Creación** al final del catálogo.
* **Catalogación Profesional**: Utiliza un formulario modal dinámico que incluye:
    * **Validación Nativa**: Campos obligatorios y restricción de solo números en precios.
    * **Botón de Carga Personalizado**: Un diseño elegante que reemplaza al input de archivos nativo.
    * **Procesamiento de Imágenes**: Utiliza `FileReader` para convertir fotos locales en formato **Base64**, permitiendo que las nuevas piezas guarden su imagen directamente en el navegador.

### 3. `admin.js` (Seguridad de Acceso)
Filtro de entrada para las funciones de gestión.
* **Validación**: Compara la clave ingresada (Código: `1234`).
* **Elevación de Privilegios**: Al ingresar correctamente, establece la sesión administrativa en el almacenamiento volátil (`sessionStorage`).

### 4. `index.js` (Gestión de Inicio)
* **Sección Destacados**: Consulta el inventario, lo invierte cronológicamente y renderiza las 3 piezas más recientes para dar dinamismo a la página principal.

### 5. `login.js` & `registro.js` (Gestión de Usuarios)
Controlan el acceso y la base de datos de clientes.
* **Registro**: Crea perfiles de usuario validando que el correo no esté duplicado. Al finalizar con éxito, inicia la sesión automáticamente.
* **Login**: Valida las credenciales contra la base de datos local. Si son correctas, establece la identidad del usuario en la sesión activa.

---

## 🔐 Gestión de Almacenamiento e Identidad

El sistema utiliza una arquitectura de almacenamiento diferenciada para optimizar la seguridad y la persistencia:

| Recurso | Tipo de Almacenamiento | Persistencia |
| :--- | :--- | :--- |
| **Catálogo de Productos** | `localStorage` | Permanente (Datos Globales) |
| **Usuarios Registrados** | `localStorage` | Permanente (Datos Globales) |
| **Sesión de Usuario** | `sessionStorage` | **Volátil** (Solo pestaña actual) |

### 🔐 Notas sobre la Sesión Volátil
* **Aislamiento de Sesión (Session Isolation)**: El uso de `sessionStorage` permite que los datos de acceso sean exclusivos de la pestaña actual.
* **Beneficio Multicuenta**: Permite probar múltiples roles (Admin y Cliente) simultáneamente en diferentes pestañas sin interferencias.
* **Seguridad de Cierre**: La sesión se destruye automáticamente al cerrar la pestaña o la ventana del navegador, evitando que el acceso administrativo quede abierto por descuido.

---

## 🛠️ Guía de Mantenimiento para el Equipo

### Cómo agregar una pieza nueva (Flujo Admin)
1. Iniciar sesión como administrador (Código: `1234`).
2. Ir al final del catálogo y hacer clic en la tarjeta `+`.
3. Completar el formulario modal. El botón de fotografía abrirá el explorador de archivos local.
4. Al confirmar, la pieza se integrará automáticamente al archivo histórico de la tienda con su imagen procesada.

### Reset Completo del Sistema
Para restaurar el sitio a su estado original (borrar productos creados y usuarios registrados), ejecute este comando en la consola del navegador (`F12`):
```javascript
localStorage.clear();
sessionStorage.clear();
location.reload();