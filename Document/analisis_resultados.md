# Análisis descriptivo de la encuesta (usabilidad y accesibilidad)

Este reporte es **descriptivo**: resume frecuencias, distribuciones y promedios. No propone soluciones, no define requerimientos y no incluye conclusiones finales del sistema.

## Paso 1 — Cargar el dataset limpio

Código:

```python
import pandas as pd
from pathlib import Path

path = Path('Document') / 'dataset_limpio.xlsx'
df = pd.read_excel(path)
```

Qué hace cada línea:

- Importa pandas y Path para manejar datos y rutas.
- Lee el Excel limpio y lo guarda en `df` (tabla en memoria).

## Paso 2 — Entender la estructura (3 bloques por persona)

Este archivo tiene **3 bloques** repetidos: cada bloque comienza con “¿Qué herramienta estás evaluando?” y luego vienen 15 preguntas. Para comparar herramientas, conviene convertirlo a formato **largo**: 1 fila = 1 evaluación de 1 herramienta.

### Cobertura del dataset

- Respuestas originales (filas): **128**

- Evaluaciones en formato largo (filas): **384**

Etiquetas de herramienta detectadas en el archivo (originales):

| herramienta_original | evaluaciones |
| --- | --- |
| Duolingo | 140 |
| Grammar Ninja | 125 |
| British Council Games | 119 |

Evaluaciones por herramienta:

| herramienta | evaluaciones |
| --- | --- |
| Duolingo | 140 |
| Grammar Ninja | 125 |
| Johnny Grammar | 119 |

Nota: para facilitar la comparación, se aplicaron aliases a nombres de herramienta (por ejemplo, 'British Council Games' → 'Johnny Grammar'). Ajustable en TOOL_ALIASES.

## Paso 3 — Frecuencias, distribución y promedios (preguntas numéricas)

En preguntas con escala numérica (por ejemplo 1–5), se reporta:
- **Frecuencia**: cuántas veces aparece cada valor
- **Distribución**: resumen estadístico (min/mediana/max, etc.)
- **Promedio**: media (y comparación por herramienta)

### 1. La herramienta fue fácil de usar

Frecuencia (global):

| 1. La herramienta fue fácil de usar | frecuencia | porcentaje |
| --- | --- | --- |
| 1 | 13.0 | 3.4 |
| 2 | 15.0 | 3.9 |
| 3 | 61.0 | 15.9 |
| 4 | 98.0 | 25.5 |
| 5 | 197.0 | 51.3 |

Distribución (global):

|  | valor |
| --- | --- |
| count | 384.0 |
| mean | 4.174479166666667 |
| std | 1.0513076475512892 |
| min | 1.0 |
| 25% | 4.0 |
| 50% | 5.0 |
| 75% | 5.0 |
| max | 5.0 |

Resumen por herramienta (count/mean/median/std/min/max):

| herramienta | count | mean | median | std | min | max |
| --- | --- | --- | --- | --- | --- | --- |
| Duolingo | 140.0 | 4.443 | 5.0 | 1.054 | 1.0 | 5.0 |
| Grammar Ninja | 125.0 | 4.104 | 4.0 | 1.007 | 1.0 | 5.0 |
| Johnny Grammar | 119.0 | 3.933 | 4.0 | 1.031 | 1.0 | 5.0 |

### 3. La herramienta me pareció innecesariamente compleja.

Frecuencia (global):

| 3. La herramienta me pareció innecesariamente compleja. | frecuencia | porcentaje |
| --- | --- | --- |
| 1 | 189.0 | 49.2 |
| 2 | 78.0 | 20.3 |
| 3 | 59.0 | 15.4 |
| 4 | 31.0 | 8.1 |
| 5 | 27.0 | 7.0 |

Distribución (global):

|  | valor |
| --- | --- |
| count | 384.0 |
| mean | 2.0338541666666665 |
| std | 1.2667261062619124 |
| min | 1.0 |
| 25% | 1.0 |
| 50% | 2.0 |
| 75% | 3.0 |
| max | 5.0 |

Resumen por herramienta (count/mean/median/std/min/max):

| herramienta | count | mean | median | std | min | max |
| --- | --- | --- | --- | --- | --- | --- |
| Duolingo | 140.0 | 1.75 | 1.0 | 1.151 | 1.0 | 5.0 |
| Grammar Ninja | 125.0 | 2.128 | 2.0 | 1.27 | 1.0 | 5.0 |
| Johnny Grammar | 119.0 | 2.269 | 2.0 | 1.338 | 1.0 | 5.0 |

### 5. Encontré inconsistencias en el funcionamiento de la herramienta.

Frecuencia (global):

| 5. Encontré inconsistencias en el funcionamiento de la herramienta. | frecuencia | porcentaje |
| --- | --- | --- |
| 1 | 188.0 | 49.0 |
| 2 | 73.0 | 19.0 |
| 3 | 59.0 | 15.4 |
| 4 | 37.0 | 9.6 |
| 5 | 27.0 | 7.0 |

Distribución (global):

|  | valor |
| --- | --- |
| count | 384.0 |
| mean | 2.0677083333333335 |
| std | 1.28887546197602 |
| min | 1.0 |
| 25% | 1.0 |
| 50% | 2.0 |
| 75% | 3.0 |
| max | 5.0 |

Resumen por herramienta (count/mean/median/std/min/max):

| herramienta | count | mean | median | std | min | max |
| --- | --- | --- | --- | --- | --- | --- |
| Duolingo | 140.0 | 1.957 | 1.0 | 1.302 | 1.0 | 5.0 |
| Grammar Ninja | 125.0 | 2.264 | 2.0 | 1.296 | 1.0 | 5.0 |
| Johnny Grammar | 119.0 | 1.992 | 1.0 | 1.252 | 1.0 | 5.0 |

### 7. Las actividades del juego me ayudaron a comprender mejor el contenido en inglés.

Frecuencia (global):

| 7. Las actividades del juego me ayudaron a comprender mejor el contenido en inglés. | frecuencia | porcentaje |
| --- | --- | --- |
| 1 | 17.0 | 4.4 |
| 2 | 26.0 | 6.8 |
| 3 | 67.0 | 17.4 |
| 4 | 113.0 | 29.4 |
| 5 | 161.0 | 41.9 |

Distribución (global):

|  | valor |
| --- | --- |
| count | 384.0 |
| mean | 3.9765625 |
| std | 1.1250634591907545 |
| min | 1.0 |
| 25% | 3.0 |
| 50% | 4.0 |
| 75% | 5.0 |
| max | 5.0 |

Resumen por herramienta (count/mean/median/std/min/max):

| herramienta | count | mean | median | std | min | max |
| --- | --- | --- | --- | --- | --- | --- |
| Duolingo | 140.0 | 4.179 | 5.0 | 1.075 | 1.0 | 5.0 |
| Grammar Ninja | 125.0 | 3.872 | 4.0 | 1.107 | 1.0 | 5.0 |
| Johnny Grammar | 119.0 | 3.849 | 4.0 | 1.176 | 1.0 | 5.0 |

### 9. El uso del juego hizo que la actividad fuera más interesante que una actividad tradicional de clase.

Frecuencia (global):

| 9. El uso del juego hizo que la actividad fuera más interesante que una actividad tradicional de clase. | frecuencia | porcentaje |
| --- | --- | --- |
| 1 | 27.0 | 7.0 |
| 2 | 36.0 | 9.4 |
| 3 | 67.0 | 17.4 |
| 4 | 83.0 | 21.6 |
| 5 | 171.0 | 44.5 |

Distribución (global):

|  | valor |
| --- | --- |
| count | 384.0 |
| mean | 3.8723958333333335 |
| std | 1.2710344010493975 |
| min | 1.0 |
| 25% | 3.0 |
| 50% | 4.0 |
| 75% | 5.0 |
| max | 5.0 |

Resumen por herramienta (count/mean/median/std/min/max):

| herramienta | count | mean | median | std | min | max |
| --- | --- | --- | --- | --- | --- | --- |
| Duolingo | 140.0 | 4.286 | 5.0 | 1.114 | 1.0 | 5.0 |
| Grammar Ninja | 125.0 | 3.712 | 4.0 | 1.288 | 1.0 | 5.0 |
| Johnny Grammar | 119.0 | 3.555 | 4.0 | 1.306 | 1.0 | 5.0 |

### 11. El juego facilitó mi participación durante la actividad.

Frecuencia (global):

| 11. El juego facilitó mi participación durante la actividad. | frecuencia | porcentaje |
| --- | --- | --- |
| 1 | 14.0 | 3.6 |
| 2 | 33.0 | 8.6 |
| 3 | 53.0 | 13.8 |
| 4 | 107.0 | 27.9 |
| 5 | 177.0 | 46.1 |

Distribución (global):

|  | valor |
| --- | --- |
| count | 384.0 |
| mean | 4.041666666666667 |
| std | 1.128011875820923 |
| min | 1.0 |
| 25% | 3.0 |
| 50% | 4.0 |
| 75% | 5.0 |
| max | 5.0 |

Resumen por herramienta (count/mean/median/std/min/max):

| herramienta | count | mean | median | std | min | max |
| --- | --- | --- | --- | --- | --- | --- |
| Duolingo | 140.0 | 4.357 | 5.0 | 1.004 | 1.0 | 5.0 |
| Grammar Ninja | 125.0 | 3.992 | 4.0 | 1.081 | 1.0 | 5.0 |
| Johnny Grammar | 119.0 | 3.723 | 4.0 | 1.221 | 1.0 | 5.0 |

## Paso 4 — Comparación entre herramientas (resumen)

Tabla de promedios por herramienta para **todas** las preguntas numéricas. Útil para comparar tendencias generales sin interpretar texto.

|  | Duolingo | Grammar Ninja | Johnny Grammar |
| --- | --- | --- | --- |
| 1. La herramienta fue fácil de usar | 4.443 | 4.104 | 3.933 |
| 3. La herramienta me pareció innecesariamente compleja. | 1.75 | 2.128 | 2.269 |
| 5. Encontré inconsistencias en el funcionamiento de la herramienta. | 1.957 | 2.264 | 1.992 |
| 7. Las actividades del juego me ayudaron a comprender mejor el contenido en inglés. | 4.179 | 3.872 | 3.849 |
| 9. El uso del juego hizo que la actividad fuera más interesante que una actividad tradicional de clase. | 4.286 | 3.712 | 3.555 |
| 11. El juego facilitó mi participación durante la actividad. | 4.357 | 3.992 | 3.723 |

## Paso 4.1 — Patrones por dimensión (agrupación de preguntas numéricas)

Esta sección agrupa preguntas en dimensiones para facilitar la lectura. Es un resumen **descriptivo**; no implica causalidad ni recomendaciones.

|  | Duolingo | Grammar Ninja | Johnny Grammar |
| --- | --- | --- | --- |
| Facilidad de uso (Q1, más alto = más fácil) | 4.443 | 4.104 | 3.933 |
| Complejidad percibida (Q3, más alto = más compleja) | 1.75 | 2.128 | 2.269 |
| Inconsistencias (Q5, más alto = más inconsistencias) | 1.957 | 2.264 | 1.992 |
| Apoyo al aprendizaje (Q7, más alto = mayor acuerdo) | 4.179 | 3.872 | 3.849 |
| Interés (Q9, más alto = más interesante) | 4.286 | 3.712 | 3.555 |
| Participación (Q11, más alto = más participación) | 4.357 | 3.992 | 3.723 |

## Paso 5 — Preguntas abiertas (texto): cómo analizarlas sin leer caso por caso

Para respuestas abiertas, aquí se usa un enfoque **agregado** (sin mostrar respuestas individuales):
- Conteo de respuestas no vacías
- Distribución de longitud (aprox. cuánto escriben)
- Palabras más frecuentes (quitando stopwords comunes)
- Palabras más frecuentes por herramienta


### Resumen agregado de palabras clave (todas las respuestas abiertas)

Conteo de palabras clave por herramienta (sirve como indicador descriptivo de temas mencionados).

| grupo | Duolingo | Grammar Ninja | Johnny Grammar |
| --- | --- | --- | --- |
| Accesibilidad/claridad (palabras) | 92.0 | 166.0 | 135.0 |
| Interacción/errores (palabras) | 41.0 | 39.0 | 41.0 |

### 2. Si tuviste dificultades al usar la herramienta, explica qué aspectos fueron complicados.

- Respuestas no nulas (en formato largo): **379**

Distribución de longitud (caracteres):

|  | valor |
| --- | --- |
| count | 379.0 |
| mean | 37.38 |
| std | 52.77 |
| min | 1.0 |
| 25% | 7.0 |
| 50% | 18.0 |
| 75% | 36.5 |
| max | 289.0 |

Palabras más frecuentes (global):

| palabra | frecuencia |
| --- | --- |
| tuve | 68 |
| ninguna | 62 |
| dificultades | 44 |
| ninguno | 35 |
| complicado | 23 |
| intuitiva | 20 |
| dificultad | 20 |
| usar | 18 |
| poco | 15 |
| interfaz | 14 |
| entender | 13 |
| herramienta | 12 |

Palabras más frecuentes por herramienta (tabla):

| palabra | Duolingo | Grammar Ninja | Johnny Grammar |
| --- | --- | --- | --- |
| tuve | 35.0 | 15.0 | 18.0 |
| ninguna | 19.0 | 23.0 | 20.0 |
| dificultades | 19.0 | 11.0 | 14.0 |
| ninguno | 15.0 | 13.0 | 7.0 |
| complicado | 10.0 | 8.0 | 0.0 |
| intuitiva | 10.0 | 0.0 | 7.0 |
| usar | 9.0 | 0.0 | 6.0 |
| complicaciones | 6.0 | 0.0 | 0.0 |
| poco | 0.0 | 9.0 | 6.0 |
| dificultad | 0.0 | 8.0 | 6.0 |
| interfaz | 0.0 | 6.0 | 0.0 |

### 4. Si consideras que la herramienta fue compleja, describe qué elementos fueron confusos.

- Respuestas no nulas (en formato largo): **378**

Distribución de longitud (caracteres):

|  | valor |
| --- | --- |
| count | 378.0 |
| mean | 31.91 |
| std | 42.19 |
| min | 1.0 |
| 25% | 7.0 |
| 50% | 15.5 |
| 75% | 35.0 |
| max | 296.0 |

Palabras más frecuentes (global):

| palabra | frecuencia |
| --- | --- |
| compleja | 94 |
| ninguno | 45 |
| ninguna | 28 |
| confuso | 16 |
| hubo | 13 |
| nada | 12 |
| herramienta | 11 |
| complejo | 11 |
| usar | 10 |
| complejidad | 9 |
| intuitiva | 9 |
| confusa | 9 |

Palabras más frecuentes por herramienta (tabla):

| palabra | Duolingo | Grammar Ninja | Johnny Grammar |
| --- | --- | --- | --- |
| compleja | 39.0 | 23.0 | 32.0 |
| ninguno | 24.0 | 11.0 | 10.0 |
| ninguna | 10.0 | 11.0 | 7.0 |
| confuso | 8.0 | 5.0 | 0.0 |
| elementos | 5.0 | 0.0 | 0.0 |
| hubo | 5.0 | 0.0 | 0.0 |
| nada | 4.0 | 0.0 | 6.0 |
| usar | 4.0 | 0.0 | 0.0 |
| bien | 0.0 | 5.0 | 0.0 |
| claras | 0.0 | 5.0 | 0.0 |
| confusa | 0.0 | 5.0 | 0.0 |
| juego | 0.0 | 5.0 | 0.0 |
| herramienta | 0.0 | 0.0 | 6.0 |
| intuitiva | 0.0 | 0.0 | 5.0 |
| complejo | 0.0 | 0.0 | 4.0 |
| interfaz | 0.0 | 0.0 | 4.0 |

### 6. Describe qué inconsistencias encontraste (por ejemplo: botones que no funcionan, instrucciones poco claras, errores en el juego, etc.).

- Respuestas no nulas (en formato largo): **379**

Distribución de longitud (caracteres):

|  | valor |
| --- | --- |
| count | 379.0 |
| mean | 40.65 |
| std | 56.34 |
| min | 1.0 |
| 25% | 7.0 |
| 50% | 23.0 |
| 75% | 40.0 |
| max | 461.0 |

Palabras más frecuentes (global):

| palabra | frecuencia |
| --- | --- |
| ninguna | 67 |
| inconsistencias | 49 |
| instrucciones | 48 |
| encontré | 43 |
| poco | 37 |
| claras | 33 |
| ninguno | 29 |
| botones | 25 |
| bien | 21 |
| inconsistencia | 19 |
| nada | 16 |
| errores | 15 |

Palabras más frecuentes por herramienta (tabla):

| palabra | Duolingo | Grammar Ninja | Johnny Grammar |
| --- | --- | --- | --- |
| ninguna | 30.0 | 20.0 | 17.0 |
| encontré | 17.0 | 14.0 | 12.0 |
| inconsistencias | 16.0 | 14.0 | 19.0 |
| ninguno | 9.0 | 0.0 | 13.0 |
| inconsistencia | 9.0 | 0.0 | 0.0 |
| bien | 8.0 | 9.0 | 0.0 |
| errores | 7.0 | 0.0 | 0.0 |
| nada | 7.0 | 0.0 | 0.0 |
| instrucciones | 0.0 | 30.0 | 13.0 |
| claras | 0.0 | 20.0 | 10.0 |
| poco | 0.0 | 19.0 | 15.0 |
| botones | 0.0 | 13.0 | 8.0 |

### 8. Explica por qué consideras que el juego ayudó o no ayudó a tu aprendizaje.

- Respuestas no nulas (en formato largo): **384**

Distribución de longitud (caracteres):

|  | valor |
| --- | --- |
| count | 384.0 |
| mean | 70.01 |
| std | 68.3 |
| min | 1.0 |
| 25% | 24.75 |
| 50% | 51.0 |
| 75% | 86.0 |
| max | 484.0 |

Palabras más frecuentes (global):

| palabra | frecuencia |
| --- | --- |
| ayudó | 67 |
| palabras | 45 |
| ayudo | 45 |
| ayuda | 44 |
| juego | 35 |
| aprender | 34 |
| vocabulario | 33 |
| aprendizaje | 33 |
| inglés | 26 |
| son | 19 |
| nivel | 18 |
| entender | 18 |

Palabras más frecuentes por herramienta (tabla):

| palabra | Duolingo | Grammar Ninja | Johnny Grammar |
| --- | --- | --- | --- |
| ayudó | 28.0 | 24.0 | 15.0 |
| ayuda | 24.0 | 10.0 | 10.0 |
| palabras | 21.0 | 14.0 | 10.0 |
| ayudo | 19.0 | 15.0 | 11.0 |
| aprender | 17.0 | 12.0 | 0.0 |
| vocabulario | 16.0 | 0.0 | 11.0 |
| aprendizaje | 12.0 | 0.0 | 12.0 |
| inglés | 12.0 | 0.0 | 0.0 |
| juego | 0.0 | 15.0 | 9.0 |
| entender | 0.0 | 10.0 | 0.0 |
| imágenes | 0.0 | 10.0 | 0.0 |
| tiempo | 0.0 | 0.0 | 9.0 |

### 10. Explica qué aspectos hicieron la actividad más interesante o menos interesante.

- Respuestas no nulas (en formato largo): **384**

Distribución de longitud (caracteres):

|  | valor |
| --- | --- |
| count | 384.0 |
| mean | 59.96 |
| std | 57.72 |
| min | 1.0 |
| 25% | 18.0 |
| 50% | 44.5 |
| 75% | 76.5 |
| max | 323.0 |

Palabras más frecuentes (global):

| palabra | frecuencia |
| --- | --- |
| interesante | 72 |
| juego | 29 |
| juegos | 28 |
| actividades | 24 |
| palabras | 21 |
| clase | 20 |
| menos | 20 |
| hace | 19 |
| actividad | 19 |
| imágenes | 17 |
| puede | 17 |
| aprender | 16 |

Palabras más frecuentes por herramienta (tabla):

| palabra | Duolingo | Grammar Ninja | Johnny Grammar |
| --- | --- | --- | --- |
| interesante | 21.0 | 23.0 | 28.0 |
| juegos | 11.0 | 9.0 | 8.0 |
| palabras | 10.0 | 7.0 | 0.0 |
| juego | 9.0 | 14.0 | 0.0 |
| actividades | 8.0 | 0.0 | 13.0 |
| hacen | 8.0 | 0.0 | 0.0 |
| interfaz | 7.0 | 0.0 | 7.0 |
| cada | 7.0 | 0.0 | 0.0 |
| imágenes | 0.0 | 11.0 | 0.0 |
| aprender | 0.0 | 8.0 | 0.0 |
| tiempo | 0.0 | 7.0 | 0.0 |
| solo | 0.0 | 6.0 | 0.0 |
| menos | 0.0 | 0.0 | 11.0 |
| clase | 0.0 | 0.0 | 9.0 |
| hace | 0.0 | 0.0 | 9.0 |
| puede | 0.0 | 0.0 | 7.0 |

### 12. Explica cómo influyó el juego en tu participación.

- Respuestas no nulas (en formato largo): **384**

Distribución de longitud (caracteres):

|  | valor |
| --- | --- |
| count | 384.0 |
| mean | 57.19 |
| std | 55.25 |
| min | 1.0 |
| 25% | 22.0 |
| 50% | 39.5 |
| 75% | 77.0 |
| max | 381.0 |

Palabras más frecuentes (global):

| palabra | frecuencia |
| --- | --- |
| juego | 47 |
| participación | 37 |
| manera | 22 |
| aprender | 22 |
| actividad | 20 |
| actividades | 20 |
| hizo | 20 |
| influyó | 19 |
| fácil | 18 |
| tiempo | 18 |
| atención | 15 |
| participar | 15 |

Palabras más frecuentes por herramienta (tabla):

| palabra | Duolingo | Grammar Ninja | Johnny Grammar |
| --- | --- | --- | --- |
| juego | 17.0 | 22.0 | 8.0 |
| participación | 12.0 | 10.0 | 15.0 |
| influyó | 10.0 | 0.0 | 0.0 |
| aprender | 9.0 | 8.0 | 0.0 |
| fácil | 9.0 | 0.0 | 0.0 |
| actividades | 8.0 | 0.0 | 8.0 |
| usar | 8.0 | 0.0 | 0.0 |
| actividad | 7.0 | 10.0 | 0.0 |
| hizo | 0.0 | 11.0 | 0.0 |
| tiempo | 0.0 | 9.0 | 7.0 |
| manera | 0.0 | 7.0 | 8.0 |
| mejor | 0.0 | 7.0 | 0.0 |
| atención | 0.0 | 0.0 | 7.0 |
| responder | 0.0 | 0.0 | 7.0 |
| ayudó | 0.0 | 0.0 | 6.0 |

### 13. ¿Qué aspectos de la herramienta te ayudaron más a aprender inglés?

- Respuestas no nulas (en formato largo): **384**

Distribución de longitud (caracteres):

|  | valor |
| --- | --- |
| count | 384.0 |
| mean | 44.68 |
| std | 46.1 |
| min | 1.0 |
| 25% | 14.0 |
| 50% | 29.0 |
| 75% | 54.25 |
| max | 294.0 |

Palabras más frecuentes (global):

| palabra | frecuencia |
| --- | --- |
| imágenes | 34 |
| vocabulario | 28 |
| palabras | 27 |
| juegos | 23 |
| ejercicios | 22 |
| aprender | 17 |
| son | 16 |
| aprendizaje | 14 |
| juego | 14 |
| oraciones | 13 |
| gramática | 13 |
| forma | 11 |

Palabras más frecuentes por herramienta (tabla):

| palabra | Duolingo | Grammar Ninja | Johnny Grammar |
| --- | --- | --- | --- |
| ejercicios | 13.0 | 0.0 | 0.0 |
| vocabulario | 12.0 | 7.0 | 9.0 |
| juegos | 10.0 | 0.0 | 10.0 |
| palabras | 9.0 | 14.0 | 0.0 |
| audios | 8.0 | 0.0 | 0.0 |
| listening | 8.0 | 0.0 | 0.0 |
| pronunciación | 8.0 | 0.0 | 0.0 |
| son | 8.0 | 0.0 | 0.0 |
| imágenes | 0.0 | 25.0 | 0.0 |
| frases | 0.0 | 7.0 | 0.0 |
| verbos | 0.0 | 7.0 | 0.0 |
| imagenes | 0.0 | 5.0 | 0.0 |
| phrasal | 0.0 | 5.0 | 0.0 |
| verbs | 0.0 | 5.0 | 0.0 |
| aprender | 0.0 | 0.0 | 9.0 |
| contenido | 0.0 | 0.0 | 7.0 |
| gramática | 0.0 | 0.0 | 7.0 |
| temas | 0.0 | 0.0 | 7.0 |
| aprendizaje | 0.0 | 0.0 | 6.0 |
| inglés | 0.0 | 0.0 | 6.0 |

### 14. ¿Qué dificultades o problemas encontraste al utilizar la herramienta?

- Respuestas no nulas (en formato largo): **382**

Distribución de longitud (caracteres):

|  | valor |
| --- | --- |
| count | 382.0 |
| mean | 37.46 |
| std | 49.29 |
| min | 1.0 |
| 25% | 7.0 |
| 50% | 18.0 |
| 75% | 44.75 |
| max | 292.0 |

Palabras más frecuentes (global):

| palabra | frecuencia |
| --- | --- |
| ninguna | 100 |
| ninguno | 62 |
| encontré | 24 |
| dificultad | 15 |
| dificultades | 14 |
| anuncios | 14 |
| poco | 13 |
| usuario | 12 |
| problemas | 12 |
| instrucciones | 12 |
| falta | 11 |
| veces | 11 |

Palabras más frecuentes por herramienta (tabla):

| palabra | Duolingo | Grammar Ninja | Johnny Grammar |
| --- | --- | --- | --- |
| ninguna | 45.0 | 28.0 | 27.0 |
| ninguno | 27.0 | 20.0 | 15.0 |
| encontré | 11.0 | 8.0 | 0.0 |
| veces | 8.0 | 0.0 | 0.0 |
| dificultad | 6.0 | 0.0 | 7.0 |
| dificultades | 6.0 | 0.0 | 0.0 |
| sistema | 6.0 | 0.0 | 0.0 |
| bien | 5.0 | 0.0 | 0.0 |
| instrucciones | 0.0 | 8.0 | 0.0 |
| claras | 0.0 | 7.0 | 0.0 |
| usuario | 0.0 | 7.0 | 0.0 |
| falta | 0.0 | 6.0 | 0.0 |
| puede | 0.0 | 6.0 | 0.0 |
| anuncios | 0.0 | 0.0 | 10.0 |
| poco | 0.0 | 0.0 | 9.0 |
| inglés | 0.0 | 0.0 | 7.0 |
| interfaz | 0.0 | 0.0 | 7.0 |
| tiempo | 0.0 | 0.0 | 6.0 |

### 15. Si pudieras mejorar estas herramientas para aprender inglés, ¿Qué cambios realizarías?

- Respuestas no nulas (en formato largo): **384**

Distribución de longitud (caracteres):

|  | valor |
| --- | --- |
| count | 384.0 |
| mean | 58.69 |
| std | 60.45 |
| min | 1.0 |
| 25% | 14.75 |
| 50% | 38.0 |
| 75% | 86.0 |
| max | 489.0 |

Palabras más frecuentes (global):

| palabra | frecuencia |
| --- | --- |
| interfaz | 36 |
| ninguno | 30 |
| ninguna | 27 |
| usuario | 24 |
| sea | 24 |
| poco | 22 |
| nivel | 19 |
| poner | 18 |
| cada | 17 |
| inglés | 16 |
| vocabulario | 16 |
| mejor | 16 |

Palabras más frecuentes por herramienta (tabla):

| palabra | Duolingo | Grammar Ninja | Johnny Grammar |
| --- | --- | --- | --- |
| ninguno | 14.0 | 8.0 | 0.0 |
| vocabulario | 12.0 | 0.0 | 0.0 |
| ninguna | 10.0 | 9.0 | 0.0 |
| nivel | 10.0 | 6.0 | 0.0 |
| sea | 9.0 | 0.0 | 11.0 |
| poco | 8.0 | 0.0 | 10.0 |
| cada | 8.0 | 0.0 | 0.0 |
| inglés | 7.0 | 0.0 | 0.0 |
| interfaz | 0.0 | 10.0 | 23.0 |
| instrucciones | 0.0 | 9.0 | 0.0 |
| usuario | 0.0 | 8.0 | 10.0 |
| nada | 0.0 | 7.0 | 0.0 |
| imágenes | 0.0 | 6.0 | 0.0 |
| anuncios | 0.0 | 0.0 | 8.0 |
| mejor | 0.0 | 0.0 | 8.0 |
| poner | 0.0 | 0.0 | 8.0 |
| tiempo | 0.0 | 0.0 | 8.0 |

## Paso 6 — Verificación rápida (consistencia)

Checks recomendados para confirmar que el análisis es consistente:
- No hay duplicados exactos
- Los nulos son esperables en preguntas abiertas
- Los valores numéricos caen dentro del rango esperado (ej. 1–5)

- Filas duplicadas exactas (formato largo): **0**

- Total de celdas nulas (formato largo): **18**
