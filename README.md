# 🥜 Fruto Bravo - Tienda Online

Tienda online de frutos secos, especias y harinas premium con diseño moderno y energético.

## ✨ Características

- 🛒 **Catálogo de productos** con imágenes y descripciones
- 👨‍💼 **Panel de administración** para gestión de productos
- 🎨 **Diseño creativo y divertido** con elementos de cómic
- 💪 **Mascota animada** (nuez musculosa corriendo)
- 📱 **Responsive design** para móviles y tablets
- ⚡ **Súper poderes** (propuestas de valor estilo power-ups)
- 🏪 **Venta minorista y mayorista**

## 🎯 Diseño

El diseño refleja la personalidad **BRAVO** de la marca:

- Burbuja de diálogo animada con mensaje motivador
- Íconos flotantes energéticos (rayo, estrella, corazón)
- Título hero con efecto de brillo pulsante
- Tarjetas estilo power-ups de videojuego
- Badges dinámicos en productos
- Animaciones suaves y micro-interacciones

## 🛠️ Tecnologías

- **Framework**: Next.js 15
- **UI Library**: React 19
- **Lenguaje**: TypeScript
- **Estilos**: CSS Modules + Global CSS
- **Iconos**: Lucide React
- **Fuentes**: Google Fonts (Outfit)

## 📦 Instalación

### Requisitos

- Node.js 18 o superior
- npm o yarn

### Pasos

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo en puerto 3000

# Producción
npm run build        # Crea build optimizado
npm start            # Inicia servidor de producción

# Utilidades
npm run lint         # Ejecuta ESLint
```

## 📁 Estructura del Proyecto

```
web/
├── src/
│   ├── app/                    # Páginas y rutas de Next.js
│   │   ├── page.tsx            # Página de inicio
│   │   ├── page.module.css     # Estilos del home
│   │   ├── globals.css         # Estilos globales
│   │   ├── tienda/             # Página de tienda
│   │   ├── mayorista/          # Página mayorista
│   │   └── admin/              # Panel de administración
│   │
│   └── components/             # Componentes reutilizables
│       ├── Navbar.tsx          # Barra de navegación
│       ├── Footer.tsx          # Pie de página
│       └── Mascot.tsx          # Mascota animada
│
├── public/                     # Assets estáticos
│   ├── uploads/                # Imágenes de productos subidas
│   ├── placeholder/            # Imágenes de ejemplo
│   ├── logo-fruto-bravo.png    # Logo principal
│   └── walnut-mascot.png       # Mascota
│
├── package.json                # Dependencias
├── tsconfig.json               # Configuración TypeScript
└── next.config.ts              # Configuración Next.js
```

## 🎨 Paleta de Colores

```css
--primary: #F26622;        /* Naranja vibrante (Fruto Bravo) */
--primary-hover: #D9541E;  /* Naranja oscuro */
--secondary: #D4AF37;      /* Dorado (Premium) */
--background: #FFFFFF;     /* Blanco puro */
--text-main: #1F2937;      /* Gris oscuro */
```

## 🌟 Características Destacadas

### Hero Section
- Slider automático de imágenes
- Burbuja de diálogo animada "¡Sé BRAVO! 💪"
- Íconos flotantes con animaciones
- Texto con efecto de brillo pulsante
- Badges con glassmorphism

### Súper Poderes
- Poder Verde: 100% Natural
- Poder Dorado: Precios Mayoristas
- Poder Azul: Envíos Rápidos
- Animación de rotación 360° al hover

### Productos
- Badges dinámicos (🔥 TOP, ⚡ NUEVO, 💪 POWER, 👑 PREMIUM)
- Efecto de zoom en imágenes
- Botón "+" con animación de rotación
- Cards con elevación al hover

## 📱 Responsive

El diseño se adapta a:
- 📱 Móviles (< 768px)
- 💻 Tablets (768px - 1024px)
- 🖥️ Desktop (> 1024px)

## 🚀 Deployment

### Vercel (Recomendado)

```bash
# Conectar con Vercel
vercel

# Deploy a producción
vercel --prod
```

### Otras Opciones

- **Netlify**: Conecta tu repositorio de GitHub
- **AWS**: Usa AWS Amplify
- **Servidor propio**: Ejecuta `npm run build` y `npm start`

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env.local` (no se sube a GitHub):

```env
# Ejemplo
NEXT_PUBLIC_API_URL=https://api.ejemplo.com
```

## 📊 Datos

### Imágenes de Productos

Las imágenes se almacenan en `public/uploads/`. Actualmente incluye:
- Nueces, almendras, avellanas
- Pasas de uva, ciruelas, orejones
- Dátiles, banana chips
- Pistachos, mix tropical, mix europeo

## 🤝 Contribuir

Este es un proyecto privado. Para contribuir:

1. Crea una rama nueva
2. Haz tus cambios
3. Crea un pull request

## 📝 Licencia

Privado - Todos los derechos reservados © 2026 Fruto Bravo

## 📞 Contacto

Para consultas sobre el proyecto, contacta al administrador.

---

**Desarrollado con ❤️ para Fruto Bravo**
