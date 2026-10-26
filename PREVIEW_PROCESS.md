# Revisión de cambios de la web

## Orden obligatorio

Cambios en una rama → publicar y comprobar preview → enviar el enlace a David → abrir PR → revisión y aprobación de David → fusionar solo cuando David autorice publicar.

Si el PR ya existe: corregir en su rama, actualizar y verificar la preview, y volver a enviar el enlace. Aprobar un PR no equivale a autorizar su fusión.

## Enlaces permanentes

- Índice de previews actuales: https://davidruizgarci.github.io/artmediterrani-preview-pr-2/previews/
- Versiones publicadas: https://davidruizgarci.github.io/artmediterrani-preview-pr-2/previews.json
- Automatización: https://github.com/davidruizgarci/artmediterrani-preview-pr-2/actions/workflows/previews.yml
- Producción: https://artmediterrani.github.io/

Cada rama tiene su propia dirección estable. El índice incluye el commit publicado. La raíz del sitio de preview conserva la copia inicial del PR #2; no usar esa raíz para revisar nuevas correcciones.

## Publicar y comprobar antes del PR

1. Subir la rama de cambios al repositorio de la web. No es necesario tener un PR.
2. En el repositorio de previews, abrir Actions → Website review previews → Run workflow → rama preview-pr-2. También se comprueba automáticamente cada diez minutos; GitHub puede retrasar o suspender ejecuciones programadas por inactividad. Si ocurre, usar Run workflow.
3. Esperar a que termine correctamente el despliegue. Si no hay cambios, una comprobación programada termina sin redesplegar.
4. Consultar previews.json, localizar el nombre exacto de la rama y abrir su path desde la URL base del sitio de preview.
5. Consultar preview.json dentro de esa carpeta: su sha debe coincidir con el último commit de la rama. Comprobar también las páginas modificadas, estilos, scripts e imágenes. Si alguien sube otro commit, repetir esta comprobación.
6. Enviar el enlace verificado a David antes de abrir un PR nuevo. Incluirlo después en la descripción del PR junto al commit publicado.

## Aislamiento y límites

La automatización vive en el repositorio independiente de previews. Solo puede desplegar su propio GitHub Pages; no tiene credenciales de escritura del repositorio de producción. Copia los archivos estáticos de las ramas públicas y no ejecuta código ni workflows de esas ramas. No necesita secretos personales.

Actualmente admite esta web estática: HTML, CSS, JS, imágenes, fuentes y PDF en la raíz y en assets/, es/, en/ o fr/. Si la web cambia de estructura o necesita un proceso de compilación, adaptar y validar primero la automatización.

Las previews son públicas, al igual que el repositorio de origen. Se actualizan por rama y no representan una aprobación. Las ramas eliminadas dejan de aparecer en el siguiente despliegue. El enlace de producción y su configuración no se modifican.
