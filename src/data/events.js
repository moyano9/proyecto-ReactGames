// Eventos simulados para el proyecto
export const events = [
  {
    id: 1,
    title: "Gaming Expo 2025",
    location: "New York",
    image: "https://images.unsplash.com/photo-1538481527238-a49f06a4015d?w=400",
    description: "La mayor exposición de videojuegos del año. Descubre los últimos lanzamientos y juega en vivo.",
    date: "2025-04-15",
  },
  {
    id: 2,
    title: "Indie Game Developers Meetup",
    location: "San Francisco",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400",
    description: "Conoce a desarrolladores independientes y descubre los mejores juegos indie.",
    date: "2025-04-22",
  },
  {
    id: 3,
    title: "Esports Championship 2025",
    location: "Los Angeles",
    image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400",
    description: "Campeonato de esports con los mejores jugadores del mundo compitiendo.",
    date: "2025-05-10",
  },
  {
    id: 4,
    title: "Game Design Workshop",
    location: "Seattle",
    image: "https://images.unsplash.com/photo-1552159359-391aaa629496?w=400",
    description: "Taller práctico sobre diseño de juegos con expertos de la industria.",
    date: "2025-05-20",
  },
  {
    id: 5,
    title: "VR Gaming Festival",
    location: "Tokyo",
    image: "https://images.unsplash.com/photo-1567654351788-bfc8b5d2eaa6?w=400",
    description: "Festival dedicado a los videojuegos de realidad virtual.",
    date: "2025-06-05",
  },
];

// Simula una petición API que devuelve los eventos después de un pequeño retraso
export const fetchEvents = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(events);
    }, 500); // Simula un retraso de 500 milisegundos
  });
};
