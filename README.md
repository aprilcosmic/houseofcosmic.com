# houseofcosmic.com

Sitio de House of Cosmic. Durante la campaña del Cowboy Cosmic Ball el sitio está dedicado casi por completo al ball.

Diseño moderno: tipografía Geist Mono (la de aprilcosmic.com, licencia libre OFL), secciones negras y claras, esquinas suaves. Los dos actos: cromo y bola disco de Renaissance; rojo, mezclilla y blanco hueso de Cowboy Carter. La navegación es una cápsula flotante abajo con la cuenta regresiva en miniatura.

HTML plano, sin build. Se publica tal cual en GitHub Pages.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | Inicio: cuenta regresiva, lo esencial, casas, categorías, talento |
| `el-ball.html` | Concepto, sí es / no es, tres ideas, apertura, orden de la noche, créditos |
| `casas.html` | House of Cosmic, House of L'éClair, Ballroom Navojoa, aliades |
| `categorias.html` | Las 8 categorías en orden, registro de lipsync, reglas |
| `talento.html` | Jueces (borradores), MC y DJ |
| `tienda.html` | Paquete Cosmic, boletos por fase, merch, cómo funciona la compra |
| `preguntas.html` | Preguntas frecuentes |
| `house-of-cosmic.html` | La casa, sus balls, la trilogía, integrantes |
| `gracias.html` | A donde regresa Stripe después de pagar |
| `404.html` | Página no encontrada |
| `assets/css/sitio.css` | Todo el diseño |
| `assets/js/sitio.js` | Fecha del ball, cuenta regresiva, menú en celular, carrusel |

## La fecha

La fecha del ball vive en un solo lugar: arriba de `assets/js/sitio.js` (`BALL.inicio`, `fechaLarga`, `fechaCorta`). Cámbiala ahí y se actualiza la cuenta regresiva y los textos con fecha.

## Tienda y pagos

Los precios y las ligas de pago se pegan arriba de `assets/js/sitio.js`, en el bloque `TIENDA`. Si el precio está vacío, se ve "Muy pronto". Cada botón se activa solo cuando su liga está puesta; mientras esté vacía dice "Próximamente". Después del pago, la liga debe redirigir a `https://houseofcosmic.com/gracias.html`.

## Cielo de estrellas

Todos los fondos negros (portada, cabeceras, secciones negras, paquetes, cierre y pie) llevan un cielo de estrellas que dibuja `sitio.js` al final del archivo. Para quitarlo de una sección, saca su clase de la lista `hosts`. Si la persona tiene activado "reducir movimiento" en su equipo, las estrellas se quedan quietas.

## Pendientes del sitio

El sitio ya no lleva notas internas en el código. Lo que falta:

- Precio de los dos paquetes, de la taquilla y de la camiseta Jutonio.
- Ligas de pago de cada producto.
- Fotos: integrantes de la casa, Kaia, Queenmi, April, playeras, abanicos y camiseta Jutonio. Mientras no hay foto, se ven las iniciales.
- Resto del panel de jueces (solo Kaia es pública).
- Liga al registro del lipsync.
- Sede: en el sitio dice "por revelar" hasta tener contrato firmado.
- Aliades y patrocinadores: la sección se quitó; se agrega cuando haya confirmados.
- Fecha del ball sin confirmar (13 de marzo de 2027 en el sitio).

## Antes de lanzar

- Quitar `<meta name="robots" content="noindex">` de todas las páginas.

_Última actualización: 9 de noviembre de 2026._
