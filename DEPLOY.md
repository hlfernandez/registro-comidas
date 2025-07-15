# Rexistro Deploy Configuration

## GitHub Pages

Para desplegar en GitHub Pages, el proyecto ya incluye el workflow de GitHub Actions en `.github/workflows/deploy.yml`.

### Pasos para el deploy:

1. **Crear repositorio en GitHub** (si no existe)
2. **Subir el código:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Rexistro PWA"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/rexistro.git
   git push -u origin main
   ```

3. **Configurar GitHub Pages:**
   - Ve a Settings → Pages
   - Selecciona "GitHub Actions" como fuente
   - El workflow se ejecutará automáticamente

4. **Verificar el deploy:**
   - La aplicación estará disponible en: `https://TU_USUARIO.github.io/rexistro/`

## Deploy local con live-server

Para probar localmente como si fuera un servidor web estático:

```bash
# Instalar live-server globalmente (opcional)
npm install -g live-server

# Construir el proyecto
npm run build

# Servir con live-server
live-server dist/
```

## Deploy en otros servicios

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## Notas importantes

- El proyecto está configurado con `base: './'` para funcionar en subdirectorios
- Los iconos PWA están en formato SVG para mejor compatibilidad
- El Service Worker se genera automáticamente con Vite PWA Plugin
- La aplicación funciona offline después de la primera carga
