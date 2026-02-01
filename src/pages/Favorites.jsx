import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllGames } from '../services/api';
import GameCard from '../components/GameCard';

export default function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch todos los juegos y filtrar los que están en favoritos
        let allGames = [];
        let page = 1;
        let hasMore = true;

        while (hasMore && allGames.length < 500) {
          const response = await getAllGames(page);
          allGames = [...allGames, ...response.results];
          hasMore = response.next !== null;
          page++;
        }

        // Filtrar solo los que están en favoritos
        const favoriteGames = allGames.filter(game => favorites.includes(game.id));
        setGames(favoriteGames);
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setError('Error al cargar los favoritos');
      } finally {
        setLoading(false);
      }
    };

    if (favorites.length > 0) {
      fetchFavorites();
    } else {
      setGames([]);
      setLoading(false);
    }
  }, [favorites]);

  // Escuchar cambios en localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(updatedFavorites);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const styles = {
    container: {
      minHeight: 'calc(100vh - 120px)',
      backgroundColor: '#0f172a',
      padding: '2rem',
      marginTop: '80px',
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
    },
    title: {
      color: '#ffffff',
      fontSize: '2.25rem',
      fontWeight: 'bold',
    },
    backButton: {
      backgroundColor: '#7c3aed',
      color: '#ffffff',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      fontSize: '1rem',
    },
    emptyState: {
      textAlign: 'center',
      padding: '3rem',
      color: '#9ca3af',
    },
    emptyTitle: {
      fontSize: '1.5rem',
      marginBottom: '1rem',
      color: '#d1d5db',
    },
    emptyText: {
      marginBottom: '2rem',
    },
    browseButton: {
      backgroundColor: '#7c3aed',
      color: '#ffffff',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      fontSize: '1rem',
    },
    gamesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '1.5rem',
      gridAutoRows: '1fr',
    },
    loading: {
      textAlign: 'center',
      color: '#9ca3af',
      padding: '2rem',
      fontSize: '1.125rem',
    },
    error: {
      textAlign: 'center',
      color: '#ef4444',
      padding: '2rem',
      fontSize: '1.125rem',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>❤️ Mis Favoritos</h1>
          <button
            style={styles.backButton}
            onClick={() => navigate('/games')}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#6d28d9')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#7c3aed')}
          >
            ← Volver
          </button>
        </div>

        {loading ? (
          <div style={styles.loading}>Cargando favoritos...</div>
        ) : error ? (
          <div style={styles.error}>{error}</div>
        ) : games.length === 0 ? (
          <div style={styles.emptyState}>
            <h2 style={styles.emptyTitle}>No tienes favoritos aún</h2>
            <p style={styles.emptyText}>
              Haz clic en el corazón en las tarjetas de juegos para agregar a favoritos
            </p>
            <button
              style={styles.browseButton}
              onClick={() => navigate('/games')}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#6d28d9')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#7c3aed')}
            >
              Explorar Juegos
            </button>
          </div>
        ) : (
          <div>
            <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>
              {games.length} juego{games.length !== 1 ? 's' : ''} en favoritos
            </p>
            <div style={styles.gamesGrid}>
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
