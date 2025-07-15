# 🍽️ Rexistro - Registro de Comidas

Una Progressive Web App (PWA) para registrar comidas por franja horaria, desarrollada con React y Vite.

## 📱 Características

- **3 Franjas horarias**: Desayuno, Comida y Cena
- **Registro de comidas**: Añade comidas con nombre, descripción y fecha
- **Historial**: Consulta las comidas registradas por franja
- **Sugerencias inteligentes**: Obtén sugerencias basadas en las comidas menos recientes
- **Almacenamiento local**: Todos los datos se guardan en el navegador
- **PWA**: Instalable en Android y otros dispositivos desde el navegador
- **Responsive**: Diseño optimizado para móviles y escritorio

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 20+ (gestionado con conda)
- npm
- Git

### Configuración del Entorno Conda

1. **Crear el entorno conda:**
```bash
conda env create -f environment.yml
```

2. **Activar el entorno:**
```bash
conda activate rexistro-dev
```

### Instalación de Dependencias

```bash
# Instalar dependencias de Node.js
npm install
```

## 🛠️ Desarrollo

### Servidor de desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Desarrollo con live-server (alternativo)

```bash
# Construir la aplicación
npm run build

# Servir con live-server
npx live-server dist/
```

### Scripts disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run preview` - Previsualizar build de producción
- `npm run lint` - Ejecutar ESLint

## 🧪 Probar en Local

### Opción 1: Servidor de desarrollo (Recomendado)

La forma más rápida para desarrollar y probar:

```bash
# Usar el script automático
./start-dev.sh
```

O manualmente:
```bash
# Activar entorno conda
conda activate rexistro-dev

# Iniciar servidor de desarrollo
npm run dev
```

**Ventajas:**
- Recarga automática (Hot Module Replacement)
- Desarrollo más rápido
- Disponible en `http://localhost:5173`

### Opción 2: Build de producción + Preview

Para probar como sería en producción:

```bash
# Usar el script automático
./build-and-preview.sh
```

O manualmente:
```bash
# Activar entorno conda
conda activate rexistro-dev

# Construir el proyecto
npm run build

# Previsualizar
npm run preview
```

**Ventajas:**
- Versión optimizada de producción
- Funcionalidad PWA completa
- Disponible en `http://localhost:4173`

### Opción 3: Live-server

Para simular un servidor web estático:

```bash
# Usar el script automático
./serve-with-live-server.sh
```

O manualmente:
```bash
# Activar entorno conda
conda activate rexistro-dev

# Construir el proyecto
npm run build

# Instalar live-server (si no está instalado)
npm install -g live-server

# Servir con live-server
live-server dist/
```

**Ventajas:**
- Simula GitHub Pages
- Recarga automática
- Disponible en `http://127.0.0.1:8080`

### 🔧 Resolución de problemas

#### Error: "conda: command not found"
```bash
# Inicializar conda en tu shell
conda init bash
# Reiniciar terminal o ejecutar:
source ~/.bashrc
```

#### Error: "npm: command not found"
```bash
# Crear el entorno conda primero
conda env create -f environment.yml
conda activate rexistro-dev
```

#### Error: "Environment 'rexistro-dev' not found"
```bash
# Recrear el entorno
conda env create -f environment.yml
```

#### Problemas con permisos
```bash
# Dar permisos a los scripts
chmod +x *.sh
```

### 📱 Probar funcionalidad PWA

Para probar la funcionalidad PWA completa:

1. **Usa la Opción 2 o 3** (build de producción)
2. **Abre en Chrome/Edge** (mejor soporte PWA)
3. **Busca el ícono de instalación** en la barra de direcciones
4. **Instala la aplicación** como PWA
5. **Prueba funcionalidad offline** (desconecta internet)

### 🎯 Recomendaciones para desarrollo

- **Desarrollo activo**: Usa `npm run dev` (Opción 1)
- **Probar PWA**: Usa `npm run preview` (Opción 2)
- **Simular producción**: Usa `live-server` (Opción 3)

## 📦 Compilación

### Build de producción

```bash
npm run build
```

Los archivos compilados se generarán en la carpeta `dist/`.

### Verificar PWA

```bash
# Previsualizar build con servidor local
npm run preview
```

## 🚀 Despliegue

### GitHub Pages

1. **Configurar GitHub Pages:**
   - Ve a Settings → Pages en tu repositorio
   - Selecciona "GitHub Actions" como fuente

2. **Crear workflow de GitHub Actions:**
   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '20'
         - run: npm ci
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

3. **Push al repositorio:**
   ```bash
   git add .
   git commit -m "Deploy PWA to GitHub Pages"
   git push origin main
   ```

### Despliegue manual

```bash
# Construir la aplicación
npm run build

# Los archivos en dist/ pueden ser servidos desde cualquier servidor web estático
```

## 📱 Instalación como PWA

### En Android

1. Abre la aplicación en Chrome
2. Toca el menú (⋮) → "Añadir a pantalla de inicio"
3. Confirma la instalación

### En escritorio

1. Abre la aplicación en Chrome/Edge
2. Busca el ícono de instalación en la barra de direcciones
3. Haz clic en "Instalar"

## 🏗️ Estructura del Proyecto

```
rexistro/
├── public/                 # Archivos estáticos
│   ├── vite.svg
│   └── pwa-*.png          # Iconos PWA
├── src/
│   ├── components/        # Componentes React
│   │   ├── MealTabs.jsx
│   │   ├── MealList.jsx
│   │   ├── MealForm.jsx
│   │   ├── SuggestionModal.jsx
│   │   └── MealTabs.css
│   ├── utils/
│   │   └── storage.js     # Gestión almacenamiento local
│   ├── App.jsx           # Componente principal
│   ├── App.css          # Estilos principales
│   ├── index.css        # Estilos globales
│   └── main.jsx         # Punto de entrada
├── environment.yml       # Configuración conda
├── vite.config.js       # Configuración Vite + PWA
├── package.json
└── README.md
```

## 🔧 Tecnologías Utilizadas

- **React 18** - Framework de UI
- **Vite** - Build tool y dev server
- **PWA Plugin** - Funcionalidad PWA
- **CSS3** - Estilos con diseño responsive
- **LocalStorage** - Almacenamiento de datos
- **Conda** - Gestión de entorno de desarrollo

## 📊 Funcionalidades

### Registro de Comidas
- Nombre de la comida
- Descripción opcional
- Fecha de consumo
- Clasificación por franja horaria

### Sugerencias Inteligentes
- Basadas en las comidas menos recientes
- Agrupadas por nombre de comida
- Máximo 3 sugerencias por franja

### Almacenamiento Local
- Persistencia de datos sin servidor
- Funciona offline
- Datos seguros en el dispositivo

## 🐛 Resolución de Problemas

### La aplicación no se instala como PWA
- Verifica que se sirva desde HTTPS (GitHub Pages lo hace automáticamente)
- Comprueba que el manifest.json se genera correctamente
- Revisa la consola del navegador en busca de errores

### Problemas con el entorno conda
```bash
# Recrear el entorno
conda env remove -n rexistro-dev
conda env create -f environment.yml
```

### Problemas de build
```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules
npm install
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Si tienes problemas o preguntas, abre un issue en el repositorio de GitHub.

---

Desarrollado con ❤️ para una mejor gestión de comidas diarias.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
