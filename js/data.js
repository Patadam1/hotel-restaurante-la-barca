/* Todos los datos editables de la web.
   Cada texto va en español (es) y en inglés (en). Las fotos están en assets/fotos/. */
window.LA_BARCA = {
  telefono: "722 85 68 75",
  telefonoHref: "tel:+34722856875",
  direccion: "Av. de la Constitución, 34 · 13620 Pedro Muñoz (Ciudad Real)",
  mapa: "https://www.google.com/maps/search/?api=1&query=Hotel+Restaurante+La+Barca+Pedro+Mu%C3%B1oz",
  instagram: "https://www.instagram.com/hotel.restaurante.labarca/",
  instagramPasteleria: "https://www.instagram.com/pasteleria_labarca/",

  // 0 = domingo … 6 = sábado. Cierre después de medianoche: "24:00".
  horario: [
    { abre: "8:30", cierra: "22:00" }, // domingo
    { abre: "7:30", cierra: "22:00" }, // lunes
    { abre: "7:30", cierra: "22:00" }, // martes
    { abre: "7:30", cierra: "22:00" }, // miércoles
    { abre: "7:30", cierra: "22:00" }, // jueves
    { abre: "7:30", cierra: "24:00" }, // viernes
    { abre: "8:30", cierra: "24:00" }  // sábado
  ],

  // La carta está en js/carta.js.

  // Pastelería y heladería: pestañas.
  dulces: [
    {
      id: "tartas",
      pestana: { es: "Tartas", en: "Cakes" },
      foto: "tartas-filipinos-kinder",
      titulo: { es: "Tartas de la casa", en: "Homemade cakes" },
      texto: {
        es: "Chocolate, red velvet, queso manchego, zanahoria, milhojas de crema, Kinder, filipinos y de frutas. Enteras o por porciones, y mini tartas para no tener que elegir.",
        en: "Chocolate, red velvet, Manchego cheesecake, carrot, custard mille-feuille, Kinder, Filipinos and fruit tart. Whole or by the slice, plus mini cakes so you don't have to choose."
      }
    },
    {
      id: "bolleria",
      pestana: { es: "Bollería", en: "Pastries" },
      foto: "bizcochos",
      titulo: { es: "Bollería del día", en: "Fresh every morning" },
      texto: {
        es: "Bizcochos de manzana y de chocolate, rosquillas fritas, palmeras de mermelada y pastas secas caseras, desde las 7:30 con el café. Tenemos productos para celíacos y veganos.",
        en: "Apple and chocolate sponge cakes, fried rosquillas, jam palmiers and homemade biscuits, from 7:30 with your coffee. Gluten-free and vegan options too."
      }
    },
    {
      id: "helados",
      pestana: { es: "Heladería", en: "Ice cream" },
      foto: null,
      titulo: { es: "Helados y granizados", en: "Ice cream and slushies" },
      texto: {
        es: "Una bola 2,50 € · dos bolas 4,50 € · batidos 3,50 € · granizados de café, horchata o limón 2,50 €.",
        en: "One scoop €2.50 · two scoops €4.50 · milkshakes €3.50 · coffee, horchata or lemon slush €2.50."
      }
    }
  ],

  // Sabores de helado (color de la bola).
  sabores: [
    { es: "Vainilla", en: "Vanilla", color: "#f3dd9a" },
    { es: "Chocolate", en: "Chocolate", color: "#5a3424" },
    { es: "Fresa", en: "Strawberry", color: "#ec7b97" },
    { es: "Stracciatella", en: "Stracciatella", color: "#efe7d6" },
    { es: "Cookies & Cream", en: "Cookies & Cream", color: "#cfc5b4" },
    { es: "Mango", en: "Mango", color: "#f2a33a" },
    { es: "Pistacho", en: "Pistachio", color: "#a9c46c" },
    { es: "Limón", en: "Lemon", color: "#f5e27a" }
  ],

  // Habitaciones (fotos provisionales: pedir fotos actuales al cliente).
  habitaciones: [
    { foto: "fachada", nombre: { es: "El hotel, en la N-420", en: "The hotel, on the N-420" } },
    { foto: "habitacion-matrimonio", nombre: { es: "Doble de matrimonio", en: "Double room" } },
    { foto: "habitacion-doble-camas", nombre: { es: "Doble con dos camas", en: "Twin room" } },
    { foto: "habitacion-verde", nombre: { es: "Doble con sillón", en: "Double with armchair" } },
    { foto: "habitacion-armario", nombre: { es: "Doble con armario", en: "Double with wardrobe" } },
    { foto: "comedor", nombre: { es: "El comedor, abajo", en: "The dining room downstairs" } }
  ]
};
