/* La carta de La Barca, pasada de las fotos de la carta (octubre de 2026).
   Precio en euros como número (11 = 11,00 €); la web lo escribe en cada idioma.
   "foto" es opcional (nombre de archivo en assets/fotos, sin .jpg).
   "nota" sale bajo el nombre de la sección. */
window.LA_BARCA_CARTA = [
  {
    id: "hamburguesas",
    nombre: { es: "Hamburguesas", en: "Burgers" },
    nota: { es: "Todas nuestras hamburguesas llevan patatas.", en: "All our burgers come with chips." },
    platos: [
      { nombre: { es: "La Barca", en: "La Barca" }, precio: 11,
        desc: { es: "Doble carne de ternera, lechuga, tomate, cebolla morada, bacon, queso y huevo.", en: "Double beef patty, lettuce, tomato, red onion, bacon, cheese and egg." } },
      { nombre: { es: "Ternera", en: "Beef" }, precio: 7,
        desc: { es: "Carne 100 % de ternera, lechuga, cebolla morada, tomate, bacon, queso y huevo.", en: "100% beef, lettuce, red onion, tomato, bacon, cheese and egg." } },
      { nombre: { es: "Pollo", en: "Chicken" }, precio: 7,
        desc: { es: "Carne de pollo 100 % picada, lechuga, tomate, cebolla, huevo, queso y bacon.", en: "100% minced chicken, lettuce, tomato, onion, egg, cheese and bacon." } },
      { nombre: { es: "Buey", en: "Ox" }, precio: 11,
        desc: { es: "70 % buey y 30 % vaca en pan de brioche, cebolla caramelizada, lechuga, bacon y rulo de cabra.", en: "70% ox and 30% beef on a brioche bun, caramelised onion, lettuce, bacon and goat's cheese." } },
      { nombre: { es: "Angus", en: "Angus" }, precio: 11,
        desc: { es: "Carne 100 % Angus en pan de brioche, lechuga, tomate, bacon y cebolla caramelizada.", en: "100% Angus beef on a brioche bun, lettuce, tomato, bacon and caramelised onion." } },
      { nombre: { es: "Pollo crujiente", en: "Crispy chicken" }, precio: 10,
        desc: { es: "Pollo 100 % crujiente con lechuga, tomate y cebolla.", en: "100% crispy chicken with lettuce, tomato and onion." } },
      { nombre: { es: "Hamburguesa simple", en: "Plain burger" }, precio: 5.5,
        desc: { es: "De ternera o de pollo, con lechuga y tomate.", en: "Beef or chicken, with lettuce and tomato." } }
    ]
  },
  {
    id: "ensaladas",
    nombre: { es: "Ensaladas y tazones", en: "Salads and soups" },
    platos: [
      { foto: "ensalada-aguacate", nombre: { es: "Ensalada de aguacate", en: "Avocado salad" }, precio: 11,
        desc: { es: "Tarta de tomate con aguacate sobre base de salmorejo, gamba a la plancha y reducción de Módena.", en: "Tomato and avocado stack on salmorejo with a grilled prawn and balsamic reduction." } },
      { nombre: { es: "Ensalada de pollo", en: "Chicken salad" }, precio: 10,
        desc: { es: "Lechuga variada, cebolla frita, maíz, tomate, pollo empanado y salsa de yogur.", en: "Mixed leaves, crispy onion, sweetcorn, tomato, breaded chicken and yoghurt dressing." } },
      { nombre: { es: "Ensalada de anchoas", en: "Anchovy salad" }, precio: 12,
        desc: { es: "Cama de tomate y anchoas.", en: "Sliced tomato topped with anchovies." } },
      { nombre: { es: "Ensalada de ventresca", en: "Tuna belly salad" }, precio: 12,
        desc: { es: "Tomate en medias lunas con ventresca, cebolla morada y reducción de Módena.", en: "Tomato wedges with tuna belly, red onion and balsamic reduction." } },
      { nombre: { es: "Ensalada de rulo de cabra", en: "Goat's cheese salad" }, precio: 13,
        desc: { es: "Lechuga variada, cebolla frita, tomate, rulo de cabra a la plancha, jamón serrano y frutos secos.", en: "Mixed leaves, crispy onion, tomato, grilled goat's cheese, serrano ham and nuts." } },
      { nombre: { es: "Ensalada de la casa", en: "House salad" }, precio: 9,
        desc: { es: "Lechuga variada, tomate, maíz, atún, huevo duro y cebolla.", en: "Mixed leaves, tomato, sweetcorn, tuna, boiled egg and onion." } },
      { nombre: { es: "Tazón de salmorejo", en: "Bowl of salmorejo" }, precio: 5.5,
        desc: { es: "Crema fría de tomate con huevo y jamón.", en: "Chilled tomato cream with egg and ham." } },
      { nombre: { es: "Tazón de gazpacho", en: "Bowl of gazpacho" }, precio: 5.5,
        desc: { es: "Gazpacho frío con su guarnición.", en: "Chilled gazpacho with its garnish." } }
    ]
  },
  {
    id: "tostas",
    nombre: { es: "Tostas", en: "Toasts" },
    nota: { es: "Todas las tostas llevan patatas. Tostas 8,00 €; tostas especiales 12,00 €.", en: "All toasts come with chips. Toasts €8.00; special toasts €12.00." },
    platos: [
      { nombre: { es: "Catalana", en: "Catalana" }, precio: 8,
        desc: { es: "Tomate triturado, jamón serrano a la plancha y aceite de oliva virgen extra.", en: "Crushed tomato, grilled serrano ham and extra virgin olive oil." } },
      { nombre: { es: "Solomillo", en: "Pork tenderloin" }, precio: 8,
        desc: { es: "Salsa de queso cheddar, solomillo de cerdo y rulo de cabra.", en: "Cheddar sauce, pork tenderloin and goat's cheese." } },
      { nombre: { es: "Salmón", en: "Salmon" }, precio: 8,
        desc: { es: "Alioli, salmón ahumado noruego y aguacate.", en: "Aioli, Norwegian smoked salmon and avocado." } },
      { nombre: { es: "Gulas", en: "Gulas and prawns" }, precio: 8,
        desc: { es: "Salteado de gulas y gambas con ajo y cayena.", en: "Sautéed gulas and prawns with garlic and chilli." } },
      { nombre: { es: "Orza · especial", en: "Orza · special" }, precio: 12,
        desc: { es: "Lomo de orza, alioli y pimientos fritos.", en: "Preserved pork loin, aioli and fried peppers." } },
      { nombre: { es: "Caballa · especial", en: "Mackerel · special" }, precio: 12,
        desc: { es: "Tomate triturado, pimiento de piquillo, cebolla morada, huevo cocido y caballa.", en: "Crushed tomato, piquillo pepper, red onion, boiled egg and mackerel." } },
      { nombre: { es: "La Barca · especial", en: "La Barca · special" }, precio: 12,
        desc: { es: "Salmorejo, aguacate en cubitos y gambas al ajillo.", en: "Salmorejo, diced avocado and garlic prawns." } },
      { nombre: { es: "Matrimonio · especial", en: "Matrimonio · special" }, precio: 12,
        desc: { es: "Tomate, pimientos de piquillo, anchoas y boquerones.", en: "Tomato, piquillo peppers, anchovies and pickled anchovies." } },
      { nombre: { es: "Ibérica · especial", en: "Ibérica · special" }, precio: 12,
        desc: { es: "Tomate triturado, jamón ibérico al natural y rulo de cabra a la plancha.", en: "Crushed tomato, Iberian ham and grilled goat's cheese." } }
    ]
  },
  {
    id: "sandwiches",
    nombre: { es: "Sándwiches", en: "Sandwiches" },
    nota: { es: "Todos llevan patatas. Los ingredientes extra se cobran aparte.", en: "All come with chips. Extra ingredients are charged separately." },
    platos: [
      { nombre: { es: "Mixto", en: "Ham and cheese" }, precio: 3.5,
        desc: { es: "Pan de molde, jamón de York y queso.", en: "Sliced bread, cooked ham and cheese." } },
      { nombre: { es: "Mixto con huevo", en: "Ham, cheese and egg" }, precio: 4.5,
        desc: { es: "Jamón de York, queso y huevo frito.", en: "Cooked ham, cheese and fried egg." } },
      { nombre: { es: "Mixto con bacon", en: "Ham, cheese and bacon" }, precio: 5,
        desc: { es: "Jamón de York, queso, bacon y huevo.", en: "Cooked ham, cheese, bacon and egg." } },
      { nombre: { es: "Vegetal", en: "Vegetal" }, precio: 5.5,
        desc: { es: "Lechuga, tomate, cebolla, huevo duro y atún.", en: "Lettuce, tomato, onion, boiled egg and tuna." } },
      { nombre: { es: "Vegetal con salmón", en: "Vegetal with salmon" }, precio: 6,
        desc: { es: "Cebolla, tomate, lechuga, huevo duro y salmón ahumado noruego.", en: "Onion, tomato, lettuce, boiled egg and Norwegian smoked salmon." } },
      { nombre: { es: "Vegetal con pollo", en: "Vegetal with chicken" }, precio: 6,
        desc: { es: "Lechuga, tomate, cebolla y pechuga de pollo a la plancha.", en: "Lettuce, tomato, onion and grilled chicken breast." } },
      { nombre: { es: "La Barca", en: "La Barca" }, precio: 6.7,
        desc: { es: "Lechuga, tomate, cebolla morada, bacon y pollo a la plancha.", en: "Lettuce, tomato, red onion, bacon and grilled chicken." } }
    ]
  },
  {
    id: "combinados",
    nombre: { es: "Platos combinados", en: "Combo plates" },
    nota: { es: "12,00 € cada uno, con ensalada, huevo y patatas. No incluye bebida. Los empanados llevan 1 € de suplemento.", en: "€12.00 each, with salad, egg and chips. Drink not included. Breaded options €1 extra." },
    platos: [
      { nombre: { es: "Chipirones fritos", en: "Fried baby squid" }, precio: 12, desc: { es: "", en: "" } },
      { nombre: { es: "Churrasco de pollo", en: "Grilled chicken churrasco" }, precio: 12, desc: { es: "", en: "" } },
      { nombre: { es: "Churrasco de ternera", en: "Grilled beef churrasco" }, precio: 12, desc: { es: "", en: "" } },
      { nombre: { es: "Solomillo de cerdo", en: "Pork tenderloin" }, precio: 12, desc: { es: "", en: "" } },
      { nombre: { es: "Filete de ternera", en: "Beef steak" }, precio: 12, desc: { es: "", en: "" } },
      { nombre: { es: "Pechuga de pollo", en: "Chicken breast" }, precio: 12, desc: { es: "", en: "" } },
      { nombre: { es: "Calamares", en: "Fried squid rings" }, precio: 12, desc: { es: "", en: "" } },
      { nombre: { es: "Alas de pollo", en: "Chicken wings" }, precio: 12, desc: { es: "Tres unidades.", en: "Three pieces." } }
    ]
  },
  {
    id: "desayunos",
    nombre: { es: "Desayunos y almuerzos", en: "Breakfast and brunch" },
    nota: { es: "Con sepia, chipirones, rejos, gambas o pollo, 1 € más.", en: "With cuttlefish, baby squid, squid tentacles, prawns or chicken, €1 extra." },
    platos: [
      { nombre: { es: "Café o infusión, zumo y tostada", en: "Coffee or tea, juice and toast" }, precio: 4.8, desc: { es: "", en: "" } },
      { nombre: { es: "Café o infusión y tostada", en: "Coffee or tea and toast" }, precio: 2.8, desc: { es: "", en: "" } },
      { nombre: { es: "Café o infusión y tostada de jamón, atún o queso", en: "Coffee or tea and ham, tuna or cheese toast" }, precio: 3.9, desc: { es: "", en: "" } },
      { nombre: { es: "Café o infusión y croissant", en: "Coffee or tea and croissant" }, precio: 3, desc: { es: "", en: "" } },
      { nombre: { es: "Café o infusión y plum cake", en: "Coffee or tea and plum cake" }, precio: 3, desc: { es: "", en: "" } },
      { nombre: { es: "Café o infusión y croissant mixto", en: "Coffee or tea and ham and cheese croissant" }, precio: 5.2, desc: { es: "", en: "" } },
      { nombre: { es: "Café o infusión y sándwich mixto", en: "Coffee or tea and ham and cheese sandwich" }, precio: 4.8, desc: { es: "", en: "" } },
      { nombre: { es: "Bocadillo y bebida", en: "Baguette sandwich and drink" }, precio: 6, desc: { es: "", en: "" } },
      { nombre: { es: "Montado y bebida", en: "Small open sandwich and drink" }, precio: 5.5, desc: { es: "", en: "" } },
      { nombre: { es: "Plato combinado y bebida", en: "Combo plate and drink" }, precio: 6, desc: { es: "En el almuerzo.", en: "At mid-morning." } },
      { nombre: { es: "Zumo natural", en: "Fresh orange juice" }, precio: 3, desc: { es: "", en: "" } },
      { nombre: { es: "Café", en: "Coffee" }, precio: 1.5, desc: { es: "", en: "" } },
      { nombre: { es: "Colacao", en: "Hot chocolate (Colacao)" }, precio: 1.7, desc: { es: "", en: "" } },
      { nombre: { es: "Café con gota de licor", en: "Coffee with a dash of liqueur" }, precio: 1.8, desc: { es: "", en: "" } },
      { nombre: { es: "Capuccino", en: "Cappuccino" }, precio: 2, desc: { es: "", en: "" } }
    ]
  },
  {
    id: "postres",
    nombre: { es: "Postres", en: "Desserts" },
    nota: { es: "Tartas caseras: 4,50 € la porción.", en: "Homemade cakes: €4.50 a slice." },
    platos: [
      { foto: "tarta-chocolate", nombre: { es: "Tarta de chocolate", en: "Chocolate cake" }, precio: 4.5, desc: { es: "Casera.", en: "Homemade." } },
      { foto: "tartas-redvelvet-queso", nombre: { es: "Tarta red velvet", en: "Red velvet cake" }, precio: 4.5, desc: { es: "Casera.", en: "Homemade." } },
      { foto: "hotel-tarta-queso-frutos", nombre: { es: "Tarta de queso manchego", en: "Manchego cheesecake" }, precio: 4.5, desc: { es: "Casera, con frutos rojos.", en: "Homemade, with red berries." } },
      { nombre: { es: "Tarta de zanahoria", en: "Carrot cake" }, precio: 4.5, desc: { es: "Casera.", en: "Homemade." } },
      { nombre: { es: "Milhojas de crema pastelera", en: "Custard mille-feuille" }, precio: 4.5, desc: { es: "Casera.", en: "Homemade." } },
      { nombre: { es: "Tarta whisky", en: "Whisky ice-cream cake" }, precio: 4, desc: { es: "", en: "" } },
      { nombre: { es: "Coulant de chocolate", en: "Chocolate lava cake" }, precio: 4, desc: { es: "", en: "" } },
      { nombre: { es: "Whisky o crema catalana", en: "Whisky or crema catalana" }, precio: 4.9, desc: { es: "", en: "" } },
      { nombre: { es: "Tortitas", en: "Pancakes" }, precio: 3.5, desc: { es: "", en: "" } },
      { nombre: { es: "Fruta del tiempo", en: "Seasonal fruit" }, precio: 2, desc: { es: "", en: "" } },
      { nombre: { es: "Helados artesanos", en: "Artisan ice cream" }, desc: { es: "Servidos en cerámica. Pregúntanos los sabores.", en: "Served in ceramic bowls. Ask for today's flavours." } }
    ]
  }
];
