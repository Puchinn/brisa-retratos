// This file contains the image data for the gallery

// Define categories with Spanish names
const CATEGORIES = {
  BOCETOS: "bocetos",
  OBRAS_VENTA: "obras-venta",
};
// {
//   id: i + 1,
//   url: bocetosUrls[i % bocetosUrls.length] + `?random=${i}&w=400&h=${height}`,
//   title: title,
//   category: CATEGORIES.BOCETOS,
//   height: height,
//   description: `Un boceto detallado con técnicas únicas y gran atención al detalle.`
// }
// Create array of image objects with random heights and appropriate category assignments
const generateImageData = () => {
  const images = [];

  // Define image collections by category to ensure realistic images for each
  const bocetosUrls = [
    "/public/1.webp",
    "/public/2.webp",
    "/public/3.webp",
    "/public/4.webp",
    "/public/5.webp",
    "/public/6.webp",
    "/public/7.webp",
    "/public/8.webp",
    "/public/9.webp",
    "/public/10.webp",
    "/public/11.webp",
    "/public/12.webp",
    "/public/13.webp",
    "/public/14.webp",
    "/public/15.webp",
    "/public/16.webp",
    "/public/17.webp",
    "/public/18.webp",
    "/public/19.webp",
    "/public/20.webp",
    "/public/21.webp",
    "/public/22.webp",
    "/public/23.webp",
    "/public/24.webp",
    "/public/25.webp",
    "/public/26.webp",
    "/public/27.webp",
    "/public/28.webp",
    "/public/29.webp",
    "/public/30.webp",
  ];

  const obrasVentaUrls = [
    "https://images.unsplash.com/photo-1544302586-e32b1c799485",
    "https://images.unsplash.com/photo-1602738328654-51ab2ae6c4ff",
    "https://images.unsplash.com/photo-1595701657604-acdb44223a22",
    "https://images.unsplash.com/photo-1501366062246-723b4d3e4eb6",
    "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead",
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5",
    "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8",
    "https://images.unsplash.com/photo-1630254688956-b1bfb7e65ceb",
    "https://images.unsplash.com/photo-1606143984016-7fe38d320f13",
    "https://images.unsplash.com/photo-1623072832224-5da7c3f5d010",
    "https://images.unsplash.com/photo-1599420186946-7b6fb14d551c",
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
    "https://images.unsplash.com/photo-1621600411688-54c27a3da75a",
    "https://images.unsplash.com/photo-1604488912264-dfeca9d0b8be",
    "https://images.unsplash.com/photo-1584847699966-3b0a56f8ecf3",
  ];

  // Add bocetos images (previously acrílicos)
  for (let i = 0; i < bocetosUrls.length; i++) {
    const height = Math.floor(Math.random() * 300) + 200; // Random height between 200-500px
    const title = `Boceto ${i + 1}`;

    images.push({
      id: i + 1,
      url:
        bocetosUrls[i % bocetosUrls.length] + `?random=${i}&w=400&h=${height}`,
      title: title,
      category: CATEGORIES.BOCETOS,
      height: height,
      description: `Un boceto detallado con técnicas únicas y gran atención al detalle.`,
    });
  }

  // Add Obras en Venta images (previously lápiz)
  for (let i = 0; i < obrasVentaUrls.length; i++) {
    const height = Math.floor(Math.random() * 300) + 200;
    const title = `Obra en Venta ${i + 1}`;
    const price = Math.floor(Math.random() * 4000) + 2000; // Random price between 2000-6000

    images.push({
      id: i + 18,
      url:
        obrasVentaUrls[i % obrasVentaUrls.length] +
        `?random=${i + 20}&w=400&h=${height}`,
      title: title,
      category: CATEGORIES.OBRAS_VENTA,
      height: height,
      price: price,
      description: `Una obra exclusiva disponible para compra. Técnica realismo a lápiz.`,
      phone: "+5212345678910", // Sample WhatsApp number - should be replaced with real number
    });
  }

  return images;
};

const imageData = [
  {
    id: 1,
    url: "/public/1.webp",
    title: "Ilusión",
    category: "bocetos",
    height: "384px",
    description: "",
  },
  {
    id: 2,
    url: "/public/2.webp",
    title: "La Dama",
    category: "bocetos",
    height: "298px",
    description: "",
  },
  {
    id: 3,
    url: "/public/3.webp",
    title: "Abuelo",
    category: "bocetos",
    height: "472px",
    description: "",
  },
  {
    id: 4,
    url: "/public/4.webp",
    title: "",
    category: "bocetos",
    height: "223px",
    description: "",
  },
  {
    id: 5,
    url: "/public/5.webp",
    title: "Potro Rodrigo",
    category: "bocetos",
    height: "408px",
    description: "",
  },
  {
    id: 6,
    url: "/public/6.webp",
    title: "Lionel Messi",
    category: "bocetos",
    height: "261px",
    description: "",
  },
  {
    id: 7,
    url: "/public/7.webp",
    title: "Cristiano Ronaldo",
    category: "bocetos",
    height: "386px",
    description: "",
  },
  {
    id: 8,
    url: "/public/8.webp",
    title: "Chaqueño Palavecino",
    category: "bocetos",
    height: "243px",
    description: "",
  },
  {
    id: 9,
    url: "/public/9.webp",
    title: "",
    category: "bocetos",
    height: "445px",
    description: " ",
  },
  {
    id: 10,
    url: "/public/10.webp",
    title: "",
    category: "bocetos",
    height: "410px",
    description: " ",
  },
  {
    id: 11,
    url: "/public/11.webp",
    title: "",
    category: "bocetos",
    height: "248px",
    description: "",
  },
  {
    id: 12,
    url: "/public/12.webp",
    title: "La Negra Sosa",
    category: "bocetos",
    height: "488px",
    description: " ",
  },
  {
    id: 13,
    url: "/public/13.webp",
    title: "Wos",
    category: "bocetos",
    height: "289px",
    description: " ",
  },
  {
    id: 14,
    url: "/public/14.webp",
    title: "",
    category: "bocetos",
    height: "334px",
    description: "",
  },
  {
    id: 15,
    url: "/public/15.webp",
    title: "Trueno",
    category: "bocetos",
    height: "257px",
    description: " ",
  },
  {
    id: 16,
    url: "/public/16.webp",
    title: "Carlitos Tévez",
    category: "bocetos",
    height: "318px",
    description: "",
  },
  {
    id: 17,
    url: "/public/17.webp",
    title: "",
    category: "bocetos",
    height: "476px",
    description: "",
  },
  {
    id: 18,
    url: "/public/18.webp",
    title: "Lionel Messi | Copa América",
    category: "bocetos",
    height: "397px",
    description: " ",
  },
  {
    id: 19,
    url: "/public/19.webp",
    title: "",
    category: "bocetos",
    height: "366px",
    description: " ",
  },
  {
    id: 20,
    url: "/public/20.webp",
    title: "",
    category: "bocetos",
    height: "213px",
    description: "",
  },
  {
    id: 21,
    url: "/public/21.webp",
    title: "Fredy Mercury",
    category: "bocetos",
    height: "488px",
    description: "",
  },
  {
    id: 22,
    url: "/public/22.webp",
    title: "",
    category: "bocetos",
    height: "315px",
    description: "",
  },
  {
    id: 23,
    url: "/public/23.webp",
    title: "Potro",
    category: "bocetos",
    height: "442px",
    description: "",
  },
  {
    id: 24,
    url: "/public/24.webp",
    title: "Que se mejoren | Wos",
    category: "bocetos",
    height: "203px",
    description: "",
  },
  {
    id: 25,
    url: "/public/25.webp",
    title: "",
    category: "bocetos",
    height: "486px",
    description: "",
  },
  {
    id: 26,
    url: "/public/26.webp",
    title: "",
    category: "bocetos",
    height: "368px",
    description: "",
  },
  {
    id: 27,
    url: "/public/27.webp",
    title: "",
    category: "bocetos",
    height: "243px",
    description: "",
  },
  {
    id: 28,
    url: "/public/28.webp",
    title: "Búho",
    category: "bocetos",
    height: "474px",
    description: "",
  },
  {
    id: 29,
    url: "/public/29.webp",
    title: "Ángel",
    category: "bocetos",
    height: "276px",
    description: "",
  },
  {
    id: 30,
    url: "/public/30.webp",
    title: "",
    category: "bocetos",
    height: "467px",
    description: "",
  },
];

const obras = [
  {
    id: 1,
    url: "/public/16.webp",
    titulo: "Obra en venta 1",
    category: "obras-venta",
    price: 40000,
    description: "",
    phone: "3572444089",
    height: "326px",
  },
  {
    id: 2,
    url: "/public/13.webp",
    titulo: "Obra en venta 2",
    category: "obras-venta",
    price: 30000,
    description: "",
    phone: "3572444089",
    height: "478px",
  },
  {
    id: 3,
    url: "/public/6.webp",
    titulo: "Obra en venta 3",
    category: "obras-venta",
    price: 30000,
    description: "",
    phone: "3572444089",
    height: "311px",
  },
];
