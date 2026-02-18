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

## Autor
Proyecto creado para Pangea Relics - 2026
---
---R

# 🛠️ Documentación: Sistema de Autenticación y Persistencia

Esta sección describe la lógica de JavaScript implementada para la gestión de usuarios, sesiones y persistencia de datos en el proyecto **Pangea Relics**.

## 🗄️ Arquitectura del Almacenamiento (The Store)

El sistema utiliza la **Web Storage API (LocalStorage)** para emular una base de datos en el cliente. Se gestionan dos estructuras principales:

1.  **`usuarios` (Database Store):** Un `Array` de objetos que almacena la información de todas las cuentas registradas. Permite la persistencia de múltiples usuarios simultáneamente.
2.  **`usuarioSesion` (Session Store):** Un `Object` que actúa como indicador de sesión activa. Su existencia determina si el usuario tiene acceso a funcionalidades extendidas (como compras).



---

## 🚀 Lógica de los Módulos JS

### 1. Registro de Usuarios (`registro.js`)
El proceso de registro sigue un flujo de validación y almacenamiento seguro:

* **Captura de Datos:** Obtiene los valores de los inputs y aplica `.trim()` para limpiar espacios en blanco innecesarios.
* **Validación de Duplicados:** Antes de insertar un nuevo objeto, el script utiliza el método `.find()` sobre el arreglo de usuarios para verificar si el correo electrónico ya existe.
* **Serialización:** Dado que `localStorage` solo admite strings, se utiliza `JSON.stringify()` para convertir el objeto de usuario antes de guardarlo.

### 2. Control de Sesión Global (`global.js`)
Este es el núcleo del sistema y se encarga de la reactividad de la interfaz:

* **Carga Asíncrona:** Utiliza `fetch()` para cargar componentes reutilizables (Header/Footer).
* **Gestión de Estado Dinámico:** Al cargar el Header, el script verifica la presencia de `usuarioSesion`.
    * **Si existe:** Modifica el DOM para ocultar los botones de *Login/Register*, inyecta un saludo personalizado y activa la funcionalidad de *Logout*.
    * **Si no existe:** Mantiene los botones de acceso por defecto.
* **Cierre de Sesión:** El método `removeItem('usuarioSesion')` destruye el objeto de sesión y recarga la página para restaurar el estado anónimo.



### 3. Middleware de Compra (`productos.js`)
Actúa como una barrera de seguridad en la experiencia de usuario:

* **Intercepción:** La función `intentarCompra()` evalúa el estado de la sesión en tiempo real.
* **Redirección Condicional:** Si el usuario no está autenticado, el sistema bloquea la acción, lanza una alerta y redirige automáticamente a `login.html`.

---

## 🛠️ Métodos y Funciones Clave

| Función / Método | Descripción |
| :--- | :--- |
| `JSON.parse()` | Transforma las cadenas del Storage en objetos/arreglos de JS. |
| `JSON.stringify()` | Convierte estructuras de JS en cadenas para su almacenamiento. |
| `.find()` | Algoritmo de búsqueda utilizado para autenticar credenciales y evitar duplicados. |
| `fetch()` | Método asíncrono para la inyección dinámica de componentes HTML. |
| `Date.now()` | Utilizado para generar IDs únicos para cada objeto de usuario. |

---

## 🧪 Cómo Verificar el Store
Para auditar el funcionamiento del sistema desde el navegador:
1. Abrir herramientas de desarrollador (`F12`).
2. Ir a la pestaña **Application** (Aplicación).
3. Seleccionar **Local Storage** en el menú lateral.
4. Observar las llaves `usuarios` y `usuarioSesion` mientras se interactúa con el flujo de registro y login.