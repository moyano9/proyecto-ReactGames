import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GameCard from '../components/GameCard';
import Pagination from '../components/Pagination';
import { getGamesByTag, getTagDetails } from '../services/api';

/**
 * TagGames - Página que muestra juegos filtrados por tag/género
 * Se accede a través de /tag/:tagId
 */
export default function TagGames() {
  // Obtener el ID del tag desde la URL
  const { tagId } = useParams();
  const navigate = useNavigate();

  // Estado del componente
  const [games, setGames] = useState([]);
  const [tag, setTag] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Cargar datos del tag y sus juegos
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Cargar información del tag
      const tagData = await getTagDetails(tagId);
      setTag(tagData);

      // Cargar juegos del tag
      const gamesData = await getGamesByTag(tagId, page);
      setGames(gamesData.results);
      setTotalCount(gamesData.count);
      setLoading(false);
    };
    fetchData();
  }, [tagId, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(totalCount / 20);

  // Estilos del componente
  const styles = {
    page: {
      backgroundColor: '#111827',
      minHeight: '100vh',
      padding: '3rem 1rem',
      marginTop: '80px',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    header: {
      marginBottom: '2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    backButton: {
      backgroundColor: '#7c3aed',
      color: '#ffffff',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    title: {
      fontSize: '2.25rem',
      fontWeight: 'bold',
      color: '#ffffff',
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '256px',
    },
    loadingText: {
      color: '#ffffff',
      fontSize: '1.25rem',
    },
    noResultsContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '256px',
    },
    noResultsText: {
      color: '#9ca3af',
      fontSize: '1.25rem',
    },
    gamesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '1.5rem',
      marginBottom: '3rem',
      gridAutoRows: '1fr',
      minHeight: '300px',
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header con botón atrás */}
        <div style={styles.header}>
          <button
            onClick={() => navigate(-1)}
            style={styles.backButton}
          >
            ← Atrás
          </button>
          <h1 style={styles.title}>
            {tag ? `Tag: ${tag.name}` : 'Cargando...'}
          </h1>
        </div>

        {/* Contenido principal */}
        {loading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.loadingText}>Cargando juegos...</div>
          </div>
        ) : games.length === 0 ? (
          <div style={styles.noResultsContainer}>
            <div style={styles.noResultsText}>No se encontraron juegos para este tag</div>
          </div>
        ) : (
          <>
            <div style={styles.gamesGrid}>
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                loading={loading}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
