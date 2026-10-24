# Hotel Restaurante La Barca · Web

Web del Hotel Restaurante La Barca (Pedro Muñoz, Ciudad Real). Hecha por Bramia.
HTML, CSS y JavaScript sin dependencias: se sube tal cual a cualquier hosting.

## Idea

Añil sobre arena: el zócalo azul de las casas manchegas y la cal. El único motivo es el **arco** de la fachada: lo llevan las fotos, los botones, las pestañas de la portada y las letras del pie. El fondo es la **Laguna del Pueblo**, que está a un paseo del hotel: ondas que derivan y se estiran con el scroll, anillos donde tocas o pasas el ratón y bandadas que cruzan de vez en cuando. En la portada, una barca navega sobre el agua; en la barra de arriba, otra recorre la página según bajas.

## Estructura

| Archivo | Qué es |
|---|---|
| `index.html` | La página (español; el inglés se aplica con el botón EN) |
| `css/styles.css` | Estilos y animaciones |
| `js/data.js` | **Datos editables**: teléfono, horario, pastelería, helados y habitaciones |
| `js/carta.js` | **La carta con precios** (pasada de las fotos de `IMAGENES CARTA/`, que no se sube) |
| `js/i18n.js` | Textos en inglés |
| `js/laguna.js` | El fondo vivo (canvas) |
| `js/app.js` | Idioma, "abierto ahora", carta con vista previa, pestañas, tira de habitaciones y entradas al hacer scroll |
| `assets/fotos/` | Fotos: las `hotel-*` son de la ficha del hotel en hotelcastillalamancha.com; el resto, del Instagram del cliente y de Wikimedia (laguna) |
| `assets/credits.json` | Créditos de las fotos de la laguna |

## Pendiente

- **Carta**: pasada el 24-10-2026. Confirmar con el cliente las descripciones de los tazones de salmorejo y gazpacho (no venían en la carta), si el «Culpan» de la carta es un coulant, el precio de los helados artesanos (no venía). No tienen menú del día: se quitaron de la web el menú, el cocido de los martes y el marisco del fin de semana (salían de publicaciones antiguas).
- **Fotos de la carta**: no hay fotos reales de hamburguesas, ensaladas, tostas ni combinados. Si el cliente las hace, se añaden con `foto` en `js/carta.js`.
- **Confirmar con el cliente**: servicios de las habitaciones (baño propio, aire, wifi, aparcamiento), si admiten mascotas, número de habitaciones.
- **Logo**: de momento el nombre va en texto.
- **Al publicar en el dominio**: quitar `<meta name="robots" content="noindex">` de `index.html` (está para que Google no indexe la versión de prueba).
- **Dominio**, `og:image` (JPEG no progresivo, como en El Rincón de Marinela), `robots.txt`, `sitemap.xml`, QR de `/carta` y `/resena`: al final.

## Ver en local

```bash
python -m http.server 5174
```

Abre http://localhost:5174. Para ver la página sin animaciones, añade `?quieto` a la URL; para abrirla en inglés, `?lang=en`.
