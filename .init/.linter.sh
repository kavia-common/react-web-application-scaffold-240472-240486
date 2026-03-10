#!/bin/bash
cd /home/kavia/workspace/code-generation/react-web-application-scaffold-240472-240486/react_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

