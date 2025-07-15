<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Rexistro - PWA de Registro de Comidas

Este es un proyecto de Progressive Web App (PWA) desarrollado con React y Vite para registrar comidas por franja horaria.

## Características del proyecto

- **Framework**: React 18 con Vite
- **Estilo**: CSS3 vanilla con diseño responsive
- **PWA**: Configurado con vite-plugin-pwa
- **Almacenamiento**: LocalStorage del navegador
- **Franjas horarias**: Desayuno, Comida, Cena
- **Funcionalidades**: Registro, historial, sugerencias inteligentes

## Estructura de componentes

- `App.jsx`: Componente principal con gestión de estado
- `MealTabs.jsx`: Navegación entre franjas horarias
- `MealList.jsx`: Lista de comidas registradas
- `MealForm.jsx`: Formulario para registrar comidas
- `SuggestionModal.jsx`: Modal con sugerencias de comidas
- `storage.js`: Utilidades para almacenamiento local

## Convenciones de código

- Usar functional components con hooks
- Preferir const para declaraciones
- Usar destructuring para props
- Mantener componentes pequeños y focalizados
- Estilos en CSS vanilla, no CSS-in-JS
- Nombres de archivos en PascalCase para componentes
- Usar español para textos de UI

## Funcionalidades específicas

### Almacenamiento local
- Usar las funciones de `utils/storage.js`
- Datos persistentes entre sesiones
- Funciona offline

### Sugerencias inteligentes
- Basadas en comidas menos recientes
- Agrupadas por nombre de comida
- Máximo 3 sugerencias por franja

### PWA
- Instalable en dispositivos móviles
- Service Worker para cache
- Manifest.json configurado
- Iconos responsive

## Comando para desarrollo

```bash
npm run dev
```

## Entorno de desarrollo

Se usa conda para gestionar el entorno:
```bash
conda activate rexistro-dev
```
