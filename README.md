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
│   │   ├── productos.js       # JavaScript galería de productos
│   │   ├── contacto.js        # JavaScript formulario
│   │   └── mision-vision.js   # JavaScript misión y visión
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

### Espaciados
- `--espaciado-xs`: 5px
- `--espaciado-sm`: 10px
- `--espaciado-md`: 15px
- `--espaciado-lg`: 20px
- `--espaciado-xl`: 40px
- `--espaciado-2xl`: 60px
- `--espaciado-3xl`: 80px
- `--espaciado-4xl`: 120px

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

## Convenciones de Código

- **HTML**: Nombres de clases en español descriptivos
  - Ejemplo: `contenedor-encabezado`, `tarjeta-producto`
  
- **CSS**: Variables con prefijo `--` en español
  - Ejemplo: `--color-primario`, `--espaciado-lg`
  
- **JavaScript**: Funciones descriptivas en camelCase
  - Ejemplo: `inicializarMenuMobile()`, `validarYEnviarFormulario()`

## Cómo Usar

1. **Abrir en navegador**: Abre `index.html` en tu navegador
2. **Navegar**: Usa el menú de navegación para ir entre páginas
3. **Responsive**: Redimensiona la ventana para ver el diseño adaptativo

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
