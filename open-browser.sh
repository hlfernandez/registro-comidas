#!/bin/bash

# Script para abrir Rexistro en el navegador
# Uso: ./open-browser.sh

echo "🌐 Abriendo Rexistro en el navegador..."

# Intentar abrir en diferentes navegadores
if command -v google-chrome &> /dev/null; then
    google-chrome http://localhost:5174
elif command -v chromium-browser &> /dev/null; then
    chromium-browser http://localhost:5174
elif command -v firefox &> /dev/null; then
    firefox http://localhost:5174
elif command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:5174
else
    echo "No se pudo abrir el navegador automáticamente"
    echo "Abre manualmente: http://localhost:5174"
fi
