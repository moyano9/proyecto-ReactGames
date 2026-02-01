import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';

/**
 * GameCard - Componente que muestra una tarjeta de un juego
 * 
 * Props:
 * - game: Objeto con datos del juego (name, background_image, rating, etc)
 */
export default function GameCard({ game }) {
  // Usar el hook personalizado para favoritos
  const { isFavorite, toggleFavorite } = useFavorites(game.id);
  
  // Estado para efectos hover (cambiar apariencia al pasar mouse)
  const [isHovered, setIsHovered] = useState(false);
  const [favButtonHovered, setFavButtonHovered] = useState(false);

  // Estilos del componente (en línea para simplicidad)
  const styles = {
    card: {
      backgroundColor: '#1f2937',
      borderRadius: '0.5rem',
      overflow: 'hidden',
      cursor: 'pointer',
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.3)',
      transition: 'transform 0.3s, box-shadow 0.3s',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative',
      // Hacer la tarjeta más grande al pasar el mouse (hover)
      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      boxShadow: isHovered 
        ? '0 20px 25px rgba(0, 0, 0, 0.5)' 
        : '0 10px 15px rgba(0, 0, 0, 0.3)',
    },
    imageContainer: {
      height: '200px',
      backgroundColor: '#111827',
      overflow: 'hidden',
      flexShrink: 0,
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      // Oscurecer la imagen al pasar el mouse
      filter: isHovered ? 'brightness(0.75)' : 'brightness(1)',
      transition: 'filter 0.3s',
    },
    favoriteButton: {
      position: 'absolute',
      top: '0.5rem',
      right: '0.5rem',
      fontSize: '1.5rem',
      backgroundColor: favButtonHovered ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.6)',
      border: 'none',
      cursor: 'pointer',
      padding: '0.25rem 0.5rem',
      borderRadius: '0.25rem',
      zIndex: 10,
      transform: favButtonHovered ? 'scale(1.1)' : 'scale(1)',
      transition: 'all 0.3s',
    },
    content: {
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    title: {
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: '1.125rem',
      marginBottom: '0.5rem',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      minHeight: '2.5rem',
    },
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 'auto',
    },
    rating: {
      color: '#fbbf24',
      fontWeight: 'bold',
    },
    year: {
      color: '#9ca3af',
      fontSize: '0.875rem',
    },
    genres: {
      marginTop: '0.75rem',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.25rem',
    },
    genre: {
      backgroundColor: '#7c3aed',
      color: '#ffffff',
      fontSize: '0.75rem',
      padding: '0.25rem 0.5rem',
      borderRadius: '0.25rem',
    },
  };

  // Prevenir que el click del botón de favoritos navegue
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite();
  };

  return (
    <Link to={`/game/${game.id}`} style={{ textDecoration: 'none', height: '100%' }}>
      <div
        style={styles.card}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Imagen del juego */}
        <div style={styles.imageContainer}>
          <img
            src={game.background_image || 'https://via.placeholder.com/300x200'}
            alt={game.name}
            style={styles.image}
          />
          
          {/* Botón de favoritos (corazón) */}
          <button
            onClick={handleFavoriteClick}
            style={styles.favoriteButton}
            onMouseEnter={() => setFavButtonHovered(true)}
            onMouseLeave={() => setFavButtonHovered(false)}
            title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>

        {/* Contenido de la tarjeta */}
        <div style={styles.content}>
          {/* Título del juego */}
          <h3 style={styles.title}>{game.name}</h3>

          {/* Rating y año de lanzamiento */}
          <div style={styles.footer}>
            <span style={styles.rating}>⭐ {game.rating || 'N/A'}</span>
            <span style={styles.year}>
              {new Date(game.released).getFullYear() || 'N/A'}
            </span>
          </div>

          {/* Géneros del juego */}
          {game.genres && game.genres.length > 0 && (
            <div style={styles.genres}>
              {game.genres.slice(0, 2).map((genre) => (
                <span key={genre.id} style={styles.genre}>
                  {genre.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
