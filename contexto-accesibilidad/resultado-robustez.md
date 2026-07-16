Pautas de Accesibilidad
WCAG 2.2
Principio de Robustez
Dra. Tania Calle Jiménez
Dra. Sandra Sánchez
tania.calle@epn.edu.ec
Sandra.sanchez@epn.edu.ec

Introducción
La robustez, tal y como la define la WCAG, se refiere específicamente a
los contenidos web que son compatibles con una variedad de "agentes
de usuario": navegadores, tecnologías de asistencia y otros medios de
| acceso | a los | contenidos | web. |
| ------ | ----- | ---------- | ---- |

Objetivos
• Comprender el concepto de robustez
• Todos los desarrolladores deben conocer el principio de robustez.
• Conocer los criterios del principio de robustez
• Ya que existen diferentes aspectos a tomar en cuenta para tratar diferentes
situaciones.
• Aplicar los criterios al desarrollo
• Para poder construir sitios web más accesibles para todo tipo de personas

Pauta 4.1 Compatible

Compatible
• La pauta 4.1 exige a los autores de sitios web que confirmen lo siguiente:
1. Asegurarse de que el código no se "rompe" o impide de otro modo las tecnologías
de asistencia.
2. Exponer la información de forma estándar para que las tecnologías de apoyo
puedan reconocer el contenido e interactuar con él.
Las tecnologías web cambian muy deprisa y los desarrolladores de
tecnologías de apoyo no paran de ponerse al día. Cuando los autores de
sitios web codifican de acuerdo con las especificaciones, maximizan las
posibilidades de que las tecnologías de apoyo funcionen sin problemas con
las tecnologías presentes y futuras.

Criterio de éxito: Análisis sintáctico
• El contenido y el código del sitio web deben estar bien formados. Esto
ayudará a evitar errores de visualización y problemas con las
tecnologías de asistencia.
• Los elementos deben tener etiquetas de inicio y fin completas.
• Se debe anidar los elementos del código correctamente.

Ejercicio
• Seleccione un sitio web y examine la validez del HTML utilizado. Elija la
página de inicio y otra página importante como una página de carrito de
compra o una página de registro/inicio de sesión. Introduzca la URL de cada
página en el validador en el enlace que aparece a continuación:
• W3C Markup Validation Service : https://validator.w3.org/
• Algunos problemas comunes que pueden afectar a la accesibilidad:
• Etiquetas HTML que no están cerradas
• Atributos ID duplicados en una misma página.
• HTML utilizado incorrectamente (por ejemplo, ciertas etiquetas HTML utilizadas
donde no deben)
• Elementos HTML anidados incorrectamente (por ejemplo, un elemento padre
cerrado antes que el elemento hijo esté cerrado)

Criterio de éxito: Nombre, rol, valor
• Este criterio de éxito está enfocado principalmente para los autores
de la web que desarrollan sus propios componentes de la interfaz de
usuario.
• Todos los componentes de la interfaz de usuario pueden tener su nombre y
rol determinados mediante programación.
• Los estados, las propiedades y los valores que puede establecer el usuario
pueden establecerse mediante programación.
• WAI-ARIA se utiliza normalmente para definir roles, estados y
propiedades (y sus valores).

Ejercicio
• Añada la extensión Lighthouse a Chrome y utilícela para comprobar
que la WAI-ARIA añadida a los componentes de interfaz
personalizados se utiliza correctamente.
https://developer.chrome.com/docs/lighthouse/overview/
• Añada también la extensión aXe Chrome a Chrome, que también
puede utilizarse para validar WAI-ARIA (ver video introductorio).
https://chrome.google.com/webstore/detail/axe-devtools-web-
accessib/lhdoppojpmngadmnindnejefpokejbdd

Criterio de éxito: Mensajes de estado
• Muchos sitios web utilizan contenidos dinámicos, como los mensajes
de estado, que están escritos en lenguajes de marcado como HTML y
XML.
• Este contenido debe presentarse a los usuarios de tecnologías de asistencia
sin que necesariamente reciban un enfoque visual.
• Por ejemplo, si los usuarios están viendo sus feeds de redes sociales, se les
puede avisar de una nueva publicación sin que el navegador se desplace
automáticamente hacia arriba para mostrársela.

Criterio de éxito: Mensajes de estado – cont.
• Este criterio ayuda a garantizar que los usuarios de tecnologías de
apoyo, en particular los invidentes, reciban información después de
completar una acción. Los mensajes de confirmación, error o
advertencia se presentan en la pantalla, a menudo actualizando el
contenido de la página sin recargarla. Suelen ser visualmente
reconocibles. Para los usuarios de lectores de pantalla, este contenido
añadido dinámicamente suele pasar desapercibido si no se ha creado
de forma que los lectores de pantalla puedan identificarlo.
• Con WAI-ARIA, proporcionar información a los lectores de pantalla es
tan sencillo como añadir un tipo de rol de región viva que se anuncie
a un lector de pantalla cuando cambie el contenido del elemento
asociado.

Criterio de éxito: Mensajes de estado – cont.
• Ejemplos:
<div role="status">
Gracias por enviar su inscripción. En breve nos pondremos en contacto con usted.
</div>
<span role="alert"> La dirección de correo es obligatoria </span>

Ejercicio
• Utilizar el W3C CSS Validation Service para chequear una página web
de su elección.
https://jigsaw.w3.org/css-validator/

Conclusiones
• Hacer que un sitio web sea robusto de acuerdo con las normas WCAG
garantiza que sea navegable y utilizable por el mayor número de
personas posible.
• Un sitio robusto pueda ser interpretado de forma fiable por una
amplia variedad de agentes de usuario, incluidas las tecnologías de
asistencia. Además, se garantiza que el contenido sea accesible a
medida que evolucionan las tecnologías y los agentes de usuario
• Garantizar que las páginas web tengan etiquetas de inicio y fin
completas y estén anidadas de acuerdo con las especificaciones
ayuda a asegurar que las tecnologías de asistencia puedan analizar el
contenido con precisión y sin bloquearse