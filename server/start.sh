#!/bin/sh

mkdir -p /app/data

# Copiar DB a memoria para evitar bloqueos
if [ ! -f /app/data/db.json ]; then
  cp /app/db.json /app/data/
fi

# Iniciar json-server
json-server --watch /app/data/db.json --host 0.0.0.0
