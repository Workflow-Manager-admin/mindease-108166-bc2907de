#!/bin/bash
cd /home/kavia/workspace/code-generation/mindease-108166-bc2907de/mindease
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

