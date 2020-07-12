#!/bin/bash

#/Users/fernandodoglio/.deno/bin/deno

DENO="$(which deno)"
SHEBANG="#!${DENO} run -A"
CODE="$(deno bundle index.ts)"

BOLD=$(tput bold)
NORMAL=$(tput sgr0)

echo "${SHEBANG}
${CODE}" > bundle/denorun.js 

chmod +x bundle/denorun.js 

echo "----------------------------------------------------------------------------------"
echo "Thanks for installing DenoRunner, copy the file in ${BOLD}bundle/denorun.js${NORMAL} to a folder 
you have in your PATH or add the following path to your PATH variable:

${BOLD}$(pwd)/bundle/${NORMAL}"
echo "----------------------------------------------------------------------------------"