import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGameDetails } from '../services/api';
import { useFavorites } from '../hooks/useFavorites';

/**
 * GameDetail - Página que muestra los detalles completos de un juego
 * Se accede a través de /game/:id
 */
export default function GameDetail() {
  // Obtener el ID del juego desde la URL
  const { id } = useParams();
  const navigate = useNavigate();

  // Estado del componente
  const [game, setGame] = useState(null); // Datos del juego
  const [loading, setLoading] = useState(true); // Mientras carga
  const { isFavorite, toggleFavorite } = useFavorites(id); // Hook de favoritos

  // Estados para efectos hover
  const [favoriteHovered, setFavoriteHovered] = useState(false);
  const [backButtonHovered, setBackButtonHovered] = useState(false);

  // Cargar los detalles del juego cuando se monta el componente
  useEffect(() => {
    const fetchGame = async () => {
      const data = await getGameDetails(id);
      setGame(data);
      setLoading(false);
    };
    fetchGame();
  }, [id]);

  // Estilos del componente (organizados por secciones)
  const styles = {
    page: {
      backgroundColor: '#111827',
      minHeight: '100vh',
      padding: '3rem 1rem',
      marginTop: '80px',
    },
    container: {
      maxWidth: '56rem',
      margin: '0 auto',
    },
    backButton: {
      marginBottom: '1.5rem',
      backgroundColor: backButtonHovered ? '#6d28d9' : '#7c3aed',
      color: '#ffffff',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    card: {
      backgroundColor: '#1f2937',
      borderRadius: '0.5rem',
      overflow: 'hidden',
      boxShadow: '0 20px 25px rgba(0, 0, 0, 0.5)',
    },
    imageContainer: {
      position: 'relative',
      height: '384px',
      backgroundColor: '#111827',
      backgroundImage: `url(${game?.background_image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    imageOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      padding: '2rem',
    },
    titleSection: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1.5rem',
      gap: '1rem',
    },
    title: {
      fontSize: '2.25rem',
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: '1rem',
      flex: 1,
    },
    favoriteButton: {
      fontSize: '3rem',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      transition: 'transform 0.3s',
      padding: '0.5rem',
      flexShrink: 0,
      transform: favoriteHovered ? 'scale(1.2)' : 'scale(1)',
      color: isFavorite ? '#ef4444' : '#9ca3af',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
      marginBottom: '2rem',
    },
    section: {
      marginBottom: '1.5rem',
    },
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#a78bfa',
      marginBottom: '0.5rem',
    },
    ratingContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    rating: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      color: '#fbbf24',
    },
    ratingText: {
      color: '#9ca3af',
    },
    text: {
      color: '#d1d5db',
    },
    genresList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
    },
    genre: {
      backgroundColor: '#7c3aed',
      color: '#ffffff',
      padding: '0.375rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.875rem',
    },
    platform: {
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      padding: '0.375rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.875rem',
    },
    description: {
      marginBottom: '2rem',
    },
    descriptionText: {
      color: '#d1d5db',
      lineHeight: '1.5',
    },
    statsSection: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '1.5rem',
      borderTop: '1px solid #374151',
      paddingTop: '2rem',
    },
    stat: {
      marginBottom: 0,
    },
    statLabel: {
      color: '#9ca3af',
      fontSize: '0.875rem',
      marginBottom: '0.25rem',
    },
    statValue: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
    loadingText: {
      color: '#ffffff',
      fontSize: '1.25rem',
    },
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.loadingContainer}>
          <div style={styles.loadingText}>⏳ Cargando detalles del juego...</div>
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div style={styles.page}>
        <div style={styles.loadingContainer}>
          <div style={styles.loadingText}>❌ Juego no encontrado</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Botón para volver atrás */}
        <button
          onClick={() => navigate(-1)}
          style={styles.backButton}
          onMouseEnter={() => setBackButtonHovered(true)}
          onMouseLeave={() => setBackButtonHovered(false)}
        >
          ← Atrás
        </button>

        {/* Card principal con toda la información */}
        <div style={styles.card}>
          {/* Imagen de fondo */}
          <div style={styles.imageContainer}>
            <div style={styles.imageOverlay}></div>
          </div>

          <div style={styles.content}>
            {/* Sección: Título y botón de favoritos */}
            <div style={styles.titleSection}>
              <h1 style={styles.title}>{game.name}</h1>
              <button
                onClick={toggleFavorite}
                style={styles.favoriteButton}
                onMouseEnter={() => setFavoriteHovered(true)}
                onMouseLeave={() => setFavoriteHovered(false)}
                title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              >
                {isFavorite ? '❤️' : '🤍'}
              </button>
            </div>

            {/* Sección: Información principal en 2 columnas */}
            <div style={styles.grid}>
              {/* Columna izquierda */}
              <div>
                {/* Calificación */}
                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>⭐ Calificación</h3>
                  <div style={styles.ratingContainer}>
                    <span style={styles.rating}>{game.rating}/5</span>
                    <span style={styles.ratingText}>({game.ratings_count} reseñas)</span>
                  </div>
                </div>

                {/* Fecha de lanzamiento */}
                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>📅 Fecha de Lanzamiento</h3>
                  <p style={styles.text}>
                    {game.released
                      ? new Date(game.released).toLocaleDateString('es-ES')
                      : 'N/A'}
                  </p>
                </div>

                {/* Desarrollador */}
                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>👨‍💼 Desarrollador</h3>
                  <p style={styles.text}>{game.developers?.[0]?.name || 'Desconocido'}</p>
                </div>
              </div>

              {/* Columna derecha */}
              <div>
                {/* Géneros */}
                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>🎮 Géneros</h3>
                  <div style={styles.genresList}>
                    {game.genres?.map((genre) => (
                      <span key={genre.id} style={styles.genre}>
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Plataformas */}
                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>💻 Plataformas</h3>
                  <div style={styles.genresList}>
                    {game.platforms?.map((platform) => (
                      <span key={platform.platform.id} style={styles.platform}>
                        {platform.platform.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sección: Descripción */}
            {game.description && (
              <div style={styles.description}>
                <h3 style={styles.sectionTitle}>📖 Descripción</h3>
                <p style={styles.descriptionText}>
                  {/* Remover etiquetas HTML de la descripción */}
                  {game.description.replace(/<[^>]*>/g, '')}
                </p>
              </div>
            )}

            {/* Sección: Estadísticas adicionales */}
            <div style={styles.statsSection}>
              <div style={styles.stat}>
                <h4 style={styles.statLabel}>Puntuación RAWG</h4>
                <p style={{ ...styles.statValue, color: '#a78bfa' }}>{game.rating}</p>
              </div>
              <div style={styles.stat}>
                <h4 style={styles.statLabel}>Total de Reseñas</h4>
                <p style={{ ...styles.statValue, color: '#3b82f6' }}>{game.ratings_count}</p>
              </div>
              <div style={styles.stat}>
                <h4 style={styles.statLabel}>Año de Lanzamiento</h4>
                <p style={{ ...styles.statValue, color: '#10b981' }}>
                  {game.released ? new Date(game.released).getFullYear() : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
