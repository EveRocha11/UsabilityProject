Pautas de Accesibilidad
WCAG 2.2
Principio Comprensible
Dra. Tania Calle Jiménez
tania.calle@epn.edu.ec

Principio Comprensible
• La información y el funcionamiento de la interfaz de usuario deben
ser comprensibles.

Introducción
• El Principio comprensible se basa en los anteriores. La conformidad con el
Principio 1 garantiza que los usuarios puedan percibir un sitio. La
conformidad con el Principio 2 garantiza que los usuarios puedan actuar
sobre un sitio. Pero, aunque los visitantes puedan ver el contenido e
interactuar con él, un sitio no es plenamente accesible si los usuarios no
pueden entenderlo.
• Aunque el contenido esté escrito en su propio idioma, eso no lo hace
comprensible. Por ejemplo, una página puede contener:
• Palabras o abreviaturas desconocidas.
• Instrucciones demasiado complejas.
• Mensajes que le indican que ha cometido un error, pero no le explican cómo
solucionarlo.
• Componentes interactivos que parecen familiares pero se comportan de forma
impredecible.

Objetivos
• Utilizar un lenguaje sencillo, coherente y apropiado para el público
objetivo, evitando tecnicismos innecesarios o explicándolos cuando
sean indispensables.
• Mantener una estructura consistente en la interfaz (menús, botones,
| enlaces)      | y   | evitar      | cambios   | inesperados | de  | contexto, | como |
| ------------- | --- | ----------- | --------- | ----------- | --- | --------- | ---- |
| redirecciones |     | automáticas | sin aviso | al usuario. |     |           |      |
• Proporcionar mensajes de error claros y comprensibles, junto con
instrucciones específicas para identificar, entender y corregir errores
| en formularios |     | u otras | interacciones. |     |     |     |     |
| -------------- | --- | ------- | -------------- | --- | --- | --- | --- |

Introducción
Para que un contenido web sea comprensible, deben cumplirse tres
requisitos:
legible
1. La gente debe poder leerlo, es decir, el contenido es .
2. El sitio debe comportarse de manera que la gente pueda predecirlo,
predecible
es decir, el contenido es .
3. El sitio debe estar diseñado para evitar errores. Cuando los usuarios
cometan errores, se debe ser indulgente con ellos.

3.1 Legible
• Hacer que el contenido del texto sea legible y comprensible.

Criterio de éxito: Idioma de la página
• ¿Cuál es su objetivo?
• Proporcionar información en la página web que los agentes de usuario
necesitan para presentar correctamente el texto y otros contenidos
lingüísticos.
• Beneficios
• Convertir el texto en voz sintética.
• Reconocer caracteres y alfabetos o decodificar palabras.
• Software de conversión de texto a voz.
• Personas que confían en los subtítulos para los medios sincronizados.

Ejemplo
• Una web con contenido en dos idiomas:
• Una página web producida en Rusia y
escrita en HTML incluye contenido tanto
en ruso como en inglés, pero la mayor
parte del contenido está en ruso. El
lenguaje humano predeterminado se
identifica como ruso (ru) por el atributo
lang en el elemento HTML.
https://fondbezrukova.ru/projects/kazanova

Códigos de idiomas
<html lang="en">
• https://www.w3schools.com/tags/ref_language_codes.asp

Criterios de éxito: Idioma de las partes
• ¿Cuál es su objetivo?
• Garantizar que los agentes de usuario puedan presentar correctamente el
contenido escrito en varios idiomas.
Beneficios
• Personas que utilizan lectores de pantalla u otras tecnologías que convierten
el texto en voz sintética.
• Personas que confían en los subtítulos para reconocer los cambios de idioma.

Códigos de idiomas
<span lang="fr">Je ne comprends pas</span>
https://www.w3schools.com/tags/ref_language_codes.asp

Ejercicio
• <!DOCTYPE html> • Esta página contiene información
importante para el
• <html lang="es">
• <span lang="en">user</span>.
• <head>
• </p>
• <meta charset="UTF-8">
• <title>Página de bienvenida</title>
• <p>
• </head>
• Presione <strong>Aceptar</strong>
• <body>
para continuar con el proceso.
• </p>
• <h1>Bienvenido</h1>
• </body>
• <p>
• </html>

Criterio de éxito: Palabras inusuales
• ¿Cuál es su objetivo?
• Garantizar que se identifiquen términos técnicos, jerga o modismos.
• Su sitio debe proporcionar un glosario que contenga definiciones de dichas
palabras o términos a los que pueda vincular cuando aparezcan.
• Beneficios
• El usuario tiene dificultad para decodificar palabras.
• El usuario tiene dificultad para entender palabras y frases.
• El usuario tienen dificultad para usar el contexto para ayudarse a la
comprensión.

Ejemplos de escenarios de uso
• No especialistas que necesitan comprender información especializada.
• Estudiantes que están aprendiendo sobre un tema nuevo o desconocido.
• Estudiantes de segunda lengua.
• Personas con discapacidades que dificultan la comprensión de modismos y
jergas.
• Personas que utilizan software de ampliación de pantalla: ampliar el texto
puede hacer que se pierda el contexto.
• Personas que utilizan dispositivos web portátiles con pantallas pequeñas:
una pantalla pequeña puede hacer que se pierda el contexto.

Criterio de éxito: Abreviaturas
• ¿Cuál es su objetivo?
• Garantizar que los usuarios puedan acceder a la forma ampliada de
abreviaturas.
• Beneficios
• Usuarios que tienen dificultad para decodificar palabras.
• Usuarios que tienen memoria limitada.
• Usuarios que tienen dificultades para usar el contexto para ayudarse a la
comprensión.

Criterio de éxito: Nivel de lectura
• ¿Cuál es su objetivo?
• El contenido debe escribirse de la manera más clara y sencilla posible
garantizar que se disponga de contenido adicional que ayude a la
comprensión de textos difíciles o complejos.
• Beneficios
• Usuarios que tienen dificultad para comprender el lenguaje escrito (por
ejemplo, artículos, instrucciones o periódicos en texto o braille), con el fin de
obtener conocimientos generales o información específica.

Ejercicio
• Seleccionar un texto en español y utilizar la herramienta Analizador
de legibilidad de texto para determinar el nivel de dificultad de
lectura, palabras raras o mal escritas, entre otros:
https://legible.es/

Criterio de éxito: Pronunciación
• ¿Cuál es su objetivo?
• Ayudar a las personas ciegas, a las personas con baja visión y a las personas
con discapacidades de lectura a comprender el contenido en los casos en que
el significado depende de la pronunciación.

Pauta 3.2 Predecible

Predecible
• Hacer que las páginas Web aparezcan y funcionen de manera
predecible.
• Cuando se leen páginas web, no sólo se ven palabras, también se
"leen" patrones, como el diseño y la organización de la página, la
posición y el orden de los enlaces, y el color y la forma de los
encabezados. Estos patrones orientan a los lectores sobre qué
información está dónde, y ayudan a los usuarios a centrarse en el
contenido deseado.
• Los patrones coherentes ayudan a los lectores a comprender el
contenido. Los patrones impredecibles aumentan el esfuerzo
cognitivo que los lectores necesitan para dar sentido a la información.

Criterio de éxito: On focus
• El enfoque en un componente no debe cambiar el contexto.
• ¿Cómo aplicarlo?
• Usar un "actívate” en vez de "focus" para disparadores de cambios de
contexto.
• Sugerencias
• Nuevas ventanas o pestañas solo cuando es necesario.
• Advertirle al usuario del cambio.
• Fallas
• Remover el "focus" mediante scripting cuando se recibe el "focus”.

Criterio de éxito: On input
• El ingreso de información no debe cambiar el contexto.
• ¿Cómo aplicarlo?
• Proveer un botón de submit.
• Describir que es lo que pasará antes de hacer algún cambio.
• Usar eventos onchange en un SELECT sin cambiar contexto.
• Sugerencias
• Advertirle al usuario del cambio.
• Fallas
• Enviar un formulario automáticamente.
• Lanzar una nueva ventana sin avisar al interactuar con una entrada.

Criterio de éxito: Navegación consistente
• El mismo orden en todas las páginas.
• ¿Cómo aplicarlo?
• Tener el mismo orden relativo cada vez que se presente el mismo
componente en diferentes lugares.
• Fallas
• Presentar el menú aleatoriamente.

Criterio de éxito: Identificación consistente
• Componentes con la misma funcionalidad se identifican con
consistencia.
• ¿Cómo aplicarlo?
• Labels, nombres y texto alternativo son consistentes para el contenido que
tiene la misma funcionalidad.
• Fallas
• Usar dos labels diferentes para la misma funcionalidad en diferentes páginas
de un mismo sitio.

Criterio de éxito: Change on request
• Solo el usuario cambia el contexto o decide que sea automático.
¿Cómo aplicarlo?
• Proveer un mecanismo para solicitar la actualización en vez de que sea automática.
• Si tenemos automatización lo hacemos del lado del servidor
• Uso de una redirección instantánea directa.
• Si tenemos popup en las ventanas
• Usar "target" para abrir nuevas ventanas cuando lo quiera el usuario e indicarle.
• Uso de la mejora progresiva para abrir nuevas ventanas.
• Si usamos el evento onchange en un SELECT no debe cambiar el contexto.

Criterio de éxito: Change on request (cont.)
• Sugerencias
• Abrir nuevas pestañas y ventanas solo cuando sea necesario.
• Fallas
• Si el usuario ingresa texto se lanza una nueva ventana.
• El usuario no puede deshabilitar el cambio automático.
• Se cambia el contexto al remover el foco de un formulario.
• Se abre una página y de inmediato se abre otra.
• Uso de meta refresh para recargar la página.

Criterio de éxito: Ayuda Consistente
• Tener una o varias formas de ayuda incluida en el mismo orden en
cada página
• Tipos de Ayuda
• Detalles de contacto humano.
• Mecanismos de contacto humano.
• Opciones de auto ayuda.
• Mecanismo de contacto totalmente automatizado.

Ejercicio
• <!DOCTYPE html> • <input type="email" id="email"
name="email"><br><br>
• <html lang="es">
• <head>
• <button type="submit">Enviar</button>
• <meta charset="UTF-8">
• </form>
• <title>Página predecible</title>
• </head>
• <p>
• <body>
• <a href="ayuda.html">Ver ayuda</a>
• </p>
• <h1>Formulario de contacto</h1>
• </body>
• <form>
• </html>
• <label for="email">Correo
electrónico:</label><br>

Pauta 3.3 Asistencia de entrada

Asistencia de entrada
• Ayudar a los usuarios a evitar y corregir errores.
• Todo el mundo comete errores, pero algunas personas con
discapacidad pueden ser más propensas a cometerlos que las
personas sin discapacidad.
• Una persona con temblores puede pulsar teclas sin querer.
• Una persona ciega puede tener problemas para determinar qué campos son
obligatorios y cuáles opcionales.
• Una persona que use un software de reconocimiento de voz puede producir
palabras diferentes de las dictadas.

Asistencia de entrada
• Los métodos típicos de indicación de errores pueden no ser obvios
para las personas con discapacidades debido a un campo de visión
| limitado,  | una            | percepción | limitada | de los | colores | o el | uso | de  |
| ---------- | -------------- | ---------- | -------- | ------ | ------- | ---- | --- | --- |
| tecnología | de asistencia. |            |          |        |         |      |     |     |
• Esta pauta pretende reducir el número de errores graves que
cometen los usuarios, aumentar la probabilidad de que éstos se
percaten de sus errores y ayudarles a comprender lo que deben hacer
para corregirlos.

Criterio de éxito: Identificación de errores
• Cuando un usuario está completando un formulario o eligiendo entre
opciones, cualquier error que se detecte debe informarse claramente
al usuario, junto con el control del formulario al que se refiere el
error.
• Al diseñar un sitio web o un formulario en línea, utilice texto para indicar y
| describir | los | errores. |     |
| --------- | --- | -------- | --- |
• Está bien señalar los errores con imágenes y cambios de color siempre que
| haya | también | descripciones | de texto. |
| ---- | ------- | ------------- | --------- |

Criterio de éxito: Identificación de errores
• Ejemplo: Un banco anima a sus clientes a solicitar préstamos en línea. Un
cliente envía un formulario con su nombre, dirección, número de teléfono,
dirección de correo electrónico y número de cuenta. Si el cliente no rellena
el formulario correctamente, éste se vuelve a mostrar con una alerta: tres
signos de interrogación que aparecen después del aviso para todos los
campos que faltan o son incorrectos.
• Además, los campos erróneos se resaltan en amarillo para facilitar su
detección.
• Este criterio es una ventaja especial para los usuarios de lectores de
pantalla. Dado que los lectores de pantalla sólo leen texto, los usuarios de
lectores de pantalla pueden tener problemas para entender los mensajes
de error que no son de texto

Criterio de éxito: Etiquetas o instrucciones
• Los autores de contenido deben presentar instrucciones o etiquetas
que identifiquen los controles en un formulario para que los usuarios
sepan qué datos de entrada se esperan.

Criterio de éxito: Etiquetas o instrucciones
• Cuando diseñe formularios en línea, ayude a los usuarios a introducir la
información proporcionando instrucciones y ejemplos claros.
• La conformidad con este criterio ayuda a los usuarios a evitar errores
cuando se requiere introducción de datos.
• Al rellenar los formularios, las personas que utilizan determinadas
tecnologías de apoyo tienen más probabilidades de cometer errores que
los usuarios sin discapacidad. Del mismo modo, cuando se recuperan de los
errores, estos usuarios pueden tener problemas para concentrarse y
solucionar los problemas. Las instrucciones y las pistas conectadas
visualmente y mediante programación a los controles de los formularios
ayudan a los usuarios a completarlos con éxito la primera vez. Si cometen
errores, las instrucciones y pistas facilitan su localización y corrección.

Criterio de éxito: Etiquetas o instrucciones
• Ejemplos de cómo proporcionar pistas e instrucciones claras:
• Utilice la etiqueta “Primer nombre” en lugar de “nombre 1” para introducir
un nombre, y el “Nombre de familia o apellido” en lugar del nombre 2 para
introducir un apellido.
• Mostrar el formato de fecha requerido para un campo: Fecha (dd-mm-aaaa).
• Coloque los avisos de los campos de texto y los cuadros combinados encima o
a la izquierda de los controles, y coloque los avisos de las casillas de
verificación y los botones de opción a la derecha de los controles. Al hacer
esto "automáticamente" se obtienen controles de formulario bastante
accesibles.

Ejemplos de técnicas ARIA
• https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA21.html
• https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA9.html

Criterio de éxito: Sugerencia de error
• Si se detecta automáticamente un error de entrada y se conocen sugerencias de
corrección, las sugerencias se proporcionan al usuario, a menos que ponga en
peligro la seguridad o el propósito del contenido.
• Explicar cómo corregir los errores de introducción de datos puede ayudar a las
personas que, debido a una discapacidad, tienen dificultades para rellenar y
enviar formularios en línea, tales como personas con dificultades de aprendizaje,
cognitivas, visuales o motoras.
• Por ejemplo, en un campo de entrada se pide a los usuarios que escriban el
nombre de un mes. Si un usuario introduce "12", las sugerencias de corrección
pueden incluir:
• Elegir de una lista de los valores aceptables: enero, febrero, etc.
• Un mensaje redactado de otra forma: “Escriba el nombre del mes”.
• Una conversión de los datos introducidos en una ventana emergente interactiva: ¿Quiere
decir "diciembre?"

Criterio de éxito: Prevención de error (legal,
financiero, datos)
• Para cumplir con este criterio, permita a los usuarios corregir errores
que podrían tener consecuencias graves antes de que se produzcan.
Proporcione una de las siguientes opciones:
1. Un mecanismo para revertir las acciones.
2. Una forma de revisar y corregir la información antes de que se presente.
3. Una forma de comprobar si hay errores en los datos introducidos.

Criterio de éxito: Prevención de error (legal,
financiero, datos) – cont.
• Dar a los usuarios una segunda oportunidad si accidentalmente introducen la
información incorrecta o activan el control equivocado. En los siguientes
ejemplos, los errores afectan a transacciones que se producen inmediatamente y
sin posibilidad de modificarlas:
• La compra en línea de boletos de avión no reembolsables ni intercambiables
puede tener consecuencias económicas. Si un usuario especifica una fecha de
viaje incorrecta, puede acabar con un billete que no puede utilizar.
• Borrar o modificar accidentalmente información almacenada en la base de datos
de un servicio de viajes puede tener consecuencias negativas si la persona
necesita posteriormente acceder a información sobre un vuelo.
• Al realizar un examen en línea, pulsar accidentalmente el botón "Enviar" antes de
responder a todas las preguntas puede dar lugar a una mala puntuación.

Criterios de éxito: Ayuda
• Proporcione instrucciones y otras señales apropiadas en contexto
para ayudar a completar y enviar el formularios. Esto ayuda a:
• Personas con discapacidades intelectuales, de lectura y escritura.
• Personas mayores.
• Personas que aprenden un segundo idioma.
• Cualquier persona que tenga problemas para rellenar formularios
• Cualquier persona que no sepa qué información incluir o excluir al rellenar un
formulario.

Criterios de éxito adicionales
• Prevención de errores (total)
• Cuando se requiere que el usuario envíe información, se cumple al menos una de las
siguientes condiciones: la transacción es reversible, comprobada, y confirmada.
• Entrada redundante
• La información introducida previamente por el usuario que debe volver a
introducirse en el mismo proceso se rellena automáticamente, o esta disponible para
que el usuario la seleccione.
• Autenticación accesible
• No se requiere una prueba de función cognitiva (como recordar una contraseña o
resolver un rompecabezas) para ningún paso de un proceso de autenticación a
menos que ese paso proporcione un mecanismo alternativo, reconocer objetos, o
dar información personal.
• Autenticación accesible (mejorada)
• Proporcionar un mecanismo alternativo.

Ejemplo
| • <!DOCTYPE html> |            | aria-describedby="ayuda-correo"><br>           |                    |
| ----------------- | ---------- | ---------------------------------------------- | ------------------ |
| • <html           | lang="es"> | • <small                                       | id="ayuda-correo"> |
| • <head>          |            | • Introduce un correo electrónico válido, por  |                    |
ejemplo: nombre@dominio.com
• <meta charset="UTF-8">
• </small>
• <title>Registro</title>
• <br><br>
• </head>
• <body>
|     |     | • <button | type="submit">Registrarse</button> |
| --- | --- | --------- | ---------------------------------- |
• </form>
• <h1>Formulario de registro</h1>
• </body>
• <form>
• </html>
| • <label | for="correo">Correo  |     |     |
| -------- | -------------------- | --- | --- |
electrónico:</label><br>
• <input type="email" id="correo" name="correo"

Conclusiones
• La información y la interfaz deben ser fáciles de entender para todas
las personas, evitando contenidos confusos, instrucciones ambiguas o
estructuras difíciles de seguir.
• La navegación debe ser predecible y consistente, de modo que los
usuarios puedan anticipar cómo funcionan los elementos de una
página y encontrar lo que necesitan con facilidad.

• Los contenidos deben utilizar un lenguaje claro y sencillo, adaptado al
público objetivo, con etiquetas, mensajes de error e instrucciones que
| ayuden | a completar |     | las | tareas | correctamente. |     |     |     |     |
| ------ | ----------- | --- | --- | ------ | -------------- | --- | --- | --- | --- |
• Los formularios y componentes interactivos deben proporcionar
ayuda suficiente, indicando los errores, ofreciendo soluciones y
| permitiendo |     | que | las | personas |     | comprendan | cómo | corregir | sus |
| ----------- | --- | --- | --- | -------- | --- | ---------- | ---- | -------- | --- |
acciones.