Pautas de Accesibilidad
WCAG 2.2
Principio Operable
Dra. Tania Calle Jiménez
tania.calle@epn.edu.ec

Principio Operable
Los componentes de la interfaz de usuario y la navegación deben ser operables.
Si sigue las pautas del Principio 1, los visitantes podrán percibir el contenido del sitio
o aplicación web. Pero el Principio 2 lleva las cosas al siguiente nivel:
Una vez que los visitantes pueden percibir el contenido, deben poder actuar en
consecuencia. En otras palabras, el contenido debe ser operable.

Ejercicio
• Intentar Jugar una aplicación solo con teclado.
• Usen el ratón con la mano izquierda

Pauta 2.1 Teclado Accesible
Hacer que toda la funcionalidad esté disponible desde un teclado.

¿Por qué las páginas web deben ser accesibles sin
ratón?
Algunas personas no pueden o tienen dificultades para utilizar el ratón.
Por ejemplo:
1. El ratón está diseñado para guiarse con la vista. Los usuarios
totalmente ciegos no pueden ver el puntero del ratón.
2. Los punteros del ratón suelen ser pequeños. Las personas con baja
visión pueden tener problemas para ver el puntero del ratón en la
pantalla.
3. Alguien con una discapacidad de aprendizaje puede encontrar los
movimientos del puntero del ratón una distracción, o pueden carecer
de la coordinación mano-ojo necesaria para utilizar de forma fiable un
ratón.

¿Por qué las páginas web deben ser accesibles
sin ratón?
4. Algunas personas tienen problemas para recordar cuándo clic
izquierdo, doble clic o clic derecho.
5. Una persona con temblores en las manos puede ser incapaz de
sostener el ratón con la suficiente firmeza como para hacer clic en
objetos pequeños de la pantalla. Algunas personas mayores que no
tienen temblores en las manos afirman tener dificultades para
mantener el ratón lo suficientemente firme como para hacer doble clic.

Teclado
• Siempre que sea posible, el contenido se pueda operar a través de un teclado

Ejercicio Teclado Accesible
• <!DOCTYPE html> • <!-- tabindex="0" permite que el
elemento reciba foco con la tecla Tab --
• <html lang="es">
>
• <head>
• <div tabindex="0">Caja enfocables
• <meta charset="UTF-8"> con Tab</div>
• <title>Ejemplo accesible con
teclado</title>
• <button>Botón accesible</button>
• </head>
• <body>
• <a href="#">Enlace accesible</a>
• <h1>Navegación con teclado</h1>
• </body>
• </html>

Importante
• Se recomienda usar tabindex="0" en lugar de valores positivos para
no alterar el orden natural de navegación.

Ejercicio 2 Teclado Accesible
| • <!DOCTYPE html> |     |     | con Tab</div> |
| ----------------- | --- | --- | ------------- |
•
| <html    | lang="es"> |     |                                               |
| -------- | ---------- | --- | --------------------------------------------- |
| • <head> |            |     | • <!-- No se puede enfocar con Tab, solo por  |
código -->
• <meta charset="UTF-8">
• <div tabindex="-1">Elemento NO
• <title>Ejemplo con tabindex -1 y 0</title>
accesible con Tab</div>
• </head>
• <body>
• <button>Botón accesible por
teclado</button>
•
<h1>Ejemplo accesible con teclado</h1>
• </body>
•
| • <!-- | Se puede enfocar con la tecla Tab | --> | </html> |
| ------ | --------------------------------- | --- | ------- |
•
| <div | tabindex="0">Elemento accesible  |     |     |
| ---- | -------------------------------- | --- | --- |

Sin Trampa de Teclado
• Ingresar a una sección usando el teclado
• Salir de esa sección -- nuevamente usando *solo* el teclado

Teclado (Sin excepción)
• Garantizar que todo el contenido se pueda operar desde el teclado.

Ejercicio 3 Teclado accesible
| • <!DOCTYPE html> |     | • <h1>Accesibilidad con teclado</h1> |     |     |     |
| ----------------- | --- | ------------------------------------ | --- | --- | --- |
• <html lang="es">
| • <head>                 |     | • <!-- | Elemento enfocable         | gracias a tabindex | --> |
| ------------------------ | --- | ------ | -------------------------- | ------------------ | --- |
| • <meta charset="UTF-8"> |     | • <div | class="caja" tabindex="0"> |                    |     |
• <title>Foco visible con teclado</title> • Presiona Tab para enfocarme
| • <style> |     | • </div> |     |     |     |
| --------- | --- | -------- | --- | --- | --- |
• /* Estilo visible cuando el elemento recibe foco */
| • .caja:focus | {   | • <!-- | Elemento accesible nativo --> |     |     |
| ------------- | --- | ------ | ----------------------------- | --- | --- |
• outline: 3px solid blue; • <button>Botón accesible</button>
• background-color: #e6f0ff;
| • }        |     | • </body> |     |     |     |
| ---------- | --- | --------- | --- | --- | --- |
| • </style> |     | • </html> |     |     |     |
• </head>
• <body>

Atajos de teclas de caracteres
• Reducir la activación accidental de atajos de teclado.
• Apagar
• Reasignar
• Activo solo en el enfoque

Nota importante
• El teclado es tan importante como las alternativas de texto. Si no se
barreras
aborda ninguna de las dos, un sitio web tendrá
insuperables
que algunos usuarios con discapacidad.

Ejemplo
• Correcto (accesible)
• <div tabindex="0">Elemento accesible con Tab</div>
• <button>Botón accesible</button>
• Por qué está bien:
• tabindex="0" permite usar el teclado.
• Se respeta el orden natural del HTML.
• Cumple WCAG 2.0 (Principio Operable).

Ejemplo Incorrecto
• <div tabindex="3">Elemento 3</div>
• <div tabindex="1">Elemento 1</div>
• <div tabindex="2">Elemento 2</div>
• Por qué está mal:
• Usa valores positivos (1, 2, 3).
• Rompe el orden natural de navegación.
• Confunde a usuarios de teclado y lectores de pantalla.

Ejercicio
Los dos ejemplos siguientes de listas ordenables arrastrando y soltando pueden parecer idénticos, pero hay
una diferencia. Los usuarios de ratón encontrarán que ambas funcionan exactamente igual; sin embargo, para
los usuarios de teclado, sólo la primera es accesible. Para probar cada lista ordenable. El primer ejemplo
pasaría la prueba de accesibilidad, mientras que el segundo no.
1. Abra su lector de pantalla preferido.
2. Utilizando el puntero del ratón (si eres capaz), coge uno de los elementos de cada lista y suéltalo en una
nueva posición.
3. Escucha lo que anuncia el lector de pantalla en cada caso.
4. Ahora aparta el ratón y utiliza el teclado para completar la misma tarea. Los usuarios de Mac utilizan
Comando + flecha para seleccionar y mover los elementos de la lista. Los usuarios de Windows utilizan Ctrl +
flecha.
https://pressbooks.library.ryerson.ca/iwacc/?p=189
Ejemplo 1: Lista clasificable accesible
Ejemplo 2: Lista clasificable inaccesible

Pauta 2.2. Tiempo Suficiente
• Proporcionar a los usuarios suficiente tiempo para leer y usar el
contenido.

¿Por qué algunas personas necesitan más
tiempo?
Las personas que utilizan tecnologías de apoyo suelen necesitar tiempo
para encontrar lo que buscan en una página web. Por ejemplo:
• Los usuarios videntes pueden entender una página de un vistazo, pero los
usuarios de lectores de pantalla a menudo necesitan explorar una página
antes de comprender cómo está organizada.
• A medida que las personas envejecen, necesitan más tiempo para procesar la
información.
• La flexibilidad de los límites de tiempo beneficia además a las personas que
no tienen conocimientos técnicos, son inexpertas en las TIC o no son
hablantes nativos de la lengua del sitio.
• Personas que leen despacio.

|                   | Tiempo    | Pausa, Detener,    |         | Sin límites de  |        |
| ----------------- | --------- | ------------------ | ------- | --------------- | ------ |
|                   | ajustable |                    | Ocultar |                 | tiempo |
| • Los límites de  |           | • Evitar distraer  |         | • Minimizar la  |        |
| tiempo deben      |           | a los usuarios     |         | aparición de    |        |
| poder             |           | durante su         |         | contenido que   |        |
| quitarse,         |           | interacción con    |         | requiera una    |        |
| ajustarse, o      |           | una página         |         | interacción     |        |
| extenderse.       |           | web.               |         | cronometrada.   |        |

Ejercicio
• Asumiendo que la mayoría de la gente lee a un ritmo de 600 palabras
por minuto, pero Usted tiene una discapacidad que sólo le permite
leer a 200 ppm. Como resultado, el contenido del ejemplo se vuelve
inaccesible para Usted, a menos que haya una manera de pausar el
temporizador o extenderlo para que, como lector lento, pueda leer
todo el contenido a su velocidad de lectura antes de que desaparezca.
https://pressbooks.library.ryerson.ca/iwacc/?p=191
Try This: Adjustable Timers

Ejemplo de límites de tiempo con advertencia

Interrupciones
• Disponer de una funcionalidad para suprimir o posponer las
interrupciones, a menos que se trate de una alerta de emergencia.

Re-autenticación
• Cuando caduca una sesión autenticada, el usuario puede continuar la
actividad sin pérdida de datos después de volver a autenticarse

Ejemplo de re-autenticación

Tiempos de Espera
• Se advierte a los usuarios sobre la duración de cualquier inactividad
del usuario que pueda causar la pérdida de datos.

Tiempo de espera y reautenticación

Pauta 2.3 Convulsiones y Reacciones Físicas
No diseñar contenido de manera que pueda causar convulsiones o
reacciones físicas.

¿Qué debo saber para que los contenidos no
provoquen convulsiones?
Las personas que padecen epilepsia pueden sufrir convulsiones cuando se exponen
a luces intermitentes o parpadeantes. Hay tres causas de las luces parpadeantes en
las pantallas de ordenador:
1. Los parpadeos pueden ser causados por la pantalla.
2. Los parpadeos pueden ser causados por el computador y la forma en que representa las
imágenes y otros contenidos.
3. Los destellos pueden deberse al propio contenido.
Aunque los desarrolladores Web no tienen control sobre los dos primeros casos,
pueden asegurarse de que el parpadeo no esté causado por el contenido, como
una película de destellos estroboscópicos o una animación de explosiones rápidas.

Tres Destellos
Las páginas web no deben contener
nada que parpadee más de tres veces
en cualquier período de un segundo
Destellos
Animación a partir de interacciones
Permitir que los usuarios
deshabiliten las animaciones

Ejercicio: Destellos
• Advertencia: Si Usted es sensible a los destellos, no haga esta
actividad.
• Para experimentar tres destellos por segundo, abra el enlace
MoodLight; elija dos colores opuestos que contrasten bien, como el
rojo y el verde; ajuste el control deslizante a "3 veces por segundo" y,
a continuación, pulsa el botón "Encender". Pruebe también a
parpadear entre 10 y 25 veces por segundo, el intervalo en el que se
produce la mayor sensibilidad.
https://www.moodlight.org/#18204

Ejercicio: Animaciones
• Advertencia: Si Usted sabe que es sensible al mareo, tenga cuidado con
esta actividad o evítela por completo.
• Para muchas personas, animaciones como la siguiente, cuando se miran
fijamente durante un periodo de tiempo, pueden hacerles sentir náuseas.
En el caso de las personas con un trastorno vestibular importante, puede
que no tarden mucho en empezar a sentirse mal.
• Examine las siguientes animaciones y elija una de las más grandes, con
movimiento en toda la imagen. Observe la imagen durante uno o dos
minutos. Deténgase cuando empiece a sentirse mal.
https://patakk.tumblr.com/tagged/gif

Pauta 2.4 Navegable
Proporcionar formas de ayudar a los usuarios a navegar, encontrar
contenido y determinar dónde se encuentran.

¿Por qué es importante ayudar a los visitantes
a navegar?
La navegación en las páginas web tiene dos finalidades:
1. Indicar a los usuarios dónde se encuentran.
2. Indicarles cómo llegar a otro sitio.
Estas tareas suelen ser más difíciles para las personas con discapacidad.
Esta sección describe cómo ayudar a los visitantes a encontrar
contenidos y a no perder de vista su ubicación. Las mismas reglas que
simplifican la navegación de las personas con discapacidad también
mejoran la de los usuarios sin discapacidad.

Navegación con Tabulador
• Las personas que no pueden utilizar el ratón suelen usar la tecla Tab
para navegar por las páginas web: pulsan Tab para desplazarse "hacia
delante" por el contenido; Mayús + Tab para desplazarse "hacia
atrás"; y Enter para activar enlaces y botones. La navegación con
Tabulador es una forma tediosa de desplazarse, pero para algunos
usuarios que no pueden utilizar ratón es la mejor opción.

• Eludir bloques de contenido que se repiten en varias
páginas web.
Saltar
Bloques
• Las páginas web tienen títulos que describen el tema o
el propósito.
Página
titulada
• Navegar secuencialmente a través del contenido.
Orden de • Encontrar información en un orden que sea coherente.
enfoque

• Los enlaces que tienen sentido por sí mismos mejoran la
usabilidad para todos.
• La forma preferida de cumplir este requisito es escribir un texto
Propósito del
de enlace que indique claramente lo que cabe esperar si se
enlace (en
sigue el enlace.
contexto)
• Existe más de una forma de localizar una página Web dentro de
un conjunto de páginas Web
Múltiples
mecanismos

Propósito de los
Enfoque visible
• Ayudar a comprender  • Indicador de  enlaces •Proporcionar
qué información
dónde se   encabezados para
•Modo de operación  •Comprender el
contienen las páginas
las secciones de
| web y cómo se organiza  | donde el indicador  | encuentra en el  |     |
| ----------------------- | ------------------- | ---------------- | --- |
propósito de cada
una página.
| esa  información | de enfoque del  | sitio |     |
| ---------------- | --------------- | ----- | --- |
enlace en el
teclado es visible contenido
|                |     | Ubicación dentro  | Títulos de  |
| -------------- | --- | ----------------- | ----------- |
| Encabezados y  |     | del Sitio         | sección     |
Etiquetas

• Cuando el indicador de enfoque del teclado está visible se cumple que encierra al componente de
la interfaz de usuario que está enfocado, y tiene una relación de contraste de al menos 3:1 entre
los mismos píxeles en los estados enfocado y desenfocado, y tiene una relación de contraste de al
Apariencia del
menos 3:1 frente a los colores adyacentes no indicadores de enfoque.
Enfoque
• Cuando un componente de la interfaz de usuario recibe el foco del teclado, el componente no
queda totalmente oculto debido al contenido creado por el autor.
Enfoque no
oscurecido
(mínimo)
• Cuando un componente de la interfaz de usuario recibe el foco del teclado, ninguna parte del
componente queda oculta por el contenido creado por el autor.
Enfoque no
oscurecido
(mejorado)

Pauta 2.5 Modalidades de Entrada
Facilitar a los usuarios el manejo de las funcionalidades mediante
diversas entradas más allá del teclado.

¿Por qué es importante permitir varios modos de
entrada?
• El teclado fue el primer modo de entrada.
• Después se introdujo el ratón.
• Pronto le siguieron otros dispositivos de entrada, como los track pads, los
track balls, los punteros oculares, el control por voz o los joysticks.
• Luego llegaron los dispositivos móviles con pantallas táctiles, que
introdujeron una nueva gama de métodos de entrada llamados gestos. Un
gesto es un movimiento físico como tocar, tocar dos veces, mantener
pulsado, deslizar o arrastrar.
• Limitar los modos de entrada puede reducir enormemente el número de
personas que pueden utilizar un sitio web. Afortunadamente, en muchos
casos, el diseño para el acceso con ratón y teclado también permitirá otros
modos de entrada.

Modalidades de Entrada
Gestos de puntero
•Un gesto multipunto suele requerir dos o tres dedos para realizarlo. Un ejemplo es zoom que consiste en colocar dos
dedos sobre la pantalla de un dispositivo y separarlos, haciendo que la pantalla se amplíe. Algunas personas no podrán
realizar un gesto de este tipo.
Cancelación de puntero
•Evitar una entrada accidental del puntero, ya sea mediante un clic del ratón o mediante un gesto táctil para activar
contenidos web.
Etiqueta en los nombres
•Todo contenido de texto asociado a un elemento debe incluirse en el título del elemento.
Actuación de movimiento
•Algunas personas que no puedan mover el dispositivo (por ejemplo, si está sujeto a una silla de ruedas) o que no puedan
producir gestos (por ejemplo, que no puedan utilizar las manos), necesitan medios alternativos para activar funciones
como el giroscopio.

Modalidades de Entrada
Tamaño de objetivo (mejorado)
• Algunas personas pueden tener dificultades para apuntar a objetos pequeños con el puntero del
ratón.
Mecanismo de entrada concurrentes
• En un dispositivo móvil, la yema del dedo suele ser el principal método de entrada. Sin embargo,
una persona que tenga limitado el uso de los dedos puede optar por acoplar un ratón y un teclado
a su dispositivo para facilitar su manejo. Los contenidos web no deben impedir el uso de
dispositivos de entrada alternativos.
Movimientos de arrastrado
Tamaño de objetivo (mínimo)

Conclusiones
• El principio Operable garantiza que todas las funcionalidades sean
accesibles sin necesidad de mouse, lo que es esencial para personas
con discapacidades motrices o que utilizan tecnologías de asistencia
| como | lectores | de pantalla. |     |     |
| ---- | -------- | ------------ | --- | --- |
• Se deben evitar límites de tiempo estrictos o, en su defecto, permitir
ampliarlos o desactivarlos. Esto favorece a personas con dificultades
| cognitivas, |     | de atención | o de | lectura. |
| ----------- | --- | ----------- | ---- | -------- |

Conclusiones
• El contenido no debe incluir destellos o parpadeos que superen los
límites establecidos, reduciendo el riesgo para personas con epilepsia
fotosensible.
• Proveer mecanismos como encabezados bien estructurados, enlaces
descriptivos y focos visibles permite a los usuarios orientarse y
moverse eficazmente por el sitio, mejorando la experiencia para
todos.