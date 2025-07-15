// Script para añadir datos de ejemplo a Rexistro
// Ejecutar en la consola del navegador: copy(sampleData) y luego pegar en localStorage

const sampleData = [
  // Desayunos
  {
    id: 1,
    name: "Tostadas con aguacate",
    description: "Pan integral con aguacate, tomate y aceite de oliva",
    date: "2025-07-14",
    type: "desayuno",
    createdAt: "2025-07-14T08:30:00.000Z"
  },
  {
    id: 2,
    name: "Café con leche y galletas",
    description: "Café con leche desnatada y galletas integrales",
    date: "2025-07-13",
    type: "desayuno",
    createdAt: "2025-07-13T08:15:00.000Z"
  },
  {
    id: 3,
    name: "Cereales con frutas",
    description: "Cereales integrales con plátano y fresas",
    date: "2025-07-12",
    type: "desayuno",
    createdAt: "2025-07-12T08:45:00.000Z"
  },
  {
    id: 4,
    name: "Tostadas con aguacate",
    description: "Pan integral con aguacate, tomate y aceite de oliva",
    date: "2025-07-10",
    type: "desayuno",
    createdAt: "2025-07-10T08:30:00.000Z"
  },
  {
    id: 5,
    name: "Yogur con granola",
    description: "Yogur natural con granola casera y miel",
    date: "2025-07-08",
    type: "desayuno",
    createdAt: "2025-07-08T08:00:00.000Z"
  },
  {
    id: 6,
    name: "Huevos revueltos",
    description: "Huevos revueltos con jamón y queso",
    date: "2025-07-05",
    type: "desayuno",
    createdAt: "2025-07-05T09:00:00.000Z"
  },
  
  // Comidas
  {
    id: 7,
    name: "Pasta con tomate",
    description: "Espaguetis con salsa de tomate casera y albahaca",
    date: "2025-07-14",
    type: "comida",
    createdAt: "2025-07-14T14:30:00.000Z"
  },
  {
    id: 8,
    name: "Ensalada mixta",
    description: "Lechuga, tomate, pepino, zanahoria y atún",
    date: "2025-07-13",
    type: "comida",
    createdAt: "2025-07-13T13:45:00.000Z"
  },
  {
    id: 9,
    name: "Pollo a la plancha",
    description: "Pechuga de pollo con verduras al vapor",
    date: "2025-07-12",
    type: "comida",
    createdAt: "2025-07-12T14:00:00.000Z"
  },
  {
    id: 10,
    name: "Pasta con tomate",
    description: "Espaguetis con salsa de tomate casera y albahaca",
    date: "2025-07-11",
    type: "comida",
    createdAt: "2025-07-11T14:30:00.000Z"
  },
  {
    id: 11,
    name: "Arroz con pollo",
    description: "Arroz amarillo con pollo y verduras",
    date: "2025-07-09",
    type: "comida",
    createdAt: "2025-07-09T14:15:00.000Z"
  },
  {
    id: 12,
    name: "Sopa de verduras",
    description: "Sopa casera con verduras de temporada",
    date: "2025-07-06",
    type: "comida",
    createdAt: "2025-07-06T13:30:00.000Z"
  },
  
  // Cenas
  {
    id: 13,
    name: "Sándwich de jamón",
    description: "Sándwich de jamón serrano con tomate",
    date: "2025-07-14",
    type: "cena",
    createdAt: "2025-07-14T21:00:00.000Z"
  },
  {
    id: 14,
    name: "Pescado al horno",
    description: "Merluza al horno con patatas y cebolla",
    date: "2025-07-13",
    type: "cena",
    createdAt: "2025-07-13T20:30:00.000Z"
  },
  {
    id: 15,
    name: "Tortilla española",
    description: "Tortilla de patatas con cebolla",
    date: "2025-07-12",
    type: "cena",
    createdAt: "2025-07-12T21:15:00.000Z"
  },
  {
    id: 16,
    name: "Sándwich de jamón",
    description: "Sándwich de jamón serrano con tomate",
    date: "2025-07-10",
    type: "cena",
    createdAt: "2025-07-10T21:00:00.000Z"
  },
  {
    id: 17,
    name: "Crema de calabacín",
    description: "Crema de calabacín con queso fresco",
    date: "2025-07-07",
    type: "cena",
    createdAt: "2025-07-07T20:45:00.000Z"
  },
  {
    id: 18,
    name: "Pizza casera",
    description: "Pizza con jamón, queso y champiñones",
    date: "2025-07-04",
    type: "cena",
    createdAt: "2025-07-04T21:30:00.000Z"
  }
];

// Para usar en el navegador:
console.log("Datos de ejemplo para Rexistro:");
console.log("localStorage.setItem('rexistro-meals', JSON.stringify(sampleData))");
console.log("Luego recarga la página");

// Para copiar al portapapeles
console.log("Copia esto y pégalo en la consola:");
console.log(`localStorage.setItem('rexistro-meals', '${JSON.stringify(sampleData)}'); location.reload();`);

export default sampleData;
